import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { skillSchema } from "@/lib/validations/skill";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
  }

  const body = await req.json();
  const parsed = skillSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { message: "Invalid input", issues: parsed.error.flatten() } },
      { status: 400 },
    );
  }

  const skill = await prisma.skill.update({
    where: { id: params.id },
    data: parsed.data,
  });
  return NextResponse.json({ data: skill });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
  }

  await prisma.skill.delete({ where: { id: params.id } });
  return NextResponse.json({ data: { id: params.id } });
}