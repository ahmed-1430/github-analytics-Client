"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ContributionGraph from "@/components/ContributionGraph";

/* ================= TYPES ================= */

type ContributionDay = {
  count: number;
  date: string;
};

type Language = {
  name: string;
  percent: number;
};

type Stats = {
  name: string;
  commits: number;
  repos: number;
  followers: number;
  stars: number;
  score: number;
  grade: string;
  contributions: ContributionDay[];
  streak: {
    current: number;
    longest: number;
  };
  languages: Language[];
};

/* ================= ANIMATION ================= */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 },
};

/* ================= PAGE ================= */

export default function Page() {
  const { username } = useParams<{ username: string }>();
  const [data, setData] = useState<Stats | null>(null);

  useEffect(() => {
    if (!username) return;

    fetch(`http://localhost:3000/api/stats?user=${username}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, [username]);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-[#020617]">
        Loading...
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* 🔥 BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
        <motion.div
          animate={{ x: [0, 100, -50, 0], y: [0, -80, 60, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-1/3 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -120, 60, 0], y: [0, 80, -60, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-10 right-1/3 w-[500px] h-[500px] bg-cyan-400/10 blur-[120px] rounded-full"
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-6xl mx-auto p-6 space-y-6 text-white"
      >
        {/* 🔥 HEADER */}
        <motion.div variants={item} className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">{data.name}</h1>
            <p className="text-gray-400 text-sm">GitHub Analytics Dashboard</p>
          </div>

          <div className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.2)]">
            <p className="text-xs text-gray-400">Score</p>
            <p className="text-xl font-bold text-blue-400">{data.score}</p>
          </div>
        </motion.div>

        {/* ================= GRID ================= */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Activity */}
          <Card>
            <Title>GitHub Activity</Title>

            <div className="flex justify-between mt-6">
              <div className="grid grid-cols-2 gap-6">
                <Stat label="Commits" value={data.commits} />
                <Stat label="Repos" value={data.repos} />
                <Stat label="Followers" value={data.followers} />
                <Stat label="Stars" value={data.stars} />
              </div>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/10 flex items-center justify-center border border-white/10 shadow-[0_0_60px_rgba(59,130,246,0.4)]"
              >
                <span className="text-5xl font-bold text-blue-400">
                  {data.grade}
                </span>
              </motion.div>
            </div>
          </Card>

          {/* Languages */}
          <Card>
            <Title>Language Mastery</Title>
            <div className="space-y-4 mt-4">
              {data.languages.map((lang) => (
                <ProgressBar key={lang.name} {...lang} />
              ))}
            </div>
          </Card>
        </div>

        {/* Consistency */}
        <Card>
          <Title>Consistency</Title>
          <div className="grid md:grid-cols-4 gap-4 mt-4">
            <Highlight label="Current Streak" value={`${data.streak.current} days`} />
            <Stat label="Longest" value={`${data.streak.longest} days`} />
            <Stat label="Commits" value={data.commits} />
            <Stat label="Score" value={data.score} />
          </div>
        </Card>

        {/* Graph */}
        <Card>
          <Title>Contribution Trend</Title>
          <ContributionGraph data={data.contributions} />
        </Card>

        {/* Heatmap */}
        {/* <Card>
          <Title>Contribution Heatmap</Title>
          <Heatmap data={data.contributions} />
        </Card> */}

        {/* Insights */}
        <Card>
          <Title>Insights</Title>
          <Insights data={data} />
        </Card>
      </motion.div>
    </motion.div>
  );
}

/* ================= COMPONENTS ================= */

const Title = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xs uppercase tracking-wider text-gray-400 mb-4">
    {children}
  </h2>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={item}
    whileHover={{ y: -8, scale: 1.02 }}
    className="group relative p-6 rounded-2xl bg-linear-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
  >
    {children}
  </motion.div>
);

const Stat = ({ label, value }: { label: string; value: any }) => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-xl font-semibold">{value}</p>
  </motion.div>
);

const Highlight = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 rounded-xl border border-orange-400/30 bg-orange-500/10 shadow-[0_0_30px_rgba(251,146,60,0.2)]">
    <p className="text-xs text-orange-300">{label}</p>
    <p className="text-lg font-bold text-orange-400">{value}</p>
  </div>
);

const ProgressBar = ({ name, percent }: Language) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span>{name}</span>
      <span>{percent}%</span>
    </div>

    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1.2 }}
        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_20px_rgba(59,130,246,0.6)]"
      />
    </div>
  </div>
);

/* ================= HEATMAP ================= */

const Heatmap = ({ data }: { data: ContributionDay[] }) => {
  const weeks = [];

  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  return (
    <div className="flex gap-1 overflow-x-auto mt-4">
      {weeks.map((week, i) => (
        <div key={i} className="flex flex-col gap-1">
          {week.map((day, j) => (
            <div
              key={j}
              className="w-3 h-3 rounded-sm hover:scale-150 transition"
              style={{
                background:
                  day.count === 0
                    ? "#1e293b"
                    : day.count < 3
                    ? "#0ea5e9"
                    : day.count < 6
                    ? "#22c55e"
                    : "#16a34a",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

/* ================= INSIGHTS ================= */

const Insights = ({ data }: { data: Stats }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <InsightCard title="Top Language" value={data.languages[0]?.name} />
      <InsightCard title="Total Commits" value={data.commits} />
      <InsightCard title="Grade" value={data.grade} highlight />
      <InsightCard title="Streak" value={`${data.streak.current} days`} />
    </div>
  );
};

const InsightCard = ({
  title,
  value,
  highlight,
}: {
  title: string;
  value: any;
  highlight?: boolean;
}) => (
  <div className={`p-4 rounded-xl border border-white/10 bg-white/5 ${highlight ? "shadow-[0_0_30px_rgba(59,130,246,0.3)]" : ""}`}>
    <p className="text-xs text-gray-400">{title}</p>
    <p className="text-lg font-semibold mt-1">{value}</p>
  </div>
);