import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/tools — public read is fine, it's just a tag list (React,
// Node.js, etc.), nothing sensitive. Used by the admin UI's
// autocomplete when tagging a project.
export async function GET() {
  const tools = await prisma.tool.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json({ data: tools });
}