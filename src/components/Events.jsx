import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, CheckCircle, Clock, ArrowRight } from "lucide-react";

const eventsData = {
  upcoming: [
    { id: 1, title: "AI Bootcamp 2026", date: "March 12, 2026", venue: "Main Auditorium", description: "A hands-on bootcamp covering AI, ML, and real-world projects." },
    { id: 2, title: "Hackathon X", date: "April 5, 2026", venue: "Innovation Lab", description: "24-hour hackathon to build futuristic tech solutions." },
  ],
  completed: [
    { id: 3, title: "Web Dev Workshop", date: "Jan 18, 2025", venue: "Seminar Hall B", description: "Workshop on modern React and frontend best practices." },
    { id: 4, title: "Intro to Cybersecurity", date: "Oct 2, 2024", venue: "Online", description: "Basics of cybersecurity, ethical hacking, and defense." },
  ],
};

export default function Events() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <section className="relative min-h-screen bg-[#040d06]/0 text-white overflow-hidden">
      {/* Video + tint */}
      <video className="fixed inset-0 w-full h-full object-cover -z-20 opacity-55" src="/videos/215761_medium.mp4" autoPlay muted loop playsInline />
      <div className="fixed inset-0 -z-10 bg-[#040d06]/25" />
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[400px] bg-[#00FF88]/4 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-[10px] font-bold tracking-[0.2em] mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            CLUB EVENTS
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-3"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent">
              Events &
            </span>{" "}
            Innovations
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
            className="text-gray-400 text-sm sm:text-base">
            🚀 Explore our journey through events & innovations
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <div className="flex gap-1 p-1 rounded-xl bg-white/5 border border-white/8">
            {[
              { key: "upcoming", label: "Upcoming", icon: Clock },
              { key: "completed", label: "Completed", icon: CheckCircle },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold tracking-widest transition-all duration-300
                  ${activeTab === key
                    ? "bg-[#00FF88] text-black shadow-[0_0_16px_rgba(0,255,136,0.3)]"
                    : "text-gray-400 hover:text-white"
                  }`}
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                <Icon size={14} />
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{label.slice(0, 5)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7"
          >
            {eventsData[activeTab].map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#00FF88]/20 transition-all duration-400"
              >
                {/* Status chip */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] px-2.5 py-1 rounded-full
                    ${activeTab === "upcoming"
                      ? "bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/25"
                      : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
                    }`}
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {activeTab === "upcoming" ? (
                      <><span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" /> UPCOMING</>
                    ) : (
                      <><CheckCircle size={10} /> COMPLETED</>
                    )}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#00FF88] transition-colors duration-300 leading-tight">
                  {event.title}
                </h3>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar size={13} className="text-[#00FF88] shrink-0" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin size={13} className="text-[#00FF88] shrink-0" />
                    {event.venue}
                  </div>
                </div>

                <p className="text-sm text-gray-400 leading-relaxed flex-1">
                  {event.description}
                </p>

                <div className="pt-3 border-t border-white/5">
                  <button className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00FF88] hover:gap-3 transition-all duration-200"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    Details <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}