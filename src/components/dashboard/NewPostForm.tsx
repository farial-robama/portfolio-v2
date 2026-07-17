"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(status: "draft" | "published") {
    if (!title.trim()) return;
    setLoading(true);

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, excerpt, status }),
    });

    setTitle("");
    setExcerpt("");
    setLoading(false);
    router.refresh(); // re-fetch the server-rendered posts table + stats
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    submit("published");
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-rule p-[26px] mt-7">
      <div className="eyebrow mb-3.5">
        <span className="text-gold">✎</span> New Journal Entry
      </div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title…"
        required
        className="w-full border-0 border-b border-rule font-serif text-2xl py-2 mb-[18px] bg-transparent focus:outline-none focus:border-teal"
      />

      <textarea
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        placeholder="Short excerpt / summary…"
        rows={4}
        className="w-full border border-dashed border-rule bg-cream-2 p-4 text-[13px] text-ink-soft focus:outline-none focus:border-teal"
      />

      <div className="flex gap-2.5 mt-[18px]">
        <button
          type="button"
          disabled={loading}
          onClick={() => submit("draft")}
          className="btn btn-outline"
        >
          Save draft
        </button>
        <button type="submit" disabled={loading} className="btn bg-teal text-white">
          {loading ? "Publishing…" : "Publish"}
        </button>
      </div>
    </form>
  );
}
