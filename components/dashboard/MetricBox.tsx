"use client";

type MetricBoxProps = {
  label: string;
  value: string | number;
  tone?: "default" | "accent";
  isDark: boolean;
};

export default function MetricBox({
  label,
  value,
  tone = "default",
  isDark,
}: MetricBoxProps) {
  const accentStyles =
    tone === "accent"
      ? isDark
        ? "border-cyan-400/20 bg-cyan-400/8"
        : "border-cyan-200 bg-cyan-50"
      : isDark
        ? "border-white/8 bg-white/4"
        : "border-slate-200 bg-slate-50";

  return (
    <div className={`rounded-2xl border px-4 py-4 ${accentStyles}`}>
      <p className={`text-[11px] uppercase tracking-[0.28em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
        {label}
      </p>
      <p className={`mt-3 text-xl font-semibold sm:text-2xl ${isDark ? "text-white" : "text-slate-950"}`}>
        {value}
      </p>
    </div>
  );
}
