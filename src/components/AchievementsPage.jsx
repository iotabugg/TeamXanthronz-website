import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";

/* =========================
   ACHIEVEMENTS DATA (6)
========================= */
const achievements = [
  {
    year: 2025,
    title: "Top-Tier Static Event Performance",
    category: "Static Events",
    rankSummary: { costReport: "AIR 6", salesReport: "AIR 9" },
    highlights: [
      "Competed against 95+ top institutions",
      "Cost Report Presentation: AIR 6",
      "Sales Report Presentation: AIR 9",
    ],
    imagePath: "/images/achievements/2025-statics.jpg",
  },
  {
    year: 2025,
    title: "SAE E-BAJA Main Event Showcase",
    category: "Competition Showcase",
    rankSummary: { preliminary: "AIR 9 (IITs & NITs)" },
    highlights: [
      "Showcased latest Electric ATV at SAE E-BAJA Main Event",
      "Event held at Narsapur (SAE Hyderabad Division)",
      "Maintained top-tier national performance",
    ],
    imagePath: "/images/achievements/2025-main-event.jpg",
  },
  {
    year: 2024,
    title: "SAE India Brand Ambassadors",
    category: "Recognition & Outreach",
    rankSummary: null,
    highlights: [
      "Selected as SAE India Brand Ambassadors",
      "Represented Tripura, Mizoram, and Manipur",
      "Promoted motorsports and innovation culture in NE India",
    ],
    imagePath: "/images/achievements/2024-ambassador.jpg",
  },
  {
    year: 2023,
    title: "First Electric ATV from Northeast India",
    category: "Manufacturing Milestone",
    rankSummary: { preliminary: "AIR 2 (IITs & NITs)" },
    highlights: [
      "Manufactured the first Electric ATV from Northeast India",
      "Preliminary Round: AIR 2 among IITs and NITs",
      "Competed against 80+ institutions in static events",
      "Cost Report: AIR 15",
      "Sales Report: AIR 23",
      "Design Report: AIR 26",
    ],
    imagePath: "/images/achievements/2023-electric-atv.jpg",
  },
  {
    year: 2022,
    title: "National Breakthrough",
    category: "Competitive Excellence",
    rankSummary: { iitNit: "AIR 1" },
    highlights: [
      "Secured AIR 1 among all IITs and NITs",
      "Established national-level technical dominance",
    ],
    imagePath: "/images/achievements/2022-air1.jpg",
  },
  {
    year: 2021,
    title: "Debut at SAE E-BAJA",
    category: "Competition Entry",
    rankSummary: { overall: "AIR 27", iitNit: "AIR 3" },
    highlights: [
      "First-ever participation at SAE E-BAJA",
      "First team from Northeast India to compete",
      "Ranked 3rd among all IITs and NITs",
    ],
    imagePath: "/images/achievements/2021-debut.jpg",
  },
];

/* =========================
   COMPONENT
========================= */
export default function AchievementsPage() {
  const years = useMemo(() => {
    const set = Array.from(new Set(achievements.map((a) => a.year)));
    return set.sort((a, b) => b - a);
  }, []);

  const [selectedYear, setSelectedYear] = useState("All");

  const visible = selectedYear === "All" ? achievements : achievements.filter((a) => a.year === Number(selectedYear));

  return (
    <section className="min-h-screen bg-black text-white px-6 py-16 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-[orbitron] text-green-400 font-bold">Achievements</h1>
            <p className="text-gray-400 text-sm mt-1">From our bold beginning to setting benchmarks, team XANTHRONZ has consistently made its mark in the E-BAJA SAE arena with dedication, innovation and engineering excellence.</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300 font-semibold">Filter</span>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedYear("All")}
                className={`px-3 py-1 rounded-md text-sm font-semibold ${selectedYear === "All" ? "bg-green-500 text-black" : "text-green-400 border border-green-400/30"}`}
              >
                All
              </button>
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(String(y))}
                  className={`px-3 py-1 rounded-md text-sm font-semibold ${String(selectedYear) === String(y) ? "bg-green-500 text-black" : "text-green-400 border border-green-400/30"}`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="py-20 text-center text-gray-400">No achievements found for the selected year.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((item) => (
              <motion.article
                key={`${item.year}-${item.title}`}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 120 }}
                className="bg-zinc-900/60 border border-green-400/20 backdrop-blur-md rounded-2xl overflow-hidden shadow-md"
              >
                <div className="h-48 w-full overflow-hidden bg-zinc-800">
                  <img src={item.imagePath} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400 flex items-center gap-2"><Calendar size={14} /> {item.year}</span>
                    <span className="text-xs text-cyan-300 uppercase font-semibold">{item.category}</span>
                  </div>

                  <h3 className="text-lg text-green-400 font-semibold mb-2">{item.title}</h3>

                  {item.rankSummary && (
                    <div className="flex gap-2 flex-wrap mb-3">
                      {Object.values(item.rankSummary).map((r, i) => (
                        <span key={i} className="px-3 py-1 rounded-full text-xs bg-cyan-500/10 border border-cyan-400/20 text-cyan-200">{r}</span>
                      ))}
                    </div>
                  )}

                  <ul className="text-sm text-gray-300 space-y-1 mb-4">
                    {item.highlights.slice(0, 4).map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">▹</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <a href={`#achievement-${item.year}`} className="text-sm text-green-400 font-semibold flex items-center gap-2">
                      View
                      <ArrowRight size={14} />
                    </a>
                    <span className="text-xs text-gray-400">{item.highlights.length} highlights</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
