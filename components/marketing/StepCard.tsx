"use client";

type StepCardProps = {
  step: string;
  title: string;
  description: string;
};

export default function StepCard({
  step,
  title,
  description,
}: StepCardProps) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-sm font-semibold text-cyan-200">
        {step}
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}
