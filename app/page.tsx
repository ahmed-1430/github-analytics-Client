"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
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
  score: number;
  grade: string;
  streak: {
    current: number;
    longest: number;
  };
  languages: Language[];
  contributions: ContributionDay[];
};

const DEFAULT_USERNAME = "ahmed-1430";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "https://git-stats-server-updated.vercel.app";

type LoadState =
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: Stats; error: null }
  | { status: "error"; data: null; error: string };

export default function Page() {
  const [state, setState] = useState<LoadState>({
    status: "loading",
    data: null,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function loadStats() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/stats?user=${DEFAULT_USERNAME}`);
        if (!response.ok) {
          throw new Error("Unable to load dashboard data.");
        }

        const nextData = (await response.json()) as Stats;
        if (!cancelled) {
          setState({ status: "success", data: nextData, error: null });
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to load dashboard data.";
        if (!cancelled) {
          setState({ status: "error", data: null, error: message });
        }
      }
    }

    loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return <FuturisticLoader label="Booting profile intelligence" />;
  }

  if (state.status === "error") {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-black">
        {state.error}
      </div>
    );
  }

  const { data } = state;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold">{data.name} - GitHub Analytics</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h2 className="card-title">GitHub Activity</h2>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Stat label="Commits" value={data.commits} />
              <Stat label="Repos" value={data.repos} />
              <Stat label="Followers" value={data.followers} />
              <Stat label="Stars" value={data.stars} />
            </div>

            <div className="absolute right-6 top-16">
              <div className="w-20 h-20 rounded-xl bg-blue-500/20 flex items-center justify-center border border-white/10">
                <span className="text-3xl font-bold text-blue-400">{data.grade}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="card-title">Language Mastery</h2>

            <div className="space-y-4 mt-4">
              {data.languages.map((lang) => (
                <ProgressBar key={lang.name} {...lang} />
              ))}
            </div>
          </Card>
        </div>

        <Card>
          <h2 className="card-title">Consistency</h2>

          <div className="grid md:grid-cols-4 gap-4 mt-4">
            <Highlight label="Current Streak" value={`${data.streak.current} days`} />
            <Stat label="Longest Streak" value={`${data.streak.longest} days`} />
            <Stat label="Commits" value={data.commits} />
            <Stat label="Score" value={data.score} />
          </div>
        </Card>

        <Card>
          <h2 className="card-title">Contribution Trend</h2>
          <ContributionGraph data={data.contributions} />
        </Card>
      </div>
    </div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="relative p-6 rounded-2xl bg-linear-to-br from-white/5 to-white/0 backdrop-blur-xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_80px_rgba(59,130,246,0.15)] transition duration-300">
      {children}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
}

function Highlight({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-4 rounded-xl border border-orange-400/30 bg-orange-500/10">
      <p className="text-sm text-orange-300">{label}</p>
      <p className="text-xl font-bold text-orange-400">{value}</p>
    </div>
  );
}

function ProgressBar({ name, percent }: Language) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span>{name}</span>
        <span>{percent}%</span>
      </div>

      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          className="h-full bg-linear-to-r from-blue-500 to-cyan-400"
        />
      </div>
    </div>
  );
}
