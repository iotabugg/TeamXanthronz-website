import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function ProjectsHome() {
  const projects = [
    {
      id: 1,
      name: "HoloCart",
      year: "2024",
      thumbnail: "/images/holocart-thumb.jpg",
      description:
        "An AI-driven collaborative shopping cart for smarter in-store experiences.",
      github: "https://github.com/example/holocart",
    },
    {
      id: 2,
      name: "EcoTrack",
      year: "2023",
      thumbnail: "/images/ecotrack-thumb.jpg",
      description:
        "IoT-based sustainability tracker for carbon footprint management.",
      github: "https://github.com/example/ecotrack",
    },
    {
      id: 3,
      name: "RetailVision",
      year: "2025",
      thumbnail: "/images/retailvision-thumb.jpg",
      description:
        "Computer vision powered shelf analytics for retail optimization.",
      github: "https://github.com/example/retailvision",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 80,
      },
    }),
  };

  return (
    <div className="w-full h-[70vh] bg-black/70 flex flex-col justify-center items-center py-20">
    
      <h1 className="md:text-5xl font-[Orbitron] font-semibold mb-16 text-green-500 tracking-wide">
        Projects and Innovations
      </h1>

      <div className="flex flex-wrap justify-center gap-10">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative w-[25vw] h-[30vh] rounded-2xl overflow-hidden shadow-xl border border-green-200/50 bg-cyan-400/5 group cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            {/* Project Thumbnail */}
            <img
              src={project.thumbnail}
              alt={project.name}
              className="w-full h-full object-cover"
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center text-center p-4">
              <p className="text-sm text-white mb-4">{project.description}</p>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-white hover:text-gray-900 transition"
              >
                <ExternalLink size={18} />
                <span className="text-sm">GitHub</span>
              </a>
            </div>

            {/* Year Tag */}
            <div className="absolute top-3 right-3 bg-green-500/70 text-white text-xs px-3 py-1 rounded-full">
              {project.year}
            </div>

            {/* Project Name */}
            <div className="absolute font-mono bottom-3 left-1/2 -translate-x-1/2 text-white text-lg font-medium px-3 py-1 rounded-lg">
              {project.name}
            </div>

            {/* Sliding color animation effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-500" />
          </motion.div>
        ))}
      </div>
      <div>
        <button className="mt-16 border border-cyan-300/50 p-2 rounded-sm text-green-400 font-semibold font-mono bg-slate-800 hover:rounded-2xl hover:bg-green-500 hover:text-black hover:ease-in-out duration-700">
          All Projects →
        </button>
      </div>
      <div>
      </div>
    </div>
  );
}


