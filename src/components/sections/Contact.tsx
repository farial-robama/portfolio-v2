"use client";

import { FormEvent, useState } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import Eyebrow from "@/components/ui/Eyebrow";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      source: "contact-form",
      // Honeypot — real visitors never see or fill this field (see the
      // hidden input below). If it has a value, a bot filled it in.
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error?.message || "Something went wrong.");

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="py-20 border-t border-rule">
      <div className="max-w-[1120px] mx-auto px-8 grid lg:grid-cols-2 gap-14">
        <RevealOnScroll>
          <Eyebrow number="06" label="Contact" />
          <h2 className="font-serif text-[30px] lg:text-[34px]">
            Let&apos;s build something.
          </h2>

          <form onSubmit={handleSubmit} className="mt-6">
            {/* Honeypot field — hidden from real users via CSS, bots fill
                every field they find in the DOM. tabIndex -1 and
                autoComplete off keep it out of keyboard/autofill flow too. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px] w-px h-px opacity-0"
              aria-hidden="true"
            />

            <div className="mb-4">
              <label className="font-mono text-[11px] uppercase text-ink-soft">
                Name
              </label>
              <input
                name="name"
                required
                placeholder="Your name"
                className="w-full mt-1.5 border border-rule bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
              />
            </div>
            <div className="mb-4">
              <label className="font-mono text-[11px] uppercase text-ink-soft">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@email.com"
                className="w-full mt-1.5 border border-rule bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
              />
            </div>
            <div className="mb-4">
              <label className="font-mono text-[11px] uppercase text-ink-soft">
                Note
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="What are you building?"
                className="w-full mt-1.5 border border-rule bg-white px-3 py-2.5 text-sm focus:outline-none focus:border-teal"
              />
            </div>

            <button type="submit" disabled={status === "loading"} className="btn btn-solid">
              {status === "loading" ? "Sending…" : "Send message"}
            </button>

            {status === "success" && (
              <p className="mt-3 text-sm text-teal">
                Thanks! Your message has been received.
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-sm text-red-600">{errorMsg}</p>
            )}
          </form>
        </RevealOnScroll>

        <RevealOnScroll delay={1}>
          <div className="flex justify-between py-3.5 border-t border-rule font-mono text-[12.5px]">
            <span>Email</span>
            <span>jahidulalam.personal@gmail.com</span>
          </div>
          <div className="flex justify-between py-3.5 border-t border-rule font-mono text-[12.5px]">
            <span>Studio</span>
            <span>SoftAura →</span>
          </div>
          <div className="flex justify-between py-3.5 border-t border-rule font-mono text-[12.5px]">
            <span>Located</span>
            <span>Chittagong, BD</span>
          </div>
          <div className="flex justify-between py-3.5 border-t border-b border-rule font-mono text-[12.5px]">
            <span>Languages</span>
            <span>BN · EN · FR</span>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}