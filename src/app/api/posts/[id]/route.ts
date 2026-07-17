import { NextRequest, NextResponse } from "next/server";
import { deletePost, getPostById } from "@/lib/data";

interface Params {
  params: { id: string };
}

// GET /api/posts/:id
export async function GET(_req: NextRequest, { params }: Params) {
  const post = await getPostById(params.id);
  if (!post) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }
  return NextResponse.json({ post });
}

// DELETE /api/posts/:id
export async function DELETE(_req: NextRequest, { params }: Params) {
  const removed = await deletePost(params.id);
  if (!removed) {
    return NextResponse.json({ error: "Post not found." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
