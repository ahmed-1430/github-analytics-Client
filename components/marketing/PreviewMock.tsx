"use client";

import { motion } from "framer-motion";

type ContributionDay = {
  count: number;
  date: string;
};

type Language = {
  name: string;
  percent: number;
};

type PreviewData = {
  name: string;
  commits: number;
  repos: number;
  followers: number;
  stars: number;
  score: number;
  grade: string;
  streak: {
    current: number;
    longest: number;
  };
  languages: Language[];
  contributions: ContributionDay[];
};

type PreviewMockProps = {
  data: PreviewData;
};

export default function PreviewMock({ data }: PreviewMockProps) {
  const recentContributions = data.contributions.slice(-14);
  const maxContribution = Math.max(...recentContributions.map((item) => item.count), 1);

  return (
    <motion.div
      whileHover={{ y: -6, rotateX: 1, rotateY: -1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative rounded-[2rem] border border-white/10 bg-slate-950/55 p-4 shadow-[0_40px_120px_rgba(8,15,36,0.48)] backdrop-blur-2xl sm:p-5"
    >
      <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_22%)]" />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between rounded-[1.5rem] border border-white/8 bg-white/4 px-4 py-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-cyan-200/75">
              Live Profile
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">{data.name}</h3>
          </div>
          <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/8 text-cyan-100">
            <span className="text-2xl font-semibold">{data.grade}</span>
            <span className="text-[10px] uppercase tracking-[0.25em] opacity-70">Grade</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Commits", value: data.commits },
            { label: "Repos", value: data.repos },
            { label: "Followers", value: data.followers },
            { label: "Score", value: data.score },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/8 bg-white/4 px-4 py-4"
            >
              <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-3 text-xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-white">Language mastery</p>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Skills</p>
            </div>

            <div className="space-y-4">
              {data.languages.slice(0, 4).map((language) => (
                <div key={language.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-200">{language.name}</span>
                    <span className="text-slate-500">{language.percent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/8">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${language.percent}%` }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="h-full rounded-full bg-linear-to-r from-cyan-300 via-sky-400 to-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/8 bg-white/4 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-white">Contribution pulse</p>
              <div className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs uppercase tracking-[0.25em] text-amber-100">
                {data.streak.current} day streak
              </div>
            </div>

            <div className="flex h-40 items-end gap-2">
              {recentContributions.map((item) => {
                const height = Math.max((item.count / maxContribution) * 100, item.count > 0 ? 12 : 6);

                return (
                  <motion.div
                    key={item.date}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className={`flex-1 rounded-t-full ${item.count === maxContribution ? "bg-linear-to-t from-amber-400 to-orange-300 shadow-[0_0_24px_rgba(251,191,36,0.35)]" : "bg-linear-to-t from-cyan-500/60 to-sky-300/90"}`}
                    title={`${item.count} contributions`}
                  />
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-500">
              <span>Last 14 days</span>
              <span>{data.stars} stars</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
