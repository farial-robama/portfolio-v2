import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Eyebrow from "@/components/ui/Eyebrow";
import type { TimelineItem } from "@/lib/types";

const TIMELINE: TimelineItem[] = [
  {
    date: "2024 — Present",
    role: "IT Engineer",
    org: "Alliance Française de Chittagong",
    description:
      "Leading web application development with SQL, PHP, JavaScript and React, integrating third-party APIs and optimizing the PMB library management system.",
  },
  {
    date: "2023",
    role: "Cyber Security & Ethical Hacking — Intern",
    org: "Well-Up Technology",
    description:
      "Documented software security practices and assisted senior developers building and debugging web applications.",
  },
  {
    date: "2018 — 2019",
    role: "Computer Trainer",
    org: "Swapno Technical Computer Training Center",
    description:
      "Taught Microsoft Office, hardware replacement and computer maintenance.",
  },
  {
    date: "2015 — 2017",
    role: "Assistant Teacher",
    org: "Morning Dew School & College",
    description: "Classroom management, assessment and reporting.",
  },
];

export default function Journey() {
  return (
    <section id="journey" className="py-20 border-t border-rule">
      <div className="max-w-[1120px] mx-auto px-8">
        <RevealOnScroll>
          <Eyebrow number="01" label="Journey" />
          <h2 className="font-serif text-[32px] lg:text-[42px]">
            Five years, four roles, one throughline.
          </h2>
        </RevealOnScroll>

        <div className="mt-10 pl-8 border-l-[1.5px] border-dashed border-rule">
          {TIMELINE.map((item, i) => (
            <RevealOnScroll key={item.role} className="relative pb-11 last:pb-0">
              <div className="absolute -left-[41px] top-0.5 w-[15px] h-[15px] rounded-full bg-cream border-2 border-teal transition-shadow hover:shadow-[0_0_0_5px_#E7EFE9]" />
              <div className="font-mono text-[11px] text-gold uppercase tracking-wide">
                {item.date}
              </div>
              <div className="font-serif text-[23px] mt-1">{item.role}</div>
              <div className="text-ink-soft text-sm mt-0.5">{item.org}</div>
              <p className="mt-2.5 text-ink-soft text-[14.5px] max-w-[60ch]">
                {item.description}
              </p>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
