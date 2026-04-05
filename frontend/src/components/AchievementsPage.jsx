import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ArrowRight, Trophy } from "lucide-react";

const achievements = [
  { year: 2025, title: "Top-Tier Static Event Performance", category: "Static Events", rankSummary: { costReport: "AIR 6", salesReport: "AIR 9" }, highlights: ["Competed against 95+ top institutions", "Cost Report Presentation: AIR 6", "Sales Report Presentation: AIR 9"], imagePath: "/images/achievements/2025-statics.jpg" },
  { year: 2025, title: "SAE E-BAJA Main Event Showcase", category: "Competition Showcase", rankSummary: { preliminary: "AIR 9 (IITs & NITs)" }, highlights: ["Showcased latest Electric ATV at SAE E-BAJA Main Event", "Event held at Narsapur (SAE Hyderabad Division)", "Maintained top-tier national performance"], imagePath: "/images/achievements/2025-main-event.jpg" },
  { year: 2024, title: "SAE India Brand Ambassadors", category: "Recognition & Outreach", rankSummary: null, highlights: ["Selected as SAE India Brand Ambassadors", "Represented Tripura, Mizoram, and Manipur", "Promoted motorsports and innovation culture in NE India"], imagePath: "/images/achievements/2024-ambassador.jpg" },
  { year: 2023, title: "First Electric ATV from Northeast India", category: "Manufacturing Milestone", rankSummary: { preliminary: "AIR 2 (IITs & NITs)" }, highlights: ["Manufactured the first Electric ATV from Northeast India", "Preliminary Round: AIR 2 among IITs and NITs", "Competed against 80+ institutions", "Cost Report: AIR 15", "Sales Report: AIR 23", "Design Report: AIR 26"], imagePath: "/images/achievements/2023-electric-atv.jpg" },
  { year: 2022, title: "National Breakthrough", category: "Competitive Excellence", rankSummary: { iitNit: "AIR 1" }, highlights: ["Secured AIR 1 among all IITs and NITs", "Established national-level technical dominance"], imagePath: "/images/achievements/2022-air1.jpg" },
  { year: 2021, title: "Debut at SAE E-BAJA", category: "Competition Entry", rankSummary: { overall: "AIR 27", iitNit: "AIR 3" }, highlights: ["First-ever participation at SAE E-BAJA", "First team from Northeast India to compete", "Ranked 3rd among all IITs and NITs"], imagePath: "/images/achievements/2021-debut.jpg" },
];

export default function AchievementsPage() {
  const years = useMemo(() => {
    return Array.from(new Set(achievements.map((a) => a.year))).sort((a, b) => b - a);
  }, []);

  const [selectedYear, setSelectedYear] = useState("All");
  const visible = selectedYear === "All" ? achievements : achievements.filter((a) => a.year === Number(selectedYear));

  return (
    <section className="relative min-h-screen bg-[#040d06] text-white overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 w-[600px] h-[400px] bg-[#00FF88]/4 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[400px] bg-[#00CCFF]/4 blur-[130px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-4">
            <Trophy size={16} className="text-[#00FF88]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#00FF88]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              ACHIEVEMENTS
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 leading-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Our{" "}
            <span className="bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent">
              Milestones
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="text-gray-400 text-sm sm:text-base max-w-2xl">
            From our bold beginning to setting benchmarks, Team Xanthronz has consistently made its mark in the E-BAJA SAE arena with dedication, innovation and engineering excellence.
          </motion.p>
        </div>

        {/* Filter pills */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center gap-2 mb-8 sm:mb-12">
          <span className="text-xs text-gray-500 font-semibold tracking-widest mr-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            FILTER:
          </span>
          {["All", ...years.map(String)].map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(y === "All" ? "All" : y)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest transition-all duration-200
                ${(y === "All" ? selectedYear === "All" : selectedYear === y)
                  ? "bg-[#00FF88] text-black shadow-[0_0_16px_rgba(0,255,136,0.3)]"
                  : "border border-white/10 text-gray-400 hover:border-[#00FF88]/30 hover:text-[#00FF88]"
                }`}
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {y}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {visible.length === 0 ? (
          <div className="py-24 text-center text-gray-500">No achievements found for the selected year.</div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7"
          >
            <AnimatePresence>
              {visible.map((item, idx) => (
                <motion.article
                  key={`${item.year}-${item.title}`}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white/[0.03] border border-white/8 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:border-[#00FF88]/20 transition-all duration-400"
                >
                  {/* Image */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-white/5">
                    <img
                      src={item.imagePath}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040d06] via-transparent to-transparent" />
                    {/* Year badge */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 border border-white/10 backdrop-blur-sm">
                      <span className="text-xs font-black text-white/80" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        {item.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold tracking-[0.15em] text-[#00CCFF] uppercase"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white mb-3 leading-tight group-hover:text-[#00FF88] transition-colors duration-300">
                      {item.title}
                    </h3>

                    {/* Rank badges */}
                    {item.rankSummary && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {Object.values(item.rankSummary).map((r, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00FF88]/10 border border-[#00FF88]/25 text-[#00FF88]"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}>
                            {r}
                          </span>
                        ))}
                      </div>
                    )}

                    <ul className="space-y-1.5 mb-5">
                      {item.highlights.slice(0, 3).map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                          <span className="text-[#00FF88] mt-0.5 shrink-0">▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <a href={`#achievement-${item.year}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00FF88] hover:gap-3 transition-all duration-200"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}>
                        View <ArrowRight size={12} />
                      </a>
                      <span className="text-[10px] text-gray-600">
                        {item.highlights.length} highlights
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}