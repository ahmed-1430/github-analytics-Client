"use client";

type HighlightBoxProps = {
  label: string;
  value: string | number;
  suffix?: string;
  isDark: boolean;
};

export default function HighlightBox({
  label,
  value,
  suffix,
  isDark,
}: HighlightBoxProps) {
  return (
    <div
      className={`rounded-2xl border px-4 py-4 ${isDark
        ? "border-amber-400/25 bg-linear-to-br from-amber-400/12 to-orange-500/10 shadow-[0_0_32px_rgba(251,191,36,0.08)]"
        : "border-amber-200 bg-linear-to-br from-amber-50 to-orange-50"
        }`}
    >
      <p className={`text-[11px] uppercase tracking-[0.28em] ${isDark ? "text-amber-200/80" : "text-amber-700/80"}`}>
        {label}
      </p>
      <div className="mt-3 flex items-end gap-2">
        <span className={`text-2xl font-semibold sm:text-3xl ${isDark ? "text-white" : "text-slate-950"}`}>
          {value}
        </span>
        {suffix ? (
          <span className={`pb-1 text-sm ${isDark ? "text-amber-100/80" : "text-amber-700/80"}`}>{suffix}</span>
        ) : null}
      </div>
    </div>
  );
}
