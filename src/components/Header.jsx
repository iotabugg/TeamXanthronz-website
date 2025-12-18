import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="bg-gradient-to-r from-[#001804] via-[#001a0b] to-[#000d05] sticky top-0 z-50 shadow-[0_0_8px_rgba(0,255,136,0.1)] border-b border-[#00ff88]/20 backdrop-blur-md">
      <div className="w-full h-20 flex items-center justify-between px-8">
        {/* Left Logo Section */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center">
            <img
              src="/logos/TEAM_logo.png"
              alt="club logo"
              className="h-14 w-auto drop-shadow-[0_0_3px_rgba(0,255,136,0.3)]"
            />
          </Link>
          <h5 className="text-4xl font-[VT323] font-extrabold tracking-wide bg-gradient-to-r from-[#00ff88] to-[#0ba85a] bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(0,255,136,0.3)]">
            XANTHRONZ
          </h5>
        </div>

        {/* Center Nav Links */}
        <ul className="hidden lg:flex items-center space-x-10">
          {[
            { to: "/", label: "Home" },
            { to: "/Squads", label: "Squads" },
            { to: "/events", label: "Events" },
            { to: "/gallery", label: "Gallery" },
            { to: "/contacts", label: "About Us" },
          ].map(({ to, label }) => (
            <li key={to} className="relative group">
              <NavLink
                to={to}
                className={({ isActive }) =>
                  [
                    "relative font-semibold text-lg tracking-wide transition-all duration-300 pb-1 md:text-xl font-[Orbitron]",
                    isActive
                      ? "text-[#00FF88] drop-shadow-[0_0_5px_rgba(0,255,136,0.25)] after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-gradient-to-r after:from-[#00FF88] after:to-[#00FFCC] after:animate-[beam_2s_ease-in-out_infinite]"
                      : "text-[#B8C2C0] hover:text-[#00FF88] hover:drop-shadow-[0_0_3px_rgba(0,255,136,0.15)] after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 hover:after:left-0 hover:after:w-full after:bg-[#00FF88] after:transition-all after:duration-300",
                  ].join(" ")
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Buttons */}
        <div className="flex items-center space-x-3">
          <button
            className="rounded-full border border-[#00FF88]/60 bg-transparent px-4 py-1.5 
                       text-[#00FF88] font-semibold text-sm md:text-base transition-all hover:ease-in-out duration-500
                       hover:bg-[#00FF88]/20 hover:text-[#00FFCC]
                       shadow-[0_0_3px_rgba(0,255,136,0.1)]"
          >
            LOGIN
          </button>
          <button
            className="rounded-full bg-gradient-to-r from-[#00CC66] to-[#00FF88] px-4 py-1.5 
                       text-black font-semibold text-sm md:text-base transition-all duration-300
                       hover:from-[#00FF88] hover:to-[#00FFCC] 
                       shadow-[0_0_4px_rgba(0,255,136,0.2)] hover:shadow-[0_0_6px_rgba(0,255,204,0.3)]"
          >
            SIGN UP
          </button>
        </div>
      </div>

      {/* Keyframes for electric underline pulse */}
      <style>
        {`
          @keyframes beam {
            0% { opacity: 0.6; transform: scaleX(0.4); filter: drop-shadow(0 0 2px #00FF88); }
            50% { opacity: 1; transform: scaleX(1); filter: drop-shadow(0 0 5px #00FFCC); }
            100% { opacity: 0.6; transform: scaleX(0.4); filter: drop-shadow(0 0 2px #00FF88); }
          }
        `}
      </style>
    </nav>
  );
}
