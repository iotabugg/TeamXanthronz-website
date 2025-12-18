import React from "react";
import { motion } from "framer-motion";

export default function Sponsors() {
  const logos = [
    "/images/logos/walmart.png",
    "/images/logos/google.png",
    "/images/logos/tesla.png",
    "/images/logos/meta.png",
    "/images/logos/microsoft.png",
    "/images/logos/amazon.png",
  ];

  return (
    <div className="w-full overflow-hidden bg-transparent py-6">
      <motion.div
        className="flex items-center gap-16"
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          duration: 20, // 👈 slower & smooth
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          willChange: "transform",
          transform: "translate3d(0, 0, 0)", // GPU acceleration
        }}
      >
        {/* duplicate array twice for seamless loop */}
        {[...logos, ...logos].map((logo, i) => (
          <img
            key={i}
            src={logo}
            alt={`logo-${i}`}
            className="h-12 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
          />
        ))}
      </motion.div>
    </div>
  );
}
