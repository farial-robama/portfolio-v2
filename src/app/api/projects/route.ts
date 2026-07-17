import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { projectSchema } from "@/lib/validations/project";

// GET /api/projects — public by default (published only). Pass
// ?all=1 to get everything regardless of status, but that requires
// an admin session — this is the exact split we caught as a bug on
// the hand-written lib/data.ts earlier, built correctly from the start.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const wantsAll = searchParams.get("all") === "1";

  if (wantsAll) {
    const session = await requireAdmin();
    if (!session) {
      return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
    }
  }

  const category = searchParams.get("category") ?? undefined;
  const tool = searchParams.get("tool") ?? undefined;
  const year = searchParams.get("year") ? Number(searchParams.get("year")) : undefined;

  const projects = await prisma.project.findMany({
    where: {
      deletedAt: null,
      ...(wantsAll ? {} : { status: "PUBLISHED" }),
      ...(category && { category }),
      ...(year && { year }),
      ...(tool && { tools: { some: { tool: { name: tool } } } }),
    },
    orderBy: { sort: "asc" },
    include: {
      tools: { include: { tool: true } },
      metrics: { orderBy: { sort: "asc" } },
      media: { include: { media: true }, orderBy: { sort: "asc" } },
    },
  });

  return NextResponse.json({ data: projects });
}

// POST /api/projects — admin only.
export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
  }

  const body = await req.json();
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { message: "Invalid input", issues: parsed.error.flatten() } },
      { status: 400 },
    );
  }

  const { toolNames, metrics, ...projectData } = parsed.data;

  const project = await prisma.project.create({
    data: {
      ...projectData,
      metrics: { create: metrics },
      // connectOrCreate: reuse an existing Tool row by name, or make
      // a new one — this is the "reusable, autocompleting tag pool"
      // from the blueprint, without needing a separate admin screen
      // just to pre-create tags.
      tools: {
        create: toolNames.map((name) => ({
          tool: { connectOrCreate: { where: { name }, create: { name } } },
        })),
      },
    },
    include: { tools: { include: { tool: true } }, metrics: true },
  });

  return NextResponse.json({ data: project }, { status: 201 });
}