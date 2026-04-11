"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type CardProps = {
  children: ReactNode;
  isDark: boolean;
  className?: string;
};

export default function Card({ children, isDark, className = "" }: CardProps) {
  return (
    <motion.section
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`rounded-[1.75rem] border p-5 sm:p-6 ${isDark
        ? "border-white/10 bg-white/6 shadow-[0_24px_80px_rgba(2,6,23,0.42)] backdrop-blur-2xl"
        : "border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
        } ${className}`}
    >
      {children}
    </motion.section>
  );
}
