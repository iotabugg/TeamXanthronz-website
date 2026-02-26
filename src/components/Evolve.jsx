import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

const evolveCard = {
  id: 1,
  title: "AI Bootcamp 2026",
  date: "March 12, 2026",
  venue: "Main Auditorium",
  description: "A hands-on bootcamp covering AI, ML, and real-world projects.",
};

export default function Evolve() {
  return (
    <section className="bg-black/90 text-gray-200 min-h-screen py-16 text-sm flex items-start justify-center">
      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover -z-20"
        src="/videos/61695-499594106.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="fixed bg-cyan-300/50 inset-0 w-full h-full -z-20" />

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="md:text-2xl font-[orbitron] font-bold text-green-400 mb-3">
          Evolve
        </h2>
        <p className="text-gray-400 text-sm font-semibold">
          🚀 Explore our journey through events & innovations
        </p>
      </div>

      {/* Single Evolve Card (centered) */}
      <div className="w-full max-w-3xl px-6">
        <motion.div
          key={evolveCard.id}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="mx-auto bg-zinc-900/60 border border-green-400/30 backdrop-blur-md shadow-md rounded-2xl p-8 w-80 md:w-96"
        >
          <h3 className="text-green-400 text-xl font-semibold mb-2">{evolveCard.title}</h3>

          <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
            <Calendar size={16} /> <span>{evolveCard.date}</span>
            <span className="mx-2">•</span>
            <MapPin size={16} /> <span>{evolveCard.venue}</span>
          </div>

          <p className="text-gray-300 text-sm mb-4">{evolveCard.description}</p>
        </motion.div>
      </div>
    </section>
  );
}
