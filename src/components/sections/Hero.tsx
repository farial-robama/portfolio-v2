"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useCountUp } from "@/hooks/useCountUp";

/* ------------------------------------------------------------------ */
/*  Content config — edit these, not the markup below                  */
/* ------------------------------------------------------------------ */

const PORTRAIT_SRC = "/images/Jahidul.png";

const STATS = [
  { target: 5, label: "Years in software" },
  { target: 4, label: "Shipped products" },
  { target: 1, label: "Studio founded" },
] as const;

const LANGUAGES = [
  { code: "BN", level: "Native" },
  { code: "EN", level: "B2" },
  { code: "FR", level: "B1" },
] as const;

/* ------------------------------------------------------------------ */
/*  Small pieces                                                       */
/* ------------------------------------------------------------------ */

function StatCounter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const value = useCountUp(target, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActive(true),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <b className="block font-serif text-[26px] text-teal lg:text-[32px]">
        {value}
      </b>
      <span className="font-mono text-[10.5px] uppercase tracking-wide text-ink-soft lg:text-[11px]">
        {label}
      </span>
    </div>
  );
}

function AvailabilityPill() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-rule bg-white px-4 py-2 font-mono text-[10.5px] uppercase tracking-wide text-ink lg:text-[11px]">
      <span
        aria-hidden="true"
        className="h-[7px] w-[7px] rounded-full bg-gold shadow-[0_0_0_3px_rgba(185,146,47,0.18)]"
      />
      Open to freelance &amp; collabs
    </div>
  );
}

function SpecializationNote() {
  return (
    <p className="max-w-[260px] text-right font-mono text-[11.5px] leading-relaxed text-ink-soft lg:text-[12.5px]">
      Specialized in <b className="font-medium text-ink">Python</b>,{" "}
      <b className="font-medium text-ink">Django</b>, and building reliable
      web platforms from idea to production.
    </p>
  );
}

function PortraitMedallion() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-[-20px]
h-[340px] w-[52vw] max-w-[360px]
-translate-x-1/2 overflow-hidden rounded-md
lg:top-[-40px] lg:h-[650px] lg:max-w-[500px]"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 14%, black 80%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 14%, black 80%, transparent 100%)",
      }}
    >
      <Image
  src={PORTRAIT_SRC}
  alt="Portrait of Md. Jahidul Alam"
  fill
  className="object-cover object-[center_20%]"
  sizes="(min-width: 1024px) 300px, 38vw"
  priority
/>
    </div>
  );
}

function NameMark() {
  return (
    <div aria-hidden="true" className="relative mt-6 lg:mt-0">
      {/* Hey, [space for portrait] it's me */}
      <div className="relative flex items-center justify-between">
        <span className="font-serif text-[36px] italic leading-none text-ink lg:text-[84px]">
          Hey,
        </span>
        <span className="font-serif text-[36px] italic leading-none text-teal lg:text-[84px]">
          it&apos;s me
        </span>
      </div>

      {/* I AM JAHIDUL */}
      <div className="relative z-[1] -mt-1">
        <span className="block text-[42px] font-extrabold uppercase leading-[0.92] tracking-tight text-ink lg:text-[108px]">
          I AM
        </span>
        <span className="block text-[42px] font-extrabold uppercase leading-[0.92] tracking-tight text-ink lg:text-[108px]">
          JAHID<span className="text-gold">UL</span>
        </span>
      </div>
    </div>
  );
}

function LanguageBadges() {
  return (
    <div className="flex gap-2">
      {LANGUAGES.map((lang) => (
        <div
          key={lang.code}
          className="flex h-[38px] w-[38px] -rotate-6 flex-col items-center justify-center rounded-full border-[1.5px] border-gold font-mono text-[8px] text-gold transition-transform hover:rotate-0 hover:scale-110"
        >
          <b className="text-[10.5px] leading-none">{lang.code}</b>
          {lang.level}
        </div>
      ))}
    </div>
  );
}

function RoleAndLocation() {
  return (
    <div className="text-right">
      <p className="font-mono text-[10.5px] leading-snug text-ink-soft lg:text-[11px]">
        22.35°N 91.78°E
        <br />
        <b className="font-medium text-ink">Chittagong, Bangladesh</b>
      </p>
      <p className="mt-2 text-[18px] font-bold uppercase leading-tight lg:text-[28px]">
        IT Engineer
        <br />
        <span className="text-teal">Founder, SoftAura</span>
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                                */
/* ------------------------------------------------------------------ */

export default function Hero() {
  return (
    <section id="hero" className="pt-12 pb-16 lg:pt-14">
      <div className="mx-auto max-w-[1120px] px-6 lg:px-8">
        {/* Real, accessible content — the visual treatment below is decorative */}
        <h1 className="sr-only">
          Md. Jahidul Alam — IT Engineer and Founder of SoftAura, based in
          Chittagong, Bangladesh
        </h1>

        <div className="flex flex-wrap items-start justify-between gap-6">
          <AvailabilityPill />
          <SpecializationNote />
        </div>

        <NameMark />
        <PortraitMedallion />

        <div className="mt-6 flex flex-wrap items-end justify-between gap-8 border-t border-rule pt-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3.5">
              <a href="#projects" className="btn btn-solid">
                View work
              </a>
              <a href="/Jahidul_Alam_CV.pdf" download className="btn btn-cv">
                ↓ Download CV
              </a>
            </div>
            <LanguageBadges />
          </div>

          <RoleAndLocation />
        </div>

        <div className="mt-9 flex gap-10 border-t border-rule pt-6 lg:gap-12">
          {STATS.map((s) => (
            <StatCounter key={s.label} target={s.target} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
