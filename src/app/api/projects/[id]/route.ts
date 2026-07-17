import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { projectSchema } from "@/lib/validations/project";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: {
      tools: { include: { tool: true } },
      metrics: { orderBy: { sort: "asc" } },
      media: { include: { media: true }, orderBy: { sort: "asc" } },
    },
  });

  if (!project || project.deletedAt) {
    return NextResponse.json({ error: { message: "Not found" } }, { status: 404 });
  }

  return NextResponse.json({ data: project });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
  }

  const body = await req.json();
  const parsed = projectSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { message: "Invalid input", issues: parsed.error.flatten() } },
      { status: 400 },
    );
  }

  const { toolNames, metrics, ...projectData } = parsed.data;

  const project = await prisma.$transaction(async (tx) => {
    if (metrics) {
      await tx.projectMetric.deleteMany({ where: { projectId: params.id } });
    }
    if (toolNames) {
      await tx.projectTool.deleteMany({ where: { projectId: params.id } });
    }

    return tx.project.update({
      where: { id: params.id },
      data: {
        ...projectData,
        ...(metrics && { metrics: { create: metrics } }),
        ...(toolNames && {
          tools: {
            create: toolNames.map((name) => ({
              tool: { connectOrCreate: { where: { name }, create: { name } } },
            })),
          },
        }),
      },
      include: { tools: { include: { tool: true } }, metrics: true },
    });
  });

  return NextResponse.json({ data: project });
}

// Soft delete — case studies are expensive to lose (per the blueprint).
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
  }

  await prisma.project.update({
    where: { id: params.id },
    data: { deletedAt: new Date() },
  });
  return NextResponse.json({ data: { id: params.id } });
}