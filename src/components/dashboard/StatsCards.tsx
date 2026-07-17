import type { Post, Project } from "@/lib/types";

interface StatsCardsProps {
  posts: Post[];
  projects: Project[];
}

export default function StatsCards({ posts, projects }: StatsCardsProps) {
  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.filter((p) => p.status === "draft").length;

  const cards = [
    { label: "Published posts", value: published },
    { label: "Drafts", value: drafts },
    { label: "Projects listed", value: projects.length },
    { label: "SoftAura inquiries", value: 7 },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white border border-rule p-[18px] transition-transform hover:-translate-y-0.5"
        >
          <span className="font-mono text-[10px] uppercase text-ink-soft">
            {card.label}
          </span>
          <b className="block font-serif text-[28px] mt-1.5 text-teal">
            {card.value}
          </b>
        </div>
      ))}
    </div>
  );
}
