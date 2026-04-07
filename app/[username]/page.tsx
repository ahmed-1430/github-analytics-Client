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

/* ================= PAGE ================= */

export default function Page() {
    const { username } = useParams<{ username: string }>();
    const [data, setData] = useState<Stats | null>(null);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");
        const handle = () => setIsDark(media.matches);
        handle();
        media.addEventListener("change", handle);
        return () => media.removeEventListener("change", handle);
    }, []);

    useEffect(() => {
        if (!username) return;
        fetch(`http://localhost:3000/api/stats?user=${username}`)
            .then((res) => res.json())
            .then(setData);
    }, [username]);

    if (!data) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className={isDark ? "bg-[#020617] text-white" : "bg-[#f9fafb] text-gray-900"}>

            <div className="max-w-6xl mx-auto p-6 space-y-6">

                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold">{data.name}</h1>
                        <p className="text-sm opacity-60">GitHub Analytics Dashboard</p>
                    </div>

                    <div className={isDark ? darkScore : lightScore}>
                        <p className="text-xs opacity-60">Score</p>
                        <p className="text-xl font-bold text-blue-500">{data.score}</p>
                    </div>
                </div>

                {/* GRID */}
                <div className="grid md:grid-cols-2 gap-6">

                    {/* ACTIVITY */}
                    <Card isDark={isDark}>
                        <Title>GitHub Activity</Title>

                        <div className="flex gap-6 mt-4">

                            {/* LEFT: METRICS */}
                            <div className="grid grid-cols-2 gap-4 flex-1">

                                <MetricBox isDark={isDark} label="Commits" value={data.commits} />
                                <MetricBox isDark={isDark} label="Repository" value={data.repos} />
                                <MetricBox isDark={isDark} label="Followers" value={data.followers} />
                                <MetricBox isDark={isDark} label="Stars" value={data.stars} />

                            </div>

                            {/* RIGHT: GRADE */}
                            <div className="flex items-center justify-center">

                                <motion.div
                                    animate={{ scale: [1, 1.08, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className={`w-28 h-28 rounded-2xl flex items-center justify-center
        ${isDark
                                            ? "bg-linear-to-br from-blue-500/20 to-cyan-400/10 border border-white/10 shadow-[0_0_40px_rgba(59,130,246,0.4)]"
                                            : "bg-blue-50 border border-blue-200 shadow-sm"
                                        }`}
                                >
                                    <span className="text-5xl font-bold text-blue-500">
                                        {data.grade}
                                    </span>

                                </motion.div>


                            </div>

                        </div>

                    </Card>

                    {/* LANGUAGES */}
                    <Card isDark={isDark}>
                        <Title>Language Mastery</Title>
                        <div className="space-y-4 mt-4">
                            {data.languages.map((l) => (
                                <ProgressBar key={l.name} {...l} isDark={isDark} />
                            ))}
                        </div>
                    </Card>
                </div>

                {/* CONSISTENCY */}
                <Card isDark={isDark}>
                    <Title>Consistency</Title>
                    <div className="grid md:grid-cols-4 gap-4 mt-4">
                        <HighlightBox
                            isDark={isDark}
                            label="Current Streak"
                            value={data.streak.current}
                        />
                        <MetricBox isDark={isDark} label="Longest" value={data.streak.longest} />
                        <MetricBox isDark={isDark} label="Commits" value={data.commits} />
                        <MetricBox isDark={isDark} label="Score" value={data.score} />
                    </div>
                </Card>

                {/* GRAPH */}
                <Card isDark={isDark}>
                    <Title>Contribution Trend</Title>
                    <ContributionGraph data={data.contributions} />
                </Card>

            </div>
        </div>
    );
}

/* ================= STYLES ================= */

const darkScore =
    "px-5 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl";

const lightScore =
    "px-5 py-3 rounded-xl border border-gray-200 bg-white shadow-sm";

/* ================= COMPONENTS ================= */

const Card = ({
    children,
    isDark,
}: {
    children: React.ReactNode;
    isDark: boolean;
}) => (
    <motion.div
        whileHover={{ y: -4 }}
        className={`relative p-6 rounded-2xl ${isDark
            ? "bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
            : "bg-white border border-gray-200 shadow-sm"
            }`}
    >
        {children}
    </motion.div>
);

const Title = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xs uppercase tracking-widest opacity-60 mb-4">
        {children}
    </h2>
);

const MetricBox = ({
    label,
    value,
    isDark,
}: {
    label: string;
    value: number;
    isDark: boolean;
}) => (
    <div
        className={`p-4 rounded-xl ${isDark
            ? "bg-white/4 border border-white/10"
            : "bg-gray-50 border border-gray-200"
            }`}
    >
        <p className="text-xs opacity-60">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
    </div>
);

const HighlightBox = ({
  label,
  value,
  isDark,
}: {
  label: string;
  value: number;
  isDark: boolean;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`p-4 rounded-xl relative overflow-hidden
      ${
        isDark
          ? "bg-orange-500/10 border border-orange-400/30 "
          : "bg-orange-50 border border-orange-300 shadow-sm"
      }`}
  >
    {/* 🔥 Glow effect */}
    <div className="absolute inset-0 bg-linear-to-r from-orange-500/10 to-transparent opacity-40" />

    <p className="text-xs text-orange-300">{label}</p>

    <p className="text-xl font-bold text-orange-400">
        <span>🔥</span>
      {value}
      <span className="text-sm ml-1 opacity-70">days</span>
    </p>
  </motion.div>
);

const ProgressBar = ({
    name,
    percent,
    isDark,
}: {
    name: string;
    percent: number;
    isDark: boolean;
}) => (
    <div>
        <div className="flex justify-between text-sm mb-1">
            <span>{name}</span>
            <span>{percent}%</span>
        </div>

        <div className={`h-2 rounded-full ${isDark ? "bg-white/10" : "bg-gray-200"}`}>
            <div
                className="h-full rounded-full bg-linear-to-r from-blue-500 to-cyan-400"
                style={{ width: `${percent}%` }}
            />
        </div>
    </div>
);