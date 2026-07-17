"use client";

import { useEffect, useState } from "react";

type Lead = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "UNREAD" | "READ" | "STARRED" | "ARCHIVED";
  createdAt: string;
};

const STATUS_STYLES: Record<Lead["status"], string> = {
  UNREAD: "bg-teal-soft text-teal",
  READ: "bg-cream-2 text-ink-soft",
  STARRED: "bg-gold-soft text-gold",
  ARCHIVED: "bg-cream-2 text-ink-soft",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((json) => setLeads(json.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(id: string, status: Lead["status"]) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  return (
    <>
      <h2 className="font-serif text-[26px] mb-7">Leads</h2>

      {loading ? (
        <p className="text-sm text-ink-soft">Loading…</p>
      ) : leads.length === 0 ? (
        <p className="text-sm text-ink-soft">No submissions yet.</p>
      ) : (
        <div className="bg-white border border-rule rounded-lg divide-y divide-rule">
          {leads.map((lead) => (
            <div key={lead.id} className="p-5">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="font-medium text-sm">{lead.name}</div>
                  <div className="font-mono text-[11px] text-ink-soft">{lead.email}</div>
                </div>
                <span
                  className={`font-mono text-[10px] uppercase px-2 py-1 rounded-full shrink-0 ${STATUS_STYLES[lead.status]}`}
                >
                  {lead.status}
                </span>
              </div>
              <p className="text-sm text-ink-soft mt-3">{lead.message}</p>
              <div className="flex gap-3 mt-3">
                {lead.status !== "READ" && (
                  <button
                    onClick={() => updateStatus(lead.id, "READ")}
                    className="font-mono text-[11px] text-teal underline"
                  >
                    Mark read
                  </button>
                )}
                {lead.status !== "STARRED" && (
                  <button
                    onClick={() => updateStatus(lead.id, "STARRED")}
                    className="font-mono text-[11px] text-gold underline"
                  >
                    Star
                  </button>
                )}
                {lead.status !== "ARCHIVED" && (
                  <button
                    onClick={() => updateStatus(lead.id, "ARCHIVED")}
                    className="font-mono text-[11px] text-ink-soft underline"
                  >
                    Archive
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}