import { prisma } from "@/lib/prisma";

// Public helper — used by the homepage and other visitor-facing
// pages. Always published-only; there is no flag here to widen it,
// on purpose, so a public page can never accidentally show drafts.
export async function getProjects() {
  return prisma.project.findMany({
    where: { status: "PUBLISHED", deletedAt: null },
    orderBy: { sort: "asc" },
    include: {
      tools: { include: { tool: true } },
      metrics: { orderBy: { sort: "asc" } },
      media: { include: { media: true }, orderBy: { sort: "asc" } },
    },
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findFirst({
    where: { slug, status: "PUBLISHED", deletedAt: null },
    include: {
      tools: { include: { tool: true } },
      metrics: { orderBy: { sort: "asc" } },
      media: { include: { media: true }, orderBy: { sort: "asc" } },
    },
  });
}

