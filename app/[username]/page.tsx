"use client";

import { startTransition, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ContributionGraph from "@/components/ContributionGraph";
import FuturisticLoader from "@/components/FuturisticLoader";
import ThemeToggle from "@/components/ThemeToggle";
import Card from "@/components/dashboard/Card";
import EmptyState from "@/components/dashboard/EmptyState";
import HighlightBox from "@/components/dashboard/HighlightBox";
import MetricBox from "@/components/dashboard/MetricBox";
import ProgressBar from "@/components/dashboard/ProgressBar";
import { useTheme } from "@/hooks/useTheme";

type StatsResponse = {
  name?: string;
  commits?: number;
  pullRequests?: number;
  issues?: number;
  reposContributed?: number;
  repos?: number;
  followers?: number;
  stars?: number;
  grade?: string;
  status?: string;
  totalContributions?: number;
  activeWeeks?: number;
  streak?: {
    current?: number;
    longest?: number;
  };
  contributions?: Array<{
    count: number;
    date: string;
  }>;
};

type ActivityResponse = {
  commits?: number;
  pullRequests?: number;
  issues?: number;
  reposContributed?: number;
  contributions?: Array<{
    count: number;
    date: string;
  }>;
};

type Language = {
  name: string;
  percent: number;
};

type LanguagesResponse = {
  languages?: Language[];
} | Language[];

type ConsistencyResponse = {
  totalContributions?: number;
  activeWeeks?: number;
  streak?: {
    current?: number;
    longest?: number;
  };
  contributions?: Array<{
    count: number;
    date: string;
  }>;
};

type DashboardData = {
  name: string;
  status: string;
  grade: string;
  repos: number;
  followers: number;
  stars: number;
  commits: number;
  pullRequests: number;
  issues: number;
  reposContributed: number;
  totalContributions: number;
  activeWeeks: number;
  streak: {
    current: number;
    longest: number;
  };
  languages: Language[];
  contributions: Array<{
    count: number;
    date: string;
  }>;
};

type LoadState =
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: DashboardData; error: null }
  | { status: "error"; data: null; error: string };

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "https://git-stats-server-updated.vercel.app";

function normalizeDashboardData(
  username: string,
  stats: StatsResponse,
  activity: ActivityResponse,
  languages: LanguagesResponse,
  consistency: ConsistencyResponse,
): DashboardData {
  return {
    name: stats.name || username,
    status: stats.status || "Active",
    grade: stats.grade || "N/A",
    repos: stats.repos ?? 0,
    followers: stats.followers ?? 0,
    stars: stats.stars ?? 0,
    commits: stats.commits ?? activity.commits ?? 0,
    pullRequests: stats.pullRequests ?? activity.pullRequests ?? 0,
    issues: stats.issues ?? activity.issues ?? 0,
    reposContributed: stats.reposContributed ?? activity.reposContributed ?? 0,
    totalContributions: stats.totalContributions ?? consistency.totalContributions ?? 0,
    activeWeeks: stats.activeWeeks ?? consistency.activeWeeks ?? 0,
    streak: {
      current: stats.streak?.current ?? consistency.streak?.current ?? 0,
      longest: stats.streak?.longest ?? consistency.streak?.longest ?? 0,
    },
    languages: Array.isArray(languages)
      ? languages
      : Array.isArray(languages.languages)
        ? languages.languages
        : [],
    contributions: Array.isArray(stats.contributions)
      ? stats.contributions
      : Array.isArray(activity.contributions)
        ? activity.contributions
        : Array.isArray(consistency.contributions)
          ? consistency.contributions
          : [],
  };
}

