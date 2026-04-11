"use client";

import { motion } from "framer-motion";

type FuturisticLoaderProps = {
  label?: string;
  isDark?: boolean;
};

export default function FuturisticLoader({
  label = "Syncing GitHub telemetry",
  isDark = true,
}: FuturisticLoaderProps) {
  return (
    <div className={`relative flex min-h-screen items-center justify-center overflow-hidden ${isDark ? "bg-[#020617] text-white" : "bg-[#f8fbff] text-slate-950"}`}>
      <div
        className={`absolute inset-0 ${isDark
          ? "bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.10),transparent_30%),linear-gradient(180deg,#020617_0%,#07111f_55%,#020617_100%)]"
          : "bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_28%),linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)]"
          }`}
      />
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-size-[72px_72px] ${isDark ? "opacity-20" : "opacity-30"}`} />

      <motion.div
        className={`relative z-10 w-[min(92vw,28rem)] rounded-4xl border px-8 py-9 backdrop-blur-2xl ${isDark
          ? "border-white/10 bg-slate-950/55 shadow-[0_24px_80px_rgba(2,6,23,0.55)]"
          : "border-slate-200 bg-white/85 shadow-[0_24px_80px_rgba(148,163,184,0.20)]"
          }`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className={`text-[10px] uppercase tracking-[0.45em] ${isDark ? "text-cyan-300/70" : "text-cyan-700/70"}`}>
              GitHub Analytics
            </p>
            <h2 className={`mt-3 text-2xl font-semibold tracking-tight ${isDark ? "text-white" : "text-slate-950"}`}>
              {label}
            </h2>
          </div>

          <motion.div
            className={`relative h-14 w-14 rounded-2xl border ${isDark ? "border-cyan-300/20 bg-cyan-300/5" : "border-cyan-200 bg-cyan-50"}`}
            animate={{ boxShadow: ["0 0 0 rgba(34,211,238,0)", "0 0 24px rgba(34,211,238,0.16)", "0 0 0 rgba(34,211,238,0)"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="absolute inset-2 rounded-xl border border-cyan-300/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300"
              animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        <div className="mb-6 space-y-2">
          <div className={`flex items-center justify-between text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            <span>Preparing dashboard</span>
            <span>Live</span>
          </div>

          <div className={`h-2 overflow-hidden rounded-full ${isDark ? "bg-white/8" : "bg-slate-200"}`}>
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500"
              animate={{ x: ["-35%", "105%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "38%" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {["Fetching", "Hydrating", "Rendering"].map((item, index) => (
            <motion.div
              key={item}
              className={`rounded-2xl border px-3 py-4 text-center ${isDark ? "border-white/8 bg-white/3" : "border-slate-200 bg-slate-50/90"}`}
              animate={{ borderColor: ["rgba(255,255,255,0.08)", "rgba(103,232,249,0.22)", "rgba(255,255,255,0.08)"] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.2 }}
            >
              <motion.div
                className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-cyan-300/70"
                animate={{ scaleX: [0.55, 1, 0.55], opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.16 }}
              />
              <p className={`text-xs uppercase tracking-[0.28em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>{item}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
