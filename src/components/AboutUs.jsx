import React from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Wrench, Globe, BookOpen, Flag } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="bg-black/90 text-gray-200 min-h-screen py-16 text-sm relative overflow-hidden">
      {/* Background Video (kept same) */}
      <video
        className="fixed inset-0 w-full h-full object-cover -z-20"
        src="/videos/61695-499594106.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="fixed bg-cyan-300/50 inset-0 w-full h-full -z-20" />

      {/* Heading (match Events theme) */}
      <div className="text-center mb-10 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:text-3xl font-[orbitron] font-bold text-green-400 mb-2"
        >
          About Team Xanthronz
        </motion.h1>
        <p className="text-gray-400 text-sm font-semibold">
          “Driven by passion, powered by Team Xanthronz”
        </p>
      </div>

      {/* Story & Mission - Redesigned as highlighted panels */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6 mb-16">
        <motion.article
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-zinc-900/60 border border-green-400/30 backdrop-blur-md rounded-2xl p-6 shadow-md overflow-hidden"
        >
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-cyan-300 rounded-l-2xl" />
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
              <BookOpen size={28} />
            </div>
            <div>
              <h3 className="text-green-400 font-[orbitron] text-xl mb-2">The Story</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                We are <span className="text-green-400 font-semibold">Team Xanthronz</span> — a passionate group of engineers,
                innovators, and dreamers. From sleepless nights in the workshop to
                the adrenaline rush on the race track, our journey stands as a
                testament to teamwork, resilience, and an uncompromising pursuit of
                excellence.
              </p>
            </div>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-zinc-900/60 border border-green-400/30 backdrop-blur-md rounded-2xl p-6 shadow-md overflow-hidden"
        >
          <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-cyan-300 rounded-r-2xl" />
          <div className="flex items-start gap-4 relative z-10">
            <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
              <Flag size={28} />
            </div>
            <div>
              <h3 className="text-green-400 font-[orbitron] text-xl mb-2">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                At our core, we are more than just a racing team — we are a family of
                innovators driven by passion, collaboration, and creativity. Our
                mission is to provide a platform where students can apply
                engineering concepts to real-world challenges, develop critical
                problem-solving skills, and evolve into industry-ready
                professionals.
              </p>
            </div>
          </div>
        </motion.article>
      </div>

      {/* What Drives Us - keep similar cards but aligned to Events style */}
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center font-[orbitron] text-2xl text-green-400 mb-8"
        >
          What Drives Us
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[{
            icon: Wrench,
            title: "Engineering Excellence",
            text: "Designing and building high-performance vehicles with precision and innovation.",
          },{
            icon: Users,
            title: "Teamwork",
            text: "A culture built on collaboration, trust, and shared ambition.",
          },{
            icon: Globe,
            title: "Global Competitions",
            text: "Representing our institution at national and international stages.",
          },{
            icon: Trophy,
            title: "Relentless Growth",
            text: "Continuously pushing limits and learning beyond the classroom.",
          }].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="bg-zinc-900/60 border border-green-400/30 backdrop-blur-md rounded-2xl p-6 text-center shadow-md"
            >
              <item.icon className="mx-auto mb-4 text-green-400" size={28} />
              <h3 className="text-green-400 font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-gray-300">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
