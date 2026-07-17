import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProjectsListPage() {
  const projects = await prisma.project.findMany({
    where: { deletedAt: null },
    orderBy: { sort: "asc" },
  });

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <h2 className="font-serif text-[26px]">Projects</h2>
        <Link href="/admin/projects/new" className="btn btn-solid">
          New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="text-sm text-ink-soft">No projects yet.</p>
      ) : (
        <div className="bg-white border border-rule rounded-lg divide-y divide-rule">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/admin/projects/${project.id}`}
              className="flex items-center justify-between px-5 py-4 hover:bg-cream-2 transition-colors"
            >
              <div>
                <div className="font-medium text-sm">{project.title}</div>
                <div className="font-mono text-[10.5px] text-ink-soft mt-0.5">
                  /{project.slug}
                </div>
              </div>
              <span
                className={`font-mono text-[10px] uppercase px-2 py-1 rounded-full ${
                  project.status === "PUBLISHED"
                    ? "bg-teal-soft text-teal"
                    : project.status === "DRAFT"
                      ? "bg-cream-2 text-ink-soft"
                      : "bg-gold-soft text-gold"
                }`}
              >
                {project.status}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}