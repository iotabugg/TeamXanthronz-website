import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import Sponsors from "./Sponsors";

export default function EventsHome() {
    const events = [
        {
            id: 1,
            name: "TechNova Summit",
            date: "March 15, 2025",
            venue: "Walmart Innovation Hub, Bengaluru",
            description:
                "A convergence of technology enthusiasts showcasing innovative AI and retail solutions.",
        },
        {
            id: 2,
            name: "Green Future Expo",
            date: "July 10, 2025",
            venue: "EcoDome Convention Center, Mumbai",
            description:
                "A sustainability-driven event focusing on eco-tech, IoT, and carbon management systems.",
        },
        {
            id: 3,
            name: "Retail Intelligence Conference",
            date: "November 21, 2025",
            venue: "Hyatt Convention Hall, Hyderabad",
            description:
                "A premier event exploring AI, data analytics, and computer vision in modern retail.",
        },
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                type: "spring",
                stiffness: 80,
            },
        }),
    };

    return (
        <div className="w-full min-h-[70vh] bg-black/70 flex flex-col justify-center items-center py-20">
            <h1 className="md:text-5xl font-[Orbitron] font-semibold mb-16 text-green-500 tracking-wide">
                Upcoming Events
            </h1>

            <div className="flex flex-wrap justify-center gap-10">
                {events.map((event, i) => (
                    <motion.div
                        key={event.id}
                        custom={i}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="relative w-[25vw] h-[25vh] rounded-2xl overflow-hidden shadow-xl border border-green-200/50 bg-cyan-400/5 p-6 flex flex-col justify-between"
                    >
                        {/* Event Title */}
                        <h2 className="text-xl font-semibold text-white font-mono text-center mb-2">
                            {event.name}
                        </h2>

                        {/* Date & Venue */}
                        <div className="flex flex-col items-center gap-2 text-sm text-green-300">
                            <div className="flex items-center gap-2">
                                <CalendarDays size={16} />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={16} />
                                <span>{event.venue}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-300 text-sm text-center mt-4 leading-relaxed">
                            {event.description}
                        </p>

                        {/* Glow animation stripe (same style theme) */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-[opacity,transform] duration-500" />
                    </motion.div>
                ))}
            </div>

            <div>
                <button className="mt-16 border border-cyan-300/50 p-2 rounded-sm text-green-400 font-semibold font-mono bg-slate-800 hover:rounded-2xl hover:bg-green-500 hover:text-black hover:ease-in-out duration-700">
                    View All Events →
                </button>
            </div>
            <div className="justify-center item-center text-center mb-10">
                <h1 className="md:text-5xl font-[Orbitron] font-semibold mb-16 text-green-500 tracking-wide pt-[10vh]">
                    Our Partners
                </h1>
                <Sponsors />
            </div>
            <div className="flex flex-col items-center justify-center text-center pb-5"><h3 className="text-xl text-green-400 font-mono">
                    Reach out to us for collaborations.
                </h3>

                <button className="flex items-center justify-center mt-8 border border-cyan-300/50 px-4 py-2 rounded-sm text-green-400 font-semibold font-mono bg-cyan-900 hover:rounded-2xl hover:bg-green-500 hover:text-black hover:ease-in-out duration-700">
                    <span className="mr-2 font-mono">Reach out</span>
                    <span>
                        <img
                            className="h-5 invert brightness-0"
                            src="/images/image.png"
                            alt="mail"
                        />
                    </span>
                </button>
            </div>
        </div>
    );
}
