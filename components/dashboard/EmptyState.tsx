"use client";

type EmptyStateProps = {
  title: string;
  description: string;
  isDark: boolean;
};

export default function EmptyState({ title, description, isDark }: EmptyStateProps) {
  return (
    <div
      className={`flex min-h-[220px] flex-col items-center justify-center rounded-[1.5rem] border border-dashed px-6 py-10 text-center ${isDark ? "border-white/12 bg-white/4" : "border-slate-300 bg-slate-50"}`}
    >
      <div className={`mb-4 h-3 w-3 rounded-full ${isDark ? "bg-cyan-300" : "bg-cyan-500"}`} />
      <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>{title}</h3>
      <p className={`mt-2 max-w-md text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>{description}</p>
    </div>
  );
}
