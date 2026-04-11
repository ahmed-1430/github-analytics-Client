"use client";

type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  isDark?: boolean;
};

export default function TestimonialCard({
  quote,
  name,
  role,
  isDark = true,
}: TestimonialCardProps) {
  return (
    <div className={`rounded-[1.75rem] border p-6 backdrop-blur-xl ${isDark ? "border-white/10 bg-white/4" : "border-slate-200 bg-white"}`}>
      <p className={`text-sm leading-7 ${isDark ? "text-slate-300" : "text-slate-700"}`}>“{quote}”</p>
      <div className="mt-6">
        <p className={`font-medium ${isDark ? "text-white" : "text-slate-950"}`}>{name}</p>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
    </div>
  );
}
