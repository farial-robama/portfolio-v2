"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/seo", label: "SEO" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-r border-rule bg-white flex flex-col">
      <div className="p-6 border-b border-rule">
        <div className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          Admin
        </div>
        <div className="font-serif text-[18px] mt-0.5">Portfolio CMS</div>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-1">
        {NAV.map((item) => {
          const active =
            item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                active ? "bg-cream-2 text-ink" : "text-ink-soft hover:bg-cream-2"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-rule flex flex-col gap-2">
        <Link
          href="/"
          className="font-mono text-xs uppercase text-teal underline text-center"
        >
          ← View public site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="font-mono text-xs uppercase text-ink-soft hover:text-ink"
        >
          Sign out
        </button>
      </div>
    </aside>
  );
}