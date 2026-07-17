import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { mediaCreateSchema } from "@/lib/validations/media";

// GET /api/media — admin only. The library is an internal management
// view; public visitors see media only through Project responses,
// which already embed the URLs they need via ProjectMedia.
export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
  }

  const media = await prisma.media.findMany({
    where: { deletedAt: null },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ data: media });
}

// POST /api/media — admin only. Called AFTER the browser has already
// uploaded the file directly to Cloudinary — this just saves the
// reference (URL + metadata), never the file itself.
export async function POST(req: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
  }

  const body = await req.json();
  const parsed = mediaCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { message: "Invalid input", issues: parsed.error.flatten() } },
      { status: 400 },
    );
  }

  const media = await prisma.media.create({ data: parsed.data });
  return NextResponse.json({ data: media }, { status: 201 });
}