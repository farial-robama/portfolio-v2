import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { experienceSchema } from "@/lib/validations/experience";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
  }

  const body = await req.json();
  const parsed = experienceSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { message: "Invalid input", issues: parsed.error.flatten() } },
      { status: 400 },
    );
  }

  const { points, ...experienceData } = parsed.data;

  const experience = await prisma.$transaction(async (tx) => {
    if (points) {
      await tx.experiencePoint.deleteMany({ where: { experienceId: params.id } });
    }
    return tx.experience.update({
      where: { id: params.id },
      data: {
        ...experienceData,
        ...(points && { points: { create: points } }),
      },
      include: { points: true },
    });
  });

  return NextResponse.json({ data: experience });
}

// Soft delete — work history is expensive to lose by accident.
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
  }

  await prisma.experience.update({
    where: { id: params.id },
    data: { deletedAt: new Date() },
  });
  return NextResponse.json({ data: { id: params.id } });
}