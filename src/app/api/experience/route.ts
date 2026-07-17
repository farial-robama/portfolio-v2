import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { experienceSchema } from "@/lib/validations/experience";

// GET /api/experience — public. Pre-sorted newest first.
export async function GET() {
  const experience = await prisma.experience.findMany({
    where: { deletedAt: null },
    orderBy: { startDate: "desc" },
    include: { points: { orderBy: { sort: "asc" } } },
  });
  return NextResponse.json({ data: experience });
}

// POST /api/experience — admin only. Entry + points in one transaction.
export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
  }

  const body = await req.json();
  const parsed = experienceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { message: "Invalid input", issues: parsed.error.flatten() } },
      { status: 400 },
    );
  }

  const { points, ...experienceData } = parsed.data;

  const experience = await prisma.experience.create({
    data: {
      ...experienceData,
      points: { create: points },
    },
    include: { points: true },
  });

  return NextResponse.json({ data: experience }, { status: 201 });
}