"use client";

import { motion } from "framer-motion";

type UseCaseCardProps = {
  title: string;
  description: string;
  tag: string;
};

export default function UseCaseCard({
  title,
  description,
  tag,
}: UseCaseCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-6 backdrop-blur-xl"
    >
      <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-cyan-200">
        {tag}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
    </motion.div>
  );
}
