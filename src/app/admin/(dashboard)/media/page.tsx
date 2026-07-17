"use client";

import { useEffect, useState } from "react";
import MediaUploader from "@/components/admin/MediaUploader";

type MediaItem = {
  id: string;
  url: string;
  type: "IMAGE" | "VIDEO";
  key: string;
};

export default function MediaPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/media")
      .then((res) => res.json())
      .then((json) => setItems(json.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this asset? It will be removed from the library.")) return;
    await fetch(`/api/media/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <>
      <h2 className="font-serif text-[26px] mb-7">Media Library</h2>

      <MediaUploader onUploaded={(item) => setItems((prev) => [item, ...prev])} />

      <div className="mt-8">
        {loading ? (
          <p className="text-sm text-ink-soft">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-ink-soft">No media uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <div key={item.id} className="border border-rule rounded-lg overflow-hidden bg-white">
                {item.type === "IMAGE" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt="" className="w-full h-32 object-cover" />
                ) : (
                  <video src={item.url} className="w-full h-32 object-cover" muted />
                )}
                <div className="p-2 flex justify-between items-center">
                  <span className="font-mono text-[10px] text-ink-soft truncate">{item.key}</span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 text-xs hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}