"use client";

import { motion } from "framer-motion";

type FeatureCardProps = {
  title: string;
  description: string;
  accent: string;
  isDark?: boolean;
};

export default function FeatureCard({
  title,
  description,
  accent,
  isDark = true,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`rounded-[1.75rem] border p-6 backdrop-blur-xl ${isDark ? "border-white/10 bg-white/5 shadow-[0_24px_70px_rgba(2,6,23,0.30)]" : "border-slate-200 bg-white shadow-[0_20px_60px_rgba(148,163,184,0.14)]"}`}
    >
      <div
        className="mb-5 h-11 w-11 rounded-2xl border border-white/10"
        style={{
          background: accent,
          boxShadow: "0 0 24px rgba(34,211,238,0.16)",
        }}
      />
      <h3 className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
      <p className={`mt-3 text-sm leading-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{description}</p>
    </motion.div>
  );
}
