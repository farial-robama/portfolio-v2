import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Admin view — always fetch fresh, never cache stale counts.
export const dynamic = "force-dynamic";

async function getStats() {
  const [skills, experience, projects, unreadLeads] = await Promise.all([
    prisma.skill.count(),
    prisma.experience.count({ where: { deletedAt: null } }),
    prisma.project.count({ where: { deletedAt: null } }),
    prisma.lead.count({ where: { status: "UNREAD" } }),
  ]);
  return { skills, experience, projects, unreadLeads };
}

export default async function DashboardPage() {
  const stats = await getStats();

  const cards = [
    { label: "Skills", value: stats.skills, href: "/admin/skills" },
    { label: "Experience entries", value: stats.experience, href: "/admin/experience" },
    { label: "Projects", value: stats.projects, href: "/admin/projects" },
    { label: "Unread leads", value: stats.unreadLeads, href: "/admin/leads" },
  ];

  return (
    <>
      <h2 className="font-serif text-[26px] mb-7">Overview</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white border border-rule rounded-lg p-5 hover:border-teal transition-colors"
          >
            <b className="block font-serif text-[32px] text-teal">{card.value}</b>
            <span className="font-mono text-[10.5px] uppercase tracking-wide text-ink-soft">
              {card.label}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}