import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Eyebrow from "@/components/ui/Eyebrow";

// Static, not dashboard-driven — same decision as SoftAura and Journey.
const POSTS = [
  {
    id: "1",
    title: "Why I moved my auth flows to a shared form component",
    excerpt: "Cutting duplicate logic between customer and vendor login.",
    date: "2026-06-01",
  },
  {
    id: "2",
    title: "Building a prescription pad UI with Tiptap",
    excerpt: "Rich text, auto-generated UHIDs, and PDF export in one flow.",
    date: "2026-03-15",
  },
  {
    id: "3",
    title: "Starting SoftAura",
    excerpt: "Why I founded a studio instead of freelancing solo.",
    date: "2025-11-02",
  },
] as const;

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function Blog() {
  return (
    <section id="blog" className="py-20 border-t border-rule">
      <div className="max-w-[1120px] mx-auto px-8">
        <RevealOnScroll>
          <Eyebrow number="05" label="Journal" />
          <h2 className="font-serif text-[28px] lg:text-[32px]">
            Notes from the journey.
          </h2>
          <p className="text-ink-soft mt-2.5 max-w-[60ch]">
            A running log of what I&apos;m building, learning and shipping.
          </p>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-9">
          {POSTS.map((post, i) => (
            <RevealOnScroll key={post.id} delay={(i % 3) as 0 | 1 | 2}>
              <article className="border border-rule bg-white overflow-hidden h-full transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="h-[120px] bg-[linear-gradient(135deg,#E7EFE9,#F3E9CF)]" />
                <div className="p-5">
                  <div className="font-mono text-[10px] text-gold uppercase">
                    {formatDate(post.date)}
                  </div>
                  <h3 className="font-serif text-[16.5px] mt-2">{post.title}</h3>
                  <p className="text-ink-soft text-[13px] mt-1.5">{post.excerpt}</p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}