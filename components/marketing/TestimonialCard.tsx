"use client";

type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
};

export default function TestimonialCard({
  quote,
  name,
  role,
}: TestimonialCardProps) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
      <p className="text-sm leading-7 text-slate-300">“{quote}”</p>
      <div className="mt-6">
        <p className="font-medium text-white">{name}</p>
        <p className="text-sm text-slate-500">{role}</p>
      </div>
    </div>
  );
}
