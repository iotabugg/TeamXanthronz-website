import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Globe,
  Heart,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-700 bg-black text-gray-300 font-mono py-10 px-8 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* ===== Left Column ===== */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logos/TEAM_logo.png" alt="Xanthronz Logo" className="h-10 w-auto" />
            <h2 className="text-2xl font-bold text-green-400">Xanthronz</h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            A futuristic innovation team passionate about building intelligent and immersive experiences.
          </p>

          {/* Social icons */}
          <div className="flex gap-4 mt-5">
            <a href="#" className="hover:text-green-400"><Instagram size={18} /></a>
            <a href="#" className="hover:text-green-400"><Linkedin size={18} /></a>
            <a href="#" className="hover:text-green-400"><Github size={18} /></a>
            <a href="#" className="hover:text-green-400"><Globe size={18} /></a>
          </div>
        </div>

        {/* ===== Middle Column ===== */}
        <div className="flex flex-col sm:flex-row justify-around gap-8">
          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">Navigation</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-green-300">Home</a></li>
              <li><a href="#" className="hover:text-green-300">Projects</a></li>
              <li><a href="#" className="hover:text-green-300">Innovations</a></li>
              <li><a href="#" className="hover:text-green-300">Team</a></li>
              <li><a href="#" className="hover:text-green-300">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-green-400 mb-3">Quick Links</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-green-300">Gallery</a></li>
              <li><a href="#" className="hover:text-green-300">Blog</a></li>
              <li><a href="#" className="hover:text-green-300">FAQ</a></li>
              <li><a href="#" className="hover:text-green-300">Developers</a></li>
              <li><a href="#" className="hover:text-green-300">Founders</a></li>
            </ul>
          </div>
        </div>

        {/* ===== Right Column ===== */}
        <div>
          <h3 className="text-lg font-semibold text-green-400 mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="text-green-400 mt-0.5" size={16} />
              <span>Xanthronz HQ, Innovation Hub, India</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="text-green-400" size={16} />
              <span>+91 9876543210</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="text-green-400" size={16} />
              <span>xanthronz.team@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ===== Bottom Bar ===== */}
      <div className="border-t border-gray-700 mt-10 pt-5 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        <p>© 2025 Xanthronz. All rights reserved.</p>
        <p className="flex items-center gap-1 mt-3 md:mt-0">
          Developed with <Heart className="text-green-400" size={14} /> by the{" "}
          <span className="text-green-400 font-semibold">Xanthronz Tech Team</span>
        </p>
      </div>
    </footer>
  );
}
