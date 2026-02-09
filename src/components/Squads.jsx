import React, { useState, useMemo } from "react";
import { data } from "../data/data_transformed";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, X } from "lucide-react";

export default function Squads() {
    /* ---------- Years (safe sorting) ---------- */
    const years = useMemo(
        () =>
            Object.keys(data)
                .filter((y) => !isNaN(Number(y)))
                .sort((a, b) => Number(b) - Number(a)),
        []
    );

    const [selectedYear, setSelectedYear] = useState(years[0] || "");
    const [selectedMember, setSelectedMember] = useState(null);

    const currentTeam = data[selectedYear] || [];
    const leader = currentTeam.find((m) => m.role === "CAPTAIN");
    const others = currentTeam.filter((m) => m.role !== "CAPTAIN");

    return (
        <section className="bg-black/90 text-gray-200 min-h-screen py-16 text-sm relative overflow-hidden">
            {/* Background Video */}
            <video
                className="fixed inset-0 w-full h-full object-cover -z-20"
                src="/videos/61695-499594106.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
            />
            <div className="fixed inset-0 bg-cyan-300/40 -z-10" />

            {/* Heading */}
            <div className="text-center mb-10">
                <h2 className="md:text-2xl font-[orbitron] font-bold text-green-400 mb-3">
                    Team Xanthronz
                </h2>
                <p className="text-gray-400 text-sm font-semibold">
                    ⚡ Meet the brilliant minds behind the innovation 🧠
                </p>
            </div>

            {/* Year Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 text-xs font-semibold">
                {years.map((year) => (
                    <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`px-4 py-2 rounded-md border transition
                            ${
                                selectedYear === year
                                    ? "bg-green-500 text-black border-green-400 scale-95"
                                    : "border-green-400/40 text-green-400 hover:bg-green-600 hover:text-black"
                            }`}
                    >
                        {year}
                    </button>
                ))}
            </div>

            {/* Leader */}
            {leader && (
                <div className="flex justify-center mb-14">
                    <MemberCard member={leader} onClick={setSelectedMember} leader />
                </div>
            )}

            {/* Members Grid */}
            <div className="grid gap-10 px-6 place-items-center grid-cols-[repeat(auto-fit,minmax(220px,1fr))] max-w-7xl mx-auto">
                {others.map((member) => (
                    <MemberCard
                        key={member.name}
                        member={member}
                        onClick={setSelectedMember}
                    />
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedMember(null)}
                    >
                        <motion.div
                            className="bg-zinc-900 border border-green-400/30 rounded-3xl p-8 w-full max-w-3xl mx-4 relative text-center shadow-2xl"
                            initial={{ scale: 0.85, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: 40 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 text-green-400 hover:text-green-300"
                                onClick={() => setSelectedMember(null)}
                            >
                                <X size={20} />
                            </button>

                            <img
                                src={selectedMember.img}
                                alt={selectedMember.name}
                                className="w-32 h-32 rounded-full object-cover mx-auto border-2 border-green-400 mb-4"
                            />

                            <h3 className="text-green-400 text-xl font-semibold">
                                {selectedMember.name}
                            </h3>
                            <p className="text-gray-300">{selectedMember.role}</p>
                            <p className="text-sm text-gray-400">
                                {selectedMember.department}
                            </p>

                            {/* Social Links */}
                            <div className="flex justify-center gap-4 mt-5 text-green-400">
                                {selectedMember.github && (
                                    <a href={selectedMember.github} target="_blank" rel="noreferrer">
                                        <Github size={20} />
                                    </a>
                                )}
                                {selectedMember.email && (
                                    <a href={`mailto:${selectedMember.email}`}>
                                        <Mail size={20} />
                                    </a>
                                )}
                                {selectedMember.linkedin && (
                                    <a
                                        href={selectedMember.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <Linkedin size={20} />
                                    </a>
                                )}
                            </div>

                            {/* Skills */}
                            {selectedMember.skills?.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="text-sm text-green-400 mb-2">
                                        Skills
                                    </h4>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {selectedMember.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-2 py-1 bg-green-400/10 text-green-300 border border-green-400/20 rounded-md text-xs"
                                            >
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

/* ---------- Reusable Card ---------- */
function MemberCard({ member, onClick, leader = false }) {
    return (
        <motion.div
            whileHover={{ rotateY: 8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 120 }}
            className={`bg-zinc-900/60 border backdrop-blur-md shadow-md rounded-xl overflow-hidden cursor-pointer
                ${leader ? "border-green-400/40 w-64" : "border-green-400/20 w-56"}`}
            onClick={() => onClick(member)}
        >
            <div className={`overflow-hidden ${leader ? "h-56" : "h-48"}`}>
                <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition duration-700"
                />
            </div>

            <div className="p-4 text-center">
                <h3 className="text-green-400 text-lg font-semibold">
                    {member.name}
                </h3>
                <p className="text-sm text-gray-300">{member.role}</p>
                <p className="text-xs text-gray-400 mt-1">
                    {member.department}
                </p>
            </div>
        </motion.div>
    );
}
