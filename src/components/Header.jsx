import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Image, Info, LogIn, UserPlus } from "lucide-react";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setDrawerOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

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
            { to: "/evolve", label: "Evolve" },
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

        {/* Hamburger Menu Button (replaces auth buttons) */}
        <div className="flex items-center">
          <button
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="p-2 rounded-md text-[#00FF88] hover:bg-[#00FF88]/10 transition"
          >
            <Menu size={22} />
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
      {/* Side drawer + overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />

          <aside className="absolute right-0 top-0 h-full w-[25vw] min-w-[220px] max-w-[360px] bg-zinc-900 border-l border-green-400 p-6 flex flex-col z-50 shadow-2xl font-[Orbitron] text-slate-200">
            {/* Top: small logo/title + close */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src="/logos/TEAM_logo.png" alt="logo" className="h-8 w-8 rounded-md drop-shadow-[0_0_3px_rgba(0,255,136,0.2)]" />
                <span className="text-cyan-300 font-semibold text-lg">XANTHRONZ</span>
              </div>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="p-2 rounded text-[#00FF88] hover:bg-[#00FF88]/10">
                <X size={20} />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 mt-2">
              <ul className="flex flex-col gap-6 pt-4">
                <li>
                  <Link to="/gallery" onClick={() => setDrawerOpen(false)} className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-zinc-800/40">
                    <div className="bg-zinc-800/30 p-2 rounded-md text-cyan-300">
                      <Image size={18} />
                    </div>
                    <span className="font-semibold text-base">Gallery</span>
                  </Link>
                </li>

                <li>
                  <Link to="/about" onClick={() => setDrawerOpen(false)} className="flex items-center gap-4 px-3 py-2 rounded-md hover:bg-zinc-800/40">
                    <div className="bg-zinc-800/30 p-2 rounded-md text-cyan-300">
                      <Info size={18} />
                    </div>
                    <span className="font-semibold text-base">About Us</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Bottom: auth buttons (kept but styled like modal footer) */}
            <div className="mt-auto">
              <Link to="/login" onClick={() => setDrawerOpen(false)} className="block w-full text-center rounded-md border border-[#00FF88]/50 bg-gradient-to-r from-transparent to-transparent px-4 py-3 text-[#00FF88] font-semibold mb-3 hover:bg-[#00FF88]/8">
                <span className="inline-flex items-center justify-center gap-2">
                  <LogIn size={16} /> LOGIN
                </span>
              </Link>

              <Link to="/signup" onClick={() => setDrawerOpen(false)} className="block w-full text-center rounded-md bg-gradient-to-r from-[#00CC66] to-[#00FF88] px-4 py-3 text-black font-semibold">
                <span className="inline-flex items-center justify-center gap-2">
                  <UserPlus size={16} /> SIGN UP
                </span>
              </Link>
            </div>
          </aside>
        </div>
      )}
    </nav>
  );
}
