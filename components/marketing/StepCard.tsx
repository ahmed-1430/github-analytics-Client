"use client";

type StepCardProps = {
  step: string;
  title: string;
  description: string;
  isDark?: boolean;
};

export default function StepCard({
  step,
  title,
  description,
  isDark = true,
}: StepCardProps) {
  return (
    <div className={`rounded-[1.75rem] border p-6 backdrop-blur-xl ${isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"}`}>
      <div className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border text-sm font-semibold ${isDark ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-200" : "border-cyan-200 bg-cyan-50 text-cyan-700"}`}>
        {step}
      </div>
      <h3 className={`mt-5 text-xl font-semibold ${isDark ? "text-white" : "text-slate-950"}`}>{title}</h3>
      <p className={`mt-3 text-sm leading-6 ${isDark ? "text-slate-400" : "text-slate-600"}`}>{description}</p>
    </div>
  );
}
