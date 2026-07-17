"use client";

import { useEffect, useState } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import Link from "next/link";

const LINKS = [
  { id: "hero", label: "Intro" },
  { id: "profile", label: "Profile" },
  { id: "journey", label: "Journey" },
  { id: "toolkit", label: "Toolkit" },
  { id: "projects", label: "Projects" },
  { id: "softaura", label: "SoftAura" },
  { id: "blog", label: "Journal" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeId = useScrollSpy(LINKS.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-rule transition-[padding] ${
        scrolled ? "py-0" : "py-0"
      }`}
    >
      <div
        className={`max-w-[1120px] mx-auto px-8 flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? "h-[54px]" : "h-[68px]"
        }`}
      >
        <a href="#hero" className="font-serif font-semibold text-[19px]">
          Jahidul <span className="text-gold">Alam</span>
        </a>

        <div className="hidden lg:flex gap-7 font-mono text-xs uppercase tracking-wider text-ink-soft">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative py-1 transition-colors hover:text-teal ${
                activeId === link.id ? "text-teal" : ""
              }`}
            >
              {link.label}
              {activeId === link.id && (
                <span className="absolute left-0 -bottom-0.5 w-full h-px bg-gold" />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dashboard"
            className="btn btn-outline hidden lg:inline-block"
          >
            Dashboard
          </Link>
          {/* <a
            href="/Jahidul_Alam_CV.pdf"
            download
            className="btn btn-outline hidden lg:inline-block"
          >
            Download CV
          </a> */}
          <a href="#contact" className="btn btn-solid hidden sm:inline-block">
            Get in touch
          </a>
          <button
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden flex flex-col justify-center gap-[5px] w-[38px] h-[38px] border border-ink rounded-sm"
          >
            <span
              className={`block w-4 h-[1.5px] bg-ink mx-auto transition ${
                open ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-4 h-[1.5px] bg-ink mx-auto transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-4 h-[1.5px] bg-ink mx-auto transition ${
                open ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden flex flex-col bg-cream border-t border-rule">
          {LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setOpen(false)}
              className="px-8 py-4 font-mono text-[13px] uppercase tracking-wider text-ink-soft border-b border-rule"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/Jahidul_Alam_CV.pdf"
            download
            className="px-8 py-4 font-mono text-[13px] uppercase tracking-wider text-gold"
          >
            Download CV
          </a>
        </div>
      )}
    </nav>
  );
}
