import type { Post } from "@/lib/types";

interface PostsTableProps {
  posts: Post[];
}

function formatDate(date: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostsTable({ posts }: PostsTableProps) {
  return (
    <div className="bg-white border border-rule">
      <div className="flex justify-between items-center px-5 py-4 border-b border-rule">
        <h3 className="font-serif text-base">Recent journal entries</h3>
        <span className="font-mono text-[11px] text-ink-soft">manage all →</span>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            {["Title", "Status", "Date", "Views"].map((h) => (
              <th
                key={h}
                className="text-left font-mono text-[10px] uppercase text-ink-soft px-5 py-3 border-b border-rule"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-cream-2 transition-colors">
              <td className="px-5 py-3.5 border-b border-rule text-[13.5px]">
                {post.title}
              </td>
              <td className="px-5 py-3.5 border-b border-rule">
                <span
                  className={`font-mono text-[10px] px-2.5 py-[3px] rounded-full uppercase ${
                    post.status === "published"
                      ? "bg-teal-soft text-teal"
                      : "bg-gold-soft text-gold"
                  }`}
                >
                  {post.status}
                </span>
              </td>
              <td className="px-5 py-3.5 border-b border-rule text-[13.5px]">
                {formatDate(post.date)}
              </td>
              <td className="px-5 py-3.5 border-b border-rule text-[13.5px]">
                {post.views || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
