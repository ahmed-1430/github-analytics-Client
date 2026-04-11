"use client";

import { motion } from "framer-motion";

type UseCaseCardProps = {
  title: string;
  description: string;
  tag: string;
  isDark?: boolean;
};

export default function UseCaseCard({
  title,
  description,
  tag,
  isDark = true,
}: UseCaseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`rounded-[1.75rem] border p-6 backdrop-blur-xl ${isDark ? "border-white/10 bg-slate-950/55" : "border-slate-200 bg-white"}`}
    >
      <div className={`inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.28em] ${isDark ? "border-cyan-300/20 bg-cyan-300/8 text-cyan-200" : "border-cyan-200 bg-cyan-50 text-cyan-700"}`}>
        {tag}
      </div>
      <h3 className={`mt-5 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
      <p className={`mt-3 text-sm leading-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{description}</p>
    </motion.div>
  );
}
