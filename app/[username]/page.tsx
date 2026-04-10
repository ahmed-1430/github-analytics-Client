/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ContributionGraph from "@/components/ContributionGraph";
import FuturisticLoader from "@/components/FuturisticLoader";

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

    pullRequests: number;
    issues: number;
    reposContributed: number;

    totalContributions: number;
    activeWeeks: number;

    status: string;
    grade: string;

    streak: {
        current: number;
        longest: number;
    };

    languages: Language[];
    contributions: ContributionDay[];
};

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
    "https://git-stats-server-updated.vercel.app";

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
        fetch(`${API_BASE_URL}/api/stats?user=${username}`)
            .then((res) => res.json())
            .then(setData)
            .catch(console.error);
    }, [username]);

    if (!data)
        return <FuturisticLoader label={`Locking onto ${username}`} />;

    const currentStreak = data.streak?.current ?? 0;
    const longestStreak = data.streak?.longest ?? 0;

    return (
        <div
            className={
                isDark
                    ? "bg-[#020617] text-white min-h-screen"
                    : "bg-[#f9fafb] text-gray-900 min-h-screen"
            }
        >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold">{data.name}</h1>
                        <p className="text-sm opacity-60">
                            GitHub Analytics Dashboard
                        </p>
                    </div>

                    <div className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 w-fit">
                        <p className="text-xs opacity-60">Status</p>
                        <p className="text-sm font-semibold text-blue-400">
                            {data.status}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <Card isDark={isDark}>
                        <Title>GitHub Activity</Title>

                        <div className="flex flex-col sm:flex-row gap-4 mt-4">

                            <div className="grid grid-cols-2 gap-3 flex-1">
                                <MetricBox label="Commits" value={data.commits} isDark={isDark} />
                                <MetricBox label="Repository" value={data.repos} isDark={isDark} />
                                <MetricBox label="PRs" value={data.pullRequests} isDark={isDark} />
                                <MetricBox label="Issues" value={data.issues} isDark={isDark} />
                                <MetricBox label="Contributed" value={data.reposContributed} isDark={isDark} />
                                <MetricBox label="Stars" value={data.stars} isDark={isDark} />
                            </div>

                            <div className="flex justify-center items-center">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-blue-500/10 border border-white/10 flex flex-col items-center justify-center">
                                    <span className="text-2xl sm:text-3xl font-bold text-blue-400">
                                        {data.grade}
                                    </span>
                                    <span className="text-[10px] opacity-60">Grade</span>
                                </div>
                            </div>

                        </div>
                    </Card>

                    <Card isDark={isDark}>
                        <Title>Language Mastery</Title>

                        <div className="space-y-4 mt-4">
                            {(data.languages || []).map((l) => (
                                <ProgressBar key={l.name} {...l} isDark={isDark} />
                            ))}
                        </div>
                    </Card>
                </div>

                <Card isDark={isDark}>
                    <Title>Consistency</Title>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                        <HighlightBox
                            label="Current Streak"
                            value={currentStreak}
                            isDark={isDark}
                        />
                        <MetricBox label="Longest Streak" value={longestStreak} isDark={isDark} />
                        <MetricBox label="Contributions 12M" value={data.totalContributions} isDark={isDark} />
                        <MetricBox label="Active Weeks" value={`${data.activeWeeks}/52`} isDark={isDark} />
                    </div>
                </Card>

                <Card isDark={isDark}>
                    <Title>Contribution Trend</Title>
                    <ContributionGraph data={data.contributions} />
                </Card>
            </div>
        </div>
    );
}

const Card = ({ children, isDark }: any) => (
    <motion.div
        whileHover={{ y: -3 }}
        className={`p-5 rounded-2xl ${isDark
            ? "bg-white/5 border border-white/10 backdrop-blur-xl"
            : "bg-white border border-gray-200 shadow-sm"
            }`}
    >
        {children}
    </motion.div>
);

const Title = ({ children }: any) => (
    <h2 className="text-xs uppercase tracking-widest opacity-60 mb-4">
        {children}
    </h2>
);

const MetricBox = ({ label, value, isDark }: any) => (
    <div
        className={`p-3 rounded-xl ${isDark
            ? "bg-white/5 border border-white/10"
            : "bg-gray-50 border border-gray-200"
            }`}
    >
        <p className="text-xs opacity-60">{label}</p>
        <p className="text-sm sm:text-lg font-semibold">{value}</p>
    </div>
);

const HighlightBox = ({ label, value, isDark }: any) => (
    <div
        className={`p-3 rounded-xl ${isDark
            ? "bg-orange-500/10 border border-orange-400/30"
            : "bg-orange-50 border border-orange-300"
            }`}
    >
        <p className="text-xs text-orange-400">{label}</p>
        <p className="text-sm sm:text-lg font-bold text-orange-500">
            🔥 {value} Days
        </p>
    </div>
);

const ProgressBar = ({ name, percent, isDark }: any) => (
    <div>
        <div className="flex justify-between text-xs sm:text-sm mb-1">
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
