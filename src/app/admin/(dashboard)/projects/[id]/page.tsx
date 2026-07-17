import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { tools: { include: { tool: true } }, metrics: true },
  });

  if (!project || project.deletedAt) notFound();

  return (
    <>
      <h2 className="font-serif text-[26px] mb-7">Edit project</h2>
      <ProjectForm
        projectId={project.id}
        defaultValues={{
          title: project.title,
          slug: project.slug,
          category: project.category ?? undefined,
          year: project.year ?? undefined,
          bodyJson: project.bodyJson as string,
          status: project.status,
          sort: project.sort,
          toolNames: project.tools.map((t) => t.tool.name),
          metrics: project.metrics.map((m) => ({
            label: m.label,
            value: m.value,
            unit: m.unit ?? undefined,
            sort: m.sort,
          })),
        }}
      />
    </>
  );
}