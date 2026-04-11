"use client";

import { motion } from "framer-motion";

type FeatureCardProps = {
  title: string;
  description: string;
  accent: string;
};

export default function FeatureCard({
  title,
  description,
  accent,
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_24px_70px_rgba(2,6,23,0.30)] backdrop-blur-xl"
    >
      <div
        className="mb-5 h-11 w-11 rounded-2xl border border-white/10"
        style={{
          background: accent,
          boxShadow: "0 0 24px rgba(34,211,238,0.16)",
        }}
      />
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
    </motion.div>
  );
}
