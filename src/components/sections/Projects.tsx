import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Eyebrow from "@/components/ui/Eyebrow";
import type { Project } from "@/lib/types";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-20 border-t border-rule">
      <div className="max-w-[1120px] mx-auto px-8">
        <RevealOnScroll>
          <Eyebrow number="03" label="Projects" />
          <h2 className="font-serif text-[32px] lg:text-[42px]">Selected work.</h2>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-6 mt-11">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.id} delay={(i % 2) as 0 | 1}>
              <article className="border border-rule bg-white p-7 h-full transition-all hover:border-teal hover:-translate-y-1 hover:shadow-lg">
                <div className="font-mono text-[10px] text-gold uppercase tracking-wider">
                  {project.tag}
                </div>
                <h3 className="font-serif text-[22px] mt-2">{project.title}</h3>
                <p className="text-ink-soft text-sm mt-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] bg-cream-2 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
