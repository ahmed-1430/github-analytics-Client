"use client";

import { motion } from "framer-motion";

type ProgressBarProps = {
  name: string;
  percent: number;
  isDark: boolean;
};

export default function ProgressBar({ name, percent, isDark }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className={isDark ? "text-slate-100" : "text-slate-800"}>{name}</span>
        <span className={isDark ? "text-slate-400" : "text-slate-500"}>{percent}%</span>
      </div>

      <div className={`h-2.5 overflow-hidden rounded-full ${isDark ? "bg-white/8" : "bg-slate-200"}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-linear-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_16px_rgba(56,189,248,0.28)]"
        />
      </div>
    </div>
  );
}
