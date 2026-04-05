import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gallery from "../data/gallery";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.slider.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [paused]);

  const go = (dir) => {
    setPaused(true);
    setCurrentIndex((p) => (p + dir + gallery.slider.length) % gallery.slider.length);
    setTimeout(() => setPaused(false), 5000);
  };

  return (
    <section className="relative min-h-screen bg-[#040d06]/0 text-white overflow-hidden px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
      <video className="fixed inset-0 w-full h-full object-cover -z-20 opacity-55" src="/videos/215761_medium.mp4" autoPlay muted loop playsInline />
      <div className="fixed inset-0 -z-10 bg-[#040d06]/25" />

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FF88]/20 bg-[#00FF88]/5 text-[#00FF88] text-[10px] font-bold tracking-[0.2em] mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
            GALLERY
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Moments We{" "}
            <span className="bg-gradient-to-r from-[#00CCFF] to-[#00FF88] bg-clip-text text-transparent">
              Captured
            </span>
          </motion.h1>
        </div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative w-full overflow-hidden rounded-2xl border border-white/8 shadow-2xl mb-6 group"
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${gallery.slider.length * 100}%` }}
          >
            {gallery.slider.map((img, idx) => (
              <div key={idx} className="flex-shrink-0" style={{ width: `${100 / gallery.slider.length}%` }}>
                <img src={img} alt={`Slide ${idx + 1}`}
                  className="w-full h-[220px] sm:h-[340px] md:h-[460px] object-cover" />
              </div>
            ))}
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#040d06]/60 via-transparent to-transparent pointer-events-none" />

          {/* Nav arrows */}
          <button onClick={() => go(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-black/50 border border-white/10 text-white hover:bg-[#00FF88]/20 hover:border-[#00FF88]/30 hover:text-[#00FF88] transition-all opacity-0 group-hover:opacity-100">
            <ChevronLeft size={20} />
          </button>
          <button onClick={() => go(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-black/50 border border-white/10 text-white hover:bg-[#00FF88]/20 hover:border-[#00FF88]/30 hover:text-[#00FF88] transition-all opacity-0 group-hover:opacity-100">
            <ChevronRight size={20} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {gallery.slider.map((_, i) => (
              <button key={i} onClick={() => { setCurrentIndex(i); setPaused(true); setTimeout(() => setPaused(false), 5000); }}
                className={`rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 h-1.5 bg-[#00FF88]" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Collage grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="columns-2 sm:columns-3 md:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4"
        >
          {gallery.collage.map((img, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] break-inside-avoid group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-auto object-cover group-hover:brightness-110 group-hover:scale-105 transition-all duration-500"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}