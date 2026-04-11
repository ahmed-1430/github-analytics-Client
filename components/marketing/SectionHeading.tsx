"use client";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
  isDark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  isDark = true,
}: SectionHeadingProps) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`text-[11px] uppercase tracking-[0.38em] ${isDark ? "text-cyan-300/80" : "text-cyan-700/75"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 text-3xl font-semibold tracking-tight sm:text-4xl ${isDark ? "text-white" : "text-slate-950"}`}>
        {title}
      </h2>
      <p className={`mt-4 text-base leading-7 sm:text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
        {description}
      </p>
    </div>
  );
}
