import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const achievements = [
  {
    year: 2025,
    title: "Top-Tier Static Event Performance",
    category: "Static Events",
    rankSummary: { costReport: "AIR 6", salesReport: "AIR 9" },
    highlights: ["Competed against 95+ top institutions", "Cost Report: AIR 6", "Sales Report: AIR 9"],
    imagePath: "/images/achievements/2025-statics.jpg",
    color: "#00FF88",
  },
  {
    year: 2025,
    title: "SAE E-BAJA Main Event Showcase",
    category: "Competition Showcase",
    rankSummary: { preliminary: "AIR 9 (IITs & NITs)" },
    highlights: ["Showcased latest Electric ATV at SAE E-BAJA", "Event held at Narsapur", "Top-tier national performance"],
    imagePath: "/images/achievements/2025-main-event.jpg",
    color: "#00CCFF",
  },
  {
    year: 2024,
    title: "SAE India Brand Ambassadors",
    category: "Recognition & Outreach",
    rankSummary: null,
    highlights: ["Selected as SAE India Brand Ambassadors", "Represented Tripura, Mizoram & Manipur", "Promoted motorsports in NE India"],
    imagePath: "/images/achievements/2024-ambassador.jpg",
    color: "#00FF88",
  },
  {
    year: 2023,
    title: "First Electric ATV from Northeast India",
    category: "Manufacturing Milestone",
    rankSummary: { preliminary: "AIR 2 (IITs & NITs)" },
    highlights: ["First Electric ATV from Northeast India", "Preliminary Round: AIR 2", "Competed against 80+ institutions"],
    imagePath: "/images/achievements/2023-electric-atv.jpg",
    color: "#00CCFF",
  },
  {
    year: 2022,
    title: "National Breakthrough — AIR 1",
    category: "Competitive Excellence",
    rankSummary: { iitNit: "AIR 1" },
    highlights: ["Secured AIR 1 among all IITs and NITs", "Established national-level dominance"],
    imagePath: "/images/achievements/2022-air1.jpg",
    color: "#FFD700",
  },
  {
    year: 2021,
    title: "Debut at SAE E-BAJA",
    category: "Competition Entry",
    rankSummary: { overall: "AIR 27", iitNit: "AIR 3" },
    highlights: ["First-ever SAE E-BAJA participation", "First team from Northeast India", "AIR 3 among IITs & NITs"],
    imagePath: "/images/achievements/2021-debut.jpg",
    color: "#00FF88",
  },
];

export default function Achievements() {
  const [active, setActive] = useState(0);
  const current = achievements[active];

  const go = (dir) =>
    setActive((p) => Math.max(0, Math.min(achievements.length - 1, p + dir)));

  return (
    <section id="explore" className="relative bg-[#040d06]/30 py-16 sm:py-24 overflow-hidden">
      
      {/* Glow */}
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00CCFF]/4 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-0 left-0 w-[300px] h-[300px] bg-[#00FF88]/3 blur-[100px] rounded-full" />

      {/* Section divider from above */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF88]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={14} className="text-[#00FF88]" />
              <span
                className="text-[10px] font-bold tracking-[0.25em] text-[#00FF88]"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                MILESTONES
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Achievements as a{" "}
              <span className="bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent">
                Team
              </span>
            </h2>
          </div>
          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#00FF88]/25 text-[#00FF88] text-xs font-bold tracking-widest hover:bg-[#00FF88]/8 hover:border-[#00FF88]/50 transition-all duration-300 shrink-0 self-start sm:self-auto"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            See All <ArrowRight size={13} />
          </Link>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">

          {/* ── Main Card ── */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-2xl overflow-hidden border border-white/8 bg-white/[0.03] shadow-2xl min-h-[320px] sm:min-h-[400px]"
              >
                {/* BG image */}
                <img
                  src={current.imagePath}
                  alt={current.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-12"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040d06] via-[#040d06]/75 to-[#040d06]/30" />

                {/* Accent line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
                  style={{ background: `linear-gradient(to bottom, ${current.color}, transparent)` }}
                />

                {/* Content */}
                <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full min-h-[320px] sm:min-h-[400px] justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span
                        className="text-[10px] font-bold tracking-[0.2em] uppercase"
                        style={{ color: current.color, fontFamily: "'Orbitron', sans-serif" }}
                      >
                        {current.category}
                      </span>
                      <span
                        className="text-4xl sm:text-5xl font-black text-white/8 select-none"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        {current.year}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-4 leading-tight">
                      {current.title}
                    </h3>

                    {current.rankSummary && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {Object.values(current.rankSummary).map((rank, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs font-black tracking-widest border"
                            style={{
                              color: current.color,
                              borderColor: `${current.color}40`,
                              background: `${current.color}12`,
                              fontFamily: "'Orbitron', sans-serif",
                            }}
                          >
                            {rank}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-2">
                    {current.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <span className="mt-1 shrink-0 w-1 h-1 rounded-full bg-[#00FF88]" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav row */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => go(-1)}
                disabled={active === 0}
                className="p-2.5 rounded-xl border border-white/8 text-gray-500 hover:border-[#00FF88]/30 hover:text-[#00FF88] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-1.5 flex-1 justify-center">
                {achievements.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? "24px" : "6px",
                      height: "6px",
                      background: i === active ? "#00FF88" : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => go(1)}
                disabled={active === achievements.length - 1}
                className="p-2.5 rounded-xl border border-white/8 text-gray-500 hover:border-[#00FF88]/30 hover:text-[#00FF88] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* ── Year list sidebar ── */}
          {/* On mobile: horizontal scroll row. On lg: vertical stack */}
          <div className="lg:col-span-2">
            {/* Mobile: horizontal pill scroll */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
              {achievements.map((a, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-200 text-left
                    ${i === active
                      ? "border-[#00FF88]/40 bg-[#00FF88]/8 text-[#00FF88]"
                      : "border-white/8 bg-white/[0.02] text-gray-500 hover:border-white/15"
                    }`}
                >
                  <span
                    className="text-xs font-black tracking-widest whitespace-nowrap"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {a.year}
                  </span>
                  {i === active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] shadow-[0_0_6px_#00FF88]" />
                  )}
                </button>
              ))}
            </div>

            {/* Desktop: vertical list */}
            <div className="hidden lg:flex flex-col gap-2">
              {achievements.map((a, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-250 group
                    ${i === active
                      ? "border-[#00FF88]/35 bg-[#00FF88]/7 text-[#00FF88]"
                      : "border-white/6 bg-white/[0.02] text-gray-500 hover:border-white/12 hover:text-gray-300 hover:bg-white/[0.03]"
                    }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p
                        className="text-[10px] font-black tracking-widest mb-0.5 opacity-60"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        {a.year}
                      </p>
                      <p className="text-xs font-semibold leading-snug truncate">{a.title}</p>
                    </div>
                    {i === active && (
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#00FF88] shadow-[0_0_6px_#00FF88]" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}