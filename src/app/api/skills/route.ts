import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { skillSchema } from "@/lib/validations/skill";

// GET /api/skills — public. Categories with nested skills, pre-sorted.
export async function GET() {
  const categories = await prisma.skillCategory.findMany({
    orderBy: { sort: "asc" },
    include: { skills: { orderBy: { sort: "asc" } } },
  });
  return NextResponse.json({ data: categories });
}

// POST /api/skills — admin only.
export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
  }

  const body = await req.json();
  const parsed = skillSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { message: "Invalid input", issues: parsed.error.flatten() } },
      { status: 400 },
    );
  }

  const skill = await prisma.skill.create({ data: parsed.data });
  return NextResponse.json({ data: skill }, { status: 201 });
}