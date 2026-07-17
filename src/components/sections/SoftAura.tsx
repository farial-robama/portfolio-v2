import RevealOnScroll from "@/components/ui/RevealOnScroll";

const SERVICES = ["Web Apps", "UI/UX", "SEO", "SMM", "Motion Graphics"];
const STACK = ["React", "Next.js", "MongoDB", "Node.js", "Tailwind CSS"];

export default function SoftAura() {
  return (
    <section id="softaura" className="py-20 border-t border-rule bg-ink text-cream">
      <div className="max-w-[1120px] mx-auto px-8 grid lg:grid-cols-2 gap-14 items-center">
        <RevealOnScroll>
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-widest text-gold mb-4">
            <span>04</span> Studio
            <span className="flex-1 h-px bg-cream/15" />
          </div>
          <div className="font-serif text-[36px]">
            Soft<span className="text-gold">Aura</span>
          </div>
          <p className="mt-[18px] text-[#C9D1CA] text-[15.5px] max-w-[52ch]">
            A small team of developers, designers and innovators making
            modern, reliable digital tools — for startups finding their
            footing and companies scaling fast.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-6">
            {SERVICES.map((service) => (
              <span
                key={service}
                className="border border-cream/30 px-3.5 py-2 rounded-full font-mono text-[11px] transition-colors hover:border-gold hover:text-gold"
              >
                {service}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <a href="https://softaura.dev/" className="btn bg-gold text-ink hover:shadow-lg">
              Visit SoftAura →
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={1}>
          <div className="border border-cream/25 p-7 rounded">
            <div className="flex gap-9">
              <div>
                <b className="block font-serif text-[32px] text-gold">20+</b>
                <span className="font-mono text-[11px] uppercase text-[#C9D1CA]">
                  Client products shipped
                </span>
              </div>
              <div>
                <b className="block font-serif text-[32px] text-gold">5</b>
                <span className="font-mono text-[11px] uppercase text-[#C9D1CA]">
                  Core services
                </span>
              </div>
            </div>
            <div className="mt-[26px] text-[#C9D1CA] text-[13.5px]">
              Built on a stack chosen for speed and longevity:
            </div>
            <div className="flex flex-wrap gap-2 mt-5">
              {STACK.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] bg-cream/[0.08] px-2.5 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
