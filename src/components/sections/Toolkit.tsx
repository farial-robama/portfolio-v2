import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Eyebrow from "@/components/ui/Eyebrow";

const GROUPS = [
  {
    title: "Languages",
    chips: ["JavaScript", "PHP", "Python", "Java", "C++"],
  },
  {
    title: "Frontend",
    chips: ["React JS", "HTML/CSS", "Bootstrap", "WordPress"],
  },
  {
    title: "Backend & Data",
    chips: ["Node.js", "Laravel", "MySQL", "SQL", "REST APIs"],
  },
  {
    title: "Security",
    chips: ["Ethical Hacking", "Network Security", "Information Security"],
  },
  {
    title: "Digital Skills",
    chips: [
      "Data Literacy",
      "Collaboration",
      "Content Creation",
      "Digital Safety",
      "Problem Solving",
    ],
  },
  {
    title: "Languages Spoken",
    chips: ["Bengali — Native", "English — B2", "French — B1"],
  },
];

export default function Toolkit() {
  return (
    <section id="toolkit" className="py-20 border-t border-rule">
      <div className="max-w-[1120px] mx-auto px-8">
        <RevealOnScroll>
          <Eyebrow number="02" label="Toolkit" />
          <h2 className="font-serif text-[28px]">What I build with.</h2>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule border border-rule mt-9">
          {GROUPS.map((group, i) => (
            <RevealOnScroll key={group.title} delay={(i % 3) as 0 | 1 | 2}>
              <div className="bg-cream hover:bg-white transition-colors p-6 h-full">
                <h3 className="font-mono text-[13px] uppercase tracking-wide text-teal mb-3">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.chips.map((chip) => (
                    <span key={chip} className="chip">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}