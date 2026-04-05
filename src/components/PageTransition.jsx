import React from "react";
import { motion } from "framer-motion";

/**
 * Wraps page content with a fade-in/out transition.
 * Use this as a wrapper inside each page component's outer section,
 * OR wrap <Outlet /> in Layout with it.
 */
export default function PageTransition({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}