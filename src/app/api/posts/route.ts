import { NextRequest, NextResponse } from "next/server";
import { createPost, getPosts } from "@/lib/data";

// GET /api/posts -> list all posts
export async function GET() {
  const posts = await getPosts();
  return NextResponse.json({ posts });
}

// POST /api/posts -> create a new post { title, excerpt, status }
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);

  if (!body?.title || typeof body.title !== "string") {
    return NextResponse.json(
      { error: "A post title is required." },
      { status: 400 }
    );
  }

  const post = await createPost({
    title: body.title,
    excerpt: body.excerpt ?? "",
    status: body.status === "published" ? "published" : "draft",
  });

  return NextResponse.json({ post }, { status: 201 });
}
