import Link from "next/link";

const NAV_SECTIONS = [
  {
    title: "Content",
    links: ["Journal / Blog", "Projects", "SoftAura"],
  },
  {
    title: "Account",
    links: ["Profile & CV", "Settings"],
  },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:block bg-ink text-cream p-6 min-h-screen">
      <div className="flex items-center gap-3 mb-9 pb-5 border-b border-cream/10">
        <div className="w-[42px] h-[42px] rounded-full border-2 border-gold bg-teal flex items-center justify-center font-serif text-sm">
          JA
        </div>
        <div className="leading-tight">
          <b className="font-serif text-[15px] block">Jahidul Alam</b>
          <span className="font-mono text-[10px] text-[#9BA69E] uppercase">
            Admin
          </span>
        </div>
      </div>

      <nav>
        <Link
          href="/dashboard"
          className="flex items-center gap-2.5 px-3 py-2.5 rounded bg-cream/10 text-cream text-[13.5px] mb-0.5"
        >
          ▢ Overview
        </Link>

        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#7C8781] mt-5 mb-2">
              {section.title}
            </div>
            {section.links.map((label) => (
              <a
                key={label}
                href="#"
                className="flex items-center gap-2.5 px-3 py-2.5 rounded text-[13.5px] text-[#C9D1CA] hover:bg-cream/[0.06] transition-colors mb-0.5"
              >
                ▢ {label}
              </a>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
