import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// DELETE /api/media/[id] — admin only. Soft delete: if a video took
// hours to transcode, losing the reference by accident is expensive
// even though the file itself is still safe in Cloudinary.
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: { message: "Unauthorized" } }, { status: 401 });
  }

  await prisma.media.update({
    where: { id: params.id },
    data: { deletedAt: new Date() },
  });
  return NextResponse.json({ data: { id: params.id } });
}