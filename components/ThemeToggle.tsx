"use client";

import { motion } from "framer-motion";

type ThemeToggleProps = {
  isDark: boolean;
  onToggle: () => void;
};

export default function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={`inline-flex h-11 items-center gap-3 rounded-full border px-4 text-sm font-medium transition ${isDark
        ? "border-white/12 bg-white/6 text-white hover:border-cyan-300/35 hover:bg-cyan-300/8"
        : "border-slate-200 bg-white text-slate-900 hover:border-cyan-300 hover:bg-cyan-50"
        }`}
    >
      <div className={`relative flex h-6 w-11 items-center rounded-full ${isDark ? "bg-cyan-400/25" : "bg-slate-200"}`}>
        <motion.span
          animate={{ x: isDark ? 22 : 2 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`absolute h-5 w-5 rounded-full ${isDark ? "bg-cyan-300" : "bg-white shadow-sm"}`}
        />
      </div>
      <span>{isDark ? "Dark" : "Light"} mode</span>
    </button>
  );
}
