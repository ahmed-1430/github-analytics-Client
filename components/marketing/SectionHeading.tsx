"use client";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  center?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
}: SectionHeadingProps) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-[11px] uppercase tracking-[0.38em] text-cyan-300/80">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-slate-400 sm:text-lg">
        {description}
      </p>
    </div>
  );
}
