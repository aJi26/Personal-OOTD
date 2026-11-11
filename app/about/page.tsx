import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { playHoverSound, playClickSound } from "@/lib/sounds";

export default function AboutPage() {
  const bodyStats = [
    { label: "Height", value: "172 - 173 cm (5'8\")" },
    { label: "Weight", value: "50 kg (~110 lbs)" },
    { label: "Top Size", value: "S / M (US S / EU 46)" },
    { label: "Bottom Size", value: "30 - 31 (US 30 / 31)" },
    { label: "Footwear", value: "41 - 42 EU (US 8 - 8.5)" },
    { label: "Base Location", value: "Surabaya, Indonesia" },
  ];

  const stylePrinciples = [
    {
      number: "01",
      title: "Silhouette Precedes Color",
      description:
        "Proportions dictate how an outfit commands presence. A relaxed shoulder drop, high-rise trouser drape, and stacked hemline carry aesthetic weight far beyond loud prints.",
    },
    {
      number: "02",
      title: "Tactile Longevity & Weight",
      description:
        "Investing in durable heavyweight cotton, shuttle-loomed denim, and versatile silhouettes ensures garments age gracefully with authentic character.",
    },
    {
      number: "03",
      title: "Authentic Personal Rotation",
      description:
        "Every single item linked here has been personally owned, washed, and worn outdoors by Aji in daily life across Surabaya. No phantom sponsored items without real-world wear test approval.",
    },
  ];

  return (
    <div className="flex-1 w-full bg-white overflow-y-auto">
      {/* Editorial Hero Header */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-12 border-b border-zinc-200 bg-zinc-50/50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-950" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
              The Philosophy & Story
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-950 tracking-tight font-sans">
            Style is what remains when trends expire.
          </h1>

          <p className="mt-6 text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            Curated and styled by <strong>Aji Bayu</strong> (22). Exploring a meticulous personal rotation spanning <strong>Streetwear</strong>, <strong>Smart Casual</strong>, and <strong>Chic</strong> silhouettes. Beyond mere clothing, Outfit Archive is built as a living, breathing diary of proportions—where raw architecture meets tactile comfort, and every hemline tells a deliberate story of daily city life.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-16 space-y-16">
        {/* Body Stats & Sizing Guide (Aji Bayu Pamungkas exact personal data) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block">
                Reference Guide
              </span>
              <h2 className="text-2xl font-bold text-zinc-950 mt-0.5">
                Body Measurements & Sizing
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
              For fit comparison
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bodyStats.map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-zinc-200 bg-zinc-50/50"
              >
                <span className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400">
                  {stat.label}
                </span>
                <span className="block font-mono text-sm sm:text-base font-bold text-zinc-950 mt-1">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Core Principles */}
        <div className="space-y-8">
          <div className="border-b border-zinc-200 pb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold block">
              Ethos
            </span>
            <h2 className="text-2xl font-bold text-zinc-950 mt-0.5">
              Three Wardrobe Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stylePrinciples.map((principle) => (
              <div
                key={principle.number}
                className="p-6 rounded-2xl border border-zinc-200 bg-white hover:border-zinc-400 transition-colors"
              >
                <span className="font-mono text-3xl font-black text-zinc-300 block mb-3">
                  {principle.number}
                </span>
                <h3 className="font-bold text-base text-zinc-950 mb-2">
                  {principle.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Inspiration & Affiliate Disclosure */}
        <div className="p-8 rounded-2xl border border-zinc-200 bg-zinc-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold text-zinc-900">
                Transparent Referral Policy
              </span>
            </div>
            <p className="text-xs text-zinc-600 max-w-xl leading-relaxed">
              When you purchase garments through the Shopee, Tokopedia, or TikTok Shop buttons on this site, a small affiliate commission may be earned at zero additional cost to you. This directly funds archival maintenance and curation[cite: 20].
            </p>
          </div>

          <Link
            href="/contact"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-950 text-white font-mono text-xs font-bold hover:bg-zinc-800 transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Collaborate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}