export default function Page() {
  const { username } = useParams<{ username: string }>();
  const { isDark, mounted, toggleTheme } = useTheme();
  const [state, setState] = useState<LoadState>({
    status: "loading",
    data: null,
    error: null,
  });

  useEffect(() => {
    if (!username) {
      return;
    }

    let cancelled = false;

    async function loadDashboard() {
      try {
        const [statsResponse, activityResponse, languagesResponse, consistencyResponse] =
          await Promise.all([
            fetch(`${API_BASE_URL}/api/stats?user=${username}`),
            fetch(`${API_BASE_URL}/api/activity?user=${username}`),
            fetch(`${API_BASE_URL}/api/languages?user=${username}`),
            fetch(`${API_BASE_URL}/api/consistency?user=${username}`),
          ]);

        const responses = [
          statsResponse,
          activityResponse,
          languagesResponse,
          consistencyResponse,
        ];

        if (responses.some((response) => !response.ok)) {
          throw new Error("Unable to load DevInsight data right now.");
        }

        const [stats, activity, languages, consistency] = (await Promise.all(
          responses.map((response) => response.json()),
        )) as [
            StatsResponse,
            ActivityResponse,
            LanguagesResponse,
            ConsistencyResponse,
          ];

        const nextData = normalizeDashboardData(
          username,
          stats,
          activity,
          languages,
          consistency,
        );

        if (!cancelled) {
          startTransition(() => {
            setState({ status: "success", data: nextData, error: null });
          });
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to load DevInsight data right now.";

        if (!cancelled) {
          setState({ status: "error", data: null, error: message });
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (state.status === "loading") {
    return <FuturisticLoader label={`Loading DevInsight for ${username}`} isDark={isDark} />;
  }

  if (state.status === "error") {
    return (
      <div className={isDark ? "min-h-screen bg-[#020617] px-4 py-10 text-white" : "min-h-screen bg-slate-100 px-4 py-10 text-slate-900"}>
        <div className="mx-auto max-w-6xl">
          <EmptyState
            title="We couldn't load this dashboard"
            description={state.error}
            isDark={isDark}
          />
        </div>
      </div>
    );
  }

  const { data } = state;
  const themeShell = isDark
    ? "bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.10),transparent_24%),linear-gradient(180deg,#020617_0%,#07111f_55%,#020617_100%)] text-white"
    : "bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_26%),linear-gradient(180deg,#f8fbff_0%,#eef4fb_100%)] text-slate-950";
  const statusBadge = isDark
    ? "border-cyan-400/20 bg-cyan-400/8 text-cyan-200"
    : "border-cyan-200 bg-cyan-50 text-cyan-700";

  return (
    <div className={`min-h-screen ${themeShell}`}>
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="flex justify-end">
            {mounted ? <ThemeToggle isDark={isDark} onToggle={toggleTheme} /> : null}
          </div>
          <header className="flex flex-col gap-4 rounded-[2rem] border px-5 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:py-6"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(148,163,184,0.24)",
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.76)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div>
              <p className={`text-[11px] uppercase tracking-[0.4em] ${isDark ? "text-cyan-300/75" : "text-cyan-700/70"}`}>
                DevInsight
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                @{username}
              </h1>
              <p className={`mt-2 max-w-2xl text-sm sm:text-base ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                Premium GitHub analytics across activity, language depth, and consistency patterns.
              </p>
            </div>

            <div className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium ${statusBadge}`}>
              <span className="h-2 w-2 rounded-full bg-current opacity-80" />
              {data.status}
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.95fr]">
            <div className="space-y-6">
              <Card isDark={isDark}>
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className={`text-[11px] uppercase tracking-[0.35em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      GitHub Activity
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold">Performance snapshot</h2>
                  </div>

                  <div className={`flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-[1.5rem] border ${isDark ? "border-cyan-400/20 bg-cyan-400/8 text-cyan-200" : "border-cyan-200 bg-cyan-50 text-cyan-700"}`}>
                    <span className="text-3xl font-semibold">{data.grade}</span>
                    <span className="mt-1 text-[10px] uppercase tracking-[0.28em] opacity-70">Grade</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                  <MetricBox label="Commits" value={data.commits} isDark={isDark} />
                  <MetricBox label="Pull Requests" value={data.pullRequests} isDark={isDark} />
                  <MetricBox label="Issues" value={data.issues} isDark={isDark} />
                  <MetricBox label="Repositories" value={data.repos} isDark={isDark} />
                  <MetricBox
                    label="Repos Contributed"
                    value={data.reposContributed}
                    isDark={isDark}
                    tone="accent"
                  />
                  <MetricBox label="Stars" value={data.stars} isDark={isDark} />
                </div>
              </Card>

              <Card isDark={isDark}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className={`text-[11px] uppercase tracking-[0.35em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                      Contribution Graph
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold">Last 30 days</h2>
                  </div>
                </div>

                <ContributionGraph data={data.contributions} isDark={isDark} />
              </Card>
            </div>

            <div className="space-y-6">
              <Card isDark={isDark}>
                <p className={`text-[11px] uppercase tracking-[0.35em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Language Mastery
                </p>
                <h2 className="mt-3 text-2xl font-semibold">Stack profile</h2>

                <div className="mt-6 space-y-5">
                  {data.languages.length > 0 ? (
                    data.languages.map((language) => (
                      <ProgressBar
                        key={language.name}
                        name={language.name}
                        percent={language.percent}
                        isDark={isDark}
                      />
                    ))
                  ) : (
                    <EmptyState
                      title="No language profile yet"
                      description="Language distribution will appear when the backend returns usage data."
                      isDark={isDark}
                    />
                  )}
                </div>
              </Card>

              <Card isDark={isDark}>
                <p className={`text-[11px] uppercase tracking-[0.35em] ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Consistency
                </p>
                <h2 className="mt-3 text-2xl font-semibold">Momentum over time</h2>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <HighlightBox
                    label="Current Streak"
                    value={data.streak.current}
                    suffix="days"
                    isDark={isDark}
                  />
                  <MetricBox label="Longest Streak" value={data.streak.longest} isDark={isDark} />
                  <MetricBox
                    label="Contributions (12M)"
                    value={data.totalContributions}
                    isDark={isDark}
                  />
                  <MetricBox label="Active Weeks" value={data.activeWeeks} isDark={isDark} />
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
