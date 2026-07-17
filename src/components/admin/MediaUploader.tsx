"use client";

import { useState } from "react";

type MediaItem = {
  id: string;
  url: string;
  type: "IMAGE" | "VIDEO";
  key: string;
};

export default function MediaUploader({ onUploaded }: { onUploaded: (item: MediaItem) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");

    try {
      // Step 1: ask our server for a signature (the API secret never
      // reaches the browser — only this short-lived signed payload does).
      const signRes = await fetch("/api/uploads/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: "portfolio" }),
      });
      const { data: sign } = await signRes.json();
      if (!signRes.ok) throw new Error("Could not get upload signature.");

      // Step 2: upload the actual file straight to Cloudinary. The file
      // never touches our own server or database at this point.
      const form = new FormData();
      form.append("file", file);
      form.append("api_key", sign.apiKey);
      form.append("timestamp", String(sign.timestamp));
      form.append("signature", sign.signature);
      form.append("folder", sign.folder);

      const resourceType = file.type.startsWith("video") ? "video" : "image";
      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sign.cloudName}/${resourceType}/upload`,
        { method: "POST", body: form },
      );
      const cloudData = await cloudRes.json();
      if (!cloudRes.ok) throw new Error(cloudData.error?.message || "Upload failed.");

      // Step 3: save just the reference (URL + metadata) to our database.
      const mediaRes = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: "cloudinary",
          key: cloudData.public_id,
          url: cloudData.secure_url,
          type: resourceType === "video" ? "VIDEO" : "IMAGE",
          width: cloudData.width,
          height: cloudData.height,
        }),
      });
      const { data: media } = await mediaRes.json();
      if (!mediaRes.ok) throw new Error("Upload succeeded but saving the reference failed.");

      onUploaded(media);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="border-2 border-dashed border-rule rounded-lg p-8 text-center bg-white">
      <input
        type="file"
        accept="image/*,video/*"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="text-sm"
      />
      {uploading && <p className="mt-3 text-sm text-ink-soft">Uploading…</p>}
      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </div>
  );
}