import React, { useState, useMemo } from "react";
import { data } from "../data/data_transformed";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, X, Crown } from "lucide-react";

export default function Squads() {
  const years = useMemo(() =>
    Object.keys(data).filter((y) => !isNaN(Number(y))).sort((a, b) => Number(b) - Number(a)),
    []
  );

  const [selectedYear, setSelectedYear] = useState(years[0] || "");
  const [selectedMember, setSelectedMember] = useState(null);

  const currentTeam = data[selectedYear] || [];
  const leader = currentTeam.find((m) => m.role === "CAPTAIN");
  const others = currentTeam.filter((m) => m.role !== "CAPTAIN");

  return (
    <section className="relative min-h-screen bg-[#040d06]/10 text-white overflow-hidden">
      {/* Background */}
      <video className="fixed inset-0 w-full h-full object-cover -z-20 opacity-55" src="/videos/215761_medium.mp4" autoPlay muted loop playsInline preload="none" aria-hidden="true" />
      <div className="fixed inset-0 -z-10 bg-[#040d06]/25" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#00FF88]/4 blur-[130px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-[10px] font-bold tracking-[0.2em] mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />
            MEET THE TEAM
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-3"
            style={{ fontFamily: "'Orbitron', sans-serif" }}>
            Team{" "}
            <span className="bg-gradient-to-r from-[#00FF88] to-[#00CCFF] bg-clip-text text-transparent">
              Xanthronz
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }} className="text-gray-400 text-sm sm:text-base">
            ⚡ Meet the brilliant minds behind the innovation 🧠
          </motion.p>
        </div>

        {/* Year Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-14">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-xl text-xs font-bold tracking-widest transition-all duration-300
                ${selectedYear === year
                  ? "bg-[#00FF88] text-black shadow-[0_0_16px_rgba(0,255,136,0.3)]"
                  : "border border-white/10 text-gray-400 hover:border-[#00FF88]/30 hover:text-[#00FF88]"
                }`}
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Captain */}
        {leader && (
          <div className="flex justify-center mb-10 sm:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] text-[10px] font-bold tracking-widest z-10"
                style={{ fontFamily: "'Orbitron', sans-serif" }}>
                <Crown size={10} /> CAPTAIN
              </div>
              <MemberCard member={leader} onClick={setSelectedMember} leader />
            </motion.div>
          </div>
        )}

        {/* Members grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6"
          >
            {others.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <MemberCard member={member} onClick={setSelectedMember} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
          >
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
            <motion.div
              className="relative bg-[#050f07] border border-[#00FF88]/20 rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto shadow-2xl text-center"
              initial={{ scale: 0.88, opacity: 0, y: 32 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 32 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:text-[#00FF88] hover:bg-[#00FF88]/10 transition-all"
              >
                <X size={18} />
              </button>

              <div className="relative inline-block mb-4">
                <img src={selectedMember.img} alt={selectedMember.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover mx-auto border-2 border-[#00FF88]/30" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-[#00FF88]/20 shadow-[0_0_20px_rgba(0,255,136,0.15)]" />
              </div>

              <h3 className="text-xl font-black text-white mb-1">{selectedMember.name}</h3>
              <p className="text-[#00FF88] text-sm font-semibold mb-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                {selectedMember.role}
              </p>
              <p className="text-gray-400 text-xs mb-5">{selectedMember.department}</p>

              {/* Social */}
              <div className="flex justify-center gap-3 mb-6">
                {selectedMember.github && (
                  <a href={selectedMember.github} target="_blank" rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/30 transition-all">
                    <Github size={16} />
                  </a>
                )}
                {selectedMember.email && (
                  <a href={`mailto:${selectedMember.email}`}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/30 transition-all">
                    <Mail size={16} />
                  </a>
                )}
                {selectedMember.linkedin && (
                  <a href={selectedMember.linkedin} target="_blank" rel="noreferrer"
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-[#00FF88] hover:border-[#00FF88]/30 transition-all">
                    <Linkedin size={16} />
                  </a>
                )}
              </div>

              {/* Skills */}
              {selectedMember.skills?.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#00FF88]/60 mb-3 uppercase"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}>Skills</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {selectedMember.skills.map((skill, i) => (
                      <span key={i} className="px-2.5 py-1 text-xs bg-[#00FF88]/8 text-[#00FF88] border border-[#00FF88]/20 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function MemberCard({ member, onClick, leader = false }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onClick={() => onClick(member)}
      className={`group cursor-pointer bg-white/[0.03] border border-white/8 rounded-2xl overflow-hidden
        hover:border-[#00FF88]/25 hover:bg-[#00FF88]/5 transition-all duration-300
        ${leader ? "w-52 sm:w-64" : "w-full"}`}
    >
      <div className={`overflow-hidden ${leader ? "h-56 sm:h-64" : "h-40 sm:h-48"}`}>
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-85 group-hover:opacity-100"
        />
      </div>
      <div className="p-3 sm:p-4 text-center">
        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00FF88] transition-colors duration-300 truncate">
          {member.name}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{member.role}</p>
        {member.department && (
          <p className="text-[10px] text-gray-600 mt-0.5 truncate">{member.department}</p>
        )}
      </div>
    </motion.div>
  );
}