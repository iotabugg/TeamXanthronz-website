import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Lander() {
    const RotatingWords = () => {
        const words = ["DESIGN", "PROTOTYPE", "RACE"];
        const [index, setIndex] = useState(0);

        useEffect(() => {
            const interval = setInterval(
                () => setIndex((prev) => (prev + 1) % words.length),
                1500
            );
            return () => clearInterval(interval);
        }, []);

        return (
            <span className="relative inline-flex justify-center items-center font-mono overflow-hidden align-middle h-[1.5em] min-w-[7ch] sm:min-w-[9ch] md:min-w-[10ch] lg:min-w-[12ch]">
                <AnimatePresence mode="wait">
                    <motion.span
                        key={words[index]}
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "100%", opacity: 0 }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        className="absolute text-cyan-400 font-semibold text-center"
                    >
                        {words[index]}
                    </motion.span>
                </AnimatePresence>
            </span>
        );
    };

    return (
        <section className="relative flex justify-center items-center min-h-screen w-full overflow-hidden text-white">
            {/* Background stays untouched */}
            <div className="absolute inset-0 bg-cyan-400/5" />

            {/* Foreground content (scaled + perfectly centered) */}
            <motion.div
                className="
          relative z-10 flex flex-col justify-center items-center text-center
          origin-center scale-[0.75] md:scale-[0.8] lg:scale-[0.75] xl:scale-[0.7]
          px-6 space-y-6 sm:space-y-8
        "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Animated Heading */}
                <motion.h1
                    className="text-5xl  font-black tracking-tight leading-tight font-sans md:text-7xl"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.span
                        className="inline-block bg-gradient-to-r from-[#00FF88] via-[#00CC66] to-[#00FFCC] bg-clip-text text-transparent"
                        animate={{
                            textShadow: [
                                "0 0 3px rgba(0,255,136,0.2)",
                                "0 0 6px rgba(0,255,136,0.3)",
                                "0 0 3px rgba(0,255,136,0.2)",
                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        DESIGNING,&nbsp;
                    </motion.span>

                    {/* FIXED: Removed extra strong glow from BUILDING */}
                    <motion.span
                        className="inline-block bg-gradient-to-r from-[#66FF00] via-[#00FF88] to-[#00CC44] bg-clip-text text-transparent"
                        animate={{
                            textShadow: [
                                "0 0 2px rgba(102,255,0,0.15)",
                                "0 0 4px rgba(102,255,0,0.25)",
                                "0 0 2px rgba(102,255,0,0.15)",
                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.3,
                        }}
                    >
                        BUILDING&nbsp;
                    </motion.span>

                    <motion.span
                        className="inline-block bg-gradient-to-r from-[#00FFAA] via-[#00FF66] to-[#00CC88] bg-clip-text text-transparent"
                        animate={{
                            textShadow: [
                                "0 0 3px rgba(0,255,136,0.2)",
                                "0 0 6px rgba(0,255,136,0.3)",
                                "0 0 3px rgba(0,255,136,0.2)",
                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.6,
                        }}
                    >
                        & RACING&nbsp;
                    </motion.span>

                    <motion.span
                        className="inline-block bg-gradient-to-r from-[#00eeff] via-[#00c0fa] to-[#00FFCC] bg-clip-text text-transparent"
                        animate={{
                            textShadow: [
                                "0 0 4px rgba(0,238,255,0.3)",
                                "0 0 8px rgba(0,238,255,0.4)",
                                "0 0 4px rgba(0,238,255,0.3)",
                            ],
                            scale: [1, 1.02, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.9,
                        }}
                    >
                        EVs
                    </motion.span>
                </motion.h1>

                {/* Subheading */}
                <motion.div
                    className="flex items-center justify-center p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                >
                    <motion.p
                        className="text-center text-lg sm:text-xl md:text-2xl font-medium leading-relaxed flex flex-wrap items-center justify-center bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-clip-text text-transparent"
                        style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
                        animate={{
                            textShadow: ["0 0 2px rgba(255,255,255,0.1)", "0 0 4px rgba(255,255,255,0.2)", "0 0 2px rgba(255,255,255,0.1)"]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        We{" "}
                        <span className="inline-flex align-middle">
                            <RotatingWords />
                        </span>{" "}
                        edge-cutting electric vehicles with passion and innovation.
                    </motion.p>
                </motion.div>

                {/* Team Info */}
                <motion.div className="flex flex-col items-center gap-1">
                    <motion.h2
                        className="pb-2 font-bold text-2xl text-[#00FF88]"
                        animate={{
                            textShadow: [
                                "0 0 8px rgba(0,255,136,0.3)",
                                "0 0 16px rgba(0,255,136,0.4)",
                                "0 0 8px rgba(0,255,136,0.3)",
                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        Powered By eBaja
                    </motion.h2>

                    <motion.h1
                        className="font-extrabold font-mono text-5xl bg-gradient-to-r from-[#00eeff] via-[#40a7ff] to-[#00FFCC] bg-clip-text text-transparent relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        whileHover={{
                            scale: 1.02,
                            textShadow: "0 0 12px rgba(0,238,255,0.5)"
                        }}
                    >
                        <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(0,238,255,0.2)] to-transparent"
                            animate={{
                                x: ["-100%", "0%", "0%", "100%", "-100%"],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: ["easeInOut", "easeOut", "easeIn", "easeInOut"],
                                times: [0, 0.35, 0.45, 0.75, 1]
                            }}
                        />
                        TEAM XANTRONZ
                    </motion.h1>

                    <motion.p
                        className="font-light tracking-[0.25em] text-lg md:text-xl mt-2 bg-gradient-to-r from-[#E5E7E9] via-[#CBD2D9] to-[#E5E7E9] bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <motion.span
                            animate={{
                                textShadow: [
                                    "0 0 4px rgba(229,231,233,0.2)",
                                    "0 0 8px rgba(229,231,233,0.3)",
                                    "0 0 4px rgba(229,231,233,0.2)"
                                ]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            className="font-medium"
                        >
                            SINCE 2018
                        </motion.span>
                        <motion.span
                            className="mx-4 opacity-50"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            •
                        </motion.span>
                        <motion.span
                            animate={{
                                textShadow: [
                                    "0 0 4px rgba(229,231,233,0.2)",
                                    "0 0 8px rgba(229,231,233,0.3)",
                                    "0 0 4px rgba(229,231,233,0.2)"
                                ]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                            NIT AGARTALA
                        </motion.span>
                    </motion.p>
                </motion.div>

                {/* Floating Logo */}
                <motion.img
                    className="h-60 md:h-80 object-contain mt-2"
                    src="/logos/TEAM_logo.png"
                    alt="eBaja Team Logo"
                    animate={{ y: [-5, 5, -5], rotate: [-1, 1, -1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Explore Button */}
                <motion.button
                    onClick={() => {
                        const section = document.getElementById("explore");
                        if (section) {
                            section.scrollIntoView({ behavior: "smooth" });
                        }
                    }}
                    className="mt-6 px-4 py-2 rounded-full bg-gradient-to-r from-[#003922]/18 to-[#002233]/16 border border-[#00FF88]/10 backdrop-blur-sm inline-flex items-center gap-3 hover:from-[#003922]/22 hover:to-[#002233]/20 hover:border-[#00FF88]/20 transition-all duration-300"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.985 }}
                >
                    <motion.span className="text-sm font-medium bg-gradient-to-r from-[#00CC66] to-[#00c0fa] bg-clip-text text-transparent">
                        EXPLORE
                    </motion.span>

                    <motion.svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#00CC66]"
                        animate={{ y: [0, 3, 0] }}
                        transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <path
                            d="M10 3V16M10 16L6 12M10 16L14 12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </motion.svg>
                </motion.button>
            </motion.div>
        </section>
    );
}
