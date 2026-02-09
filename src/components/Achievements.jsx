import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

/* =========================
   ACHIEVEMENTS DATA
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

export default function AchievementsScrollCards() {
  const [activeCard, setActiveCard] = useState(0);

  const goNext = () =>
    setActiveCard((prev) => Math.min(prev + 1, achievements.length - 1));

  const goPrev = () =>
    setActiveCard((prev) => Math.max(prev - 1, 0));

  return (
    <section className="relative w-screen h-[70vh] bg-gradient-to-b from-cyan-400/5 via-black/40 to-black/70 text-white">
      <div className="sticky top-0 h-full flex justify-center items-center overflow-hidden">
        {/* LEFT SIDE */}
        <div className="w-1/2 h-full flex flex-col justify-center items-center px-10">
          <h1 className="text-5xl md:text-6xl font-[Orbitron] text-cyan-200 text-center max-w-sm mb-8">
            Milestones we achieved as a team
          </h1>

          <Link
            to="/achievements"
            className="bg-slate-900/90 text-green-400 font-semibold font-mono
                       px-8 py-3 border border-cyan-500 text-xl mt-5
                       shadow-[0_0_20px_rgba(34,211,238,0.5)]
                       transition-all duration-700
                       hover:scale-105 hover:rounded-2xl
                       hover:bg-green-500 hover:text-black"
          >
            See All
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative w-2/3 h-full flex items-center justify-center overflow-hidden">
          {/* Cards */}
          {achievements.map((item, index) => {
            const isActive = index === activeCard;
            const isPrevious = index < activeCard;
            const isNext = index > activeCard;

            let animateProps = {};
            if (isActive) {
              animateProps = { x: 0, rotate: 0, opacity: 1, scale: 1 };
            } else if (isPrevious) {
              animateProps = {
                x: "-120%",
                rotate: -12,
                opacity: 0,
                scale: 0.9,
              };
            } else if (isNext) {
              animateProps = {
                x: "120%",
                rotate: 12,
                opacity: 0,
                scale: 0.9,
              };
            }

            return (
              <motion.div
                key={`${item.year}-${item.title}`}
                animate={animateProps}
                transition={{ type: "spring", stiffness: 90, damping: 22 }}
                className="absolute w-3/4 h-[70%] rounded-2xl overflow-hidden
                           bg-cyan-400/15 backdrop-blur-md
                           border border-cyan-300/30 shadow-xl
                           p-8 flex flex-col justify-between"
              >
                {/* Background */}
                <img
                  src={item.imagePath}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <div className="relative">
                  <span className="text-cyan-300 text-sm uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h2 className="text-4xl font-bold text-cyan-200 mt-1">
                    {item.year}
                  </h2>
                  <h3 className="text-xl font-semibold mt-2">
                    {item.title}
                  </h3>
                </div>

                {item.rankSummary && (
                  <div className="relative flex gap-3 flex-wrap mt-4">
                    {Object.values(item.rankSummary).map((rank, i) => (
                      <span
                        key={i}
                        className="px-4 py-1 rounded-full text-sm
                                   bg-cyan-500/20 border border-cyan-400/30"
                      >
                        {rank}
                      </span>
                    ))}
                  </div>
                )}

                <ul className="relative mt-6 space-y-2 text-sm text-white/85">
                  {item.highlights.map((point, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-cyan-400">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}

          {/* RIGHT-MOST NAVIGATION */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            <button
              onClick={goPrev}
              disabled={activeCard === 0}
              className="p-3 rounded-full bg-black/50 border border-cyan-400/40
                         text-cyan-300 hover:bg-cyan-400/20 disabled:opacity-30"
            >
              <ChevronUp size={22} />
            </button>

            <button
              onClick={goNext}
              disabled={activeCard === achievements.length - 1}
              className="p-3 rounded-full bg-black/50 border border-cyan-400/40
                         text-cyan-300 hover:bg-cyan-400/20 disabled:opacity-30"
            >
              <ChevronDown size={22} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
