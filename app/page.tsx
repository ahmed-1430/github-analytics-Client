"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FuturisticLoader from "@/components/FuturisticLoader";
import FeatureCard from "@/components/marketing/FeatureCard";
import PreviewMock from "@/components/marketing/PreviewMock";
import SectionHeading from "@/components/marketing/SectionHeading";
import StepCard from "@/components/marketing/StepCard";
import TestimonialCard from "@/components/marketing/TestimonialCard";
import UseCaseCard from "@/components/marketing/UseCaseCard";

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

type LoadState =
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: Stats; error: null }
  | { status: "error"; data: null; error: string };

const DEFAULT_USERNAME = "ahmed-1430";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "https://git-stats-server-updated.vercel.app";

export default function Page() {
  const router = useRouter();
  const [state, setState] = useState<LoadState>({
    status: "loading",
    data: null,
    error: null,
  });
  const [usernameInput, setUsernameInput] = useState("");
  const heroInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadDemoData() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/stats?user=${DEFAULT_USERNAME}`);
        if (!response.ok) {
          throw new Error("Unable to load demo preview.");
        }

        const nextData = (await response.json()) as Stats;
        if (!cancelled) {
          setState({ status: "success", data: nextData, error: null });
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unable to load demo preview.";
        if (!cancelled) {
          setState({ status: "error", data: null, error: message });
        }
      }
    }

    loadDemoData();

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return <FuturisticLoader label="Loading DevInsight preview" />;
  }

  const demoData =
    state.status === "success"
      ? state.data
      : {
          name: "DevInsight Demo",
          commits: 1042,
          repos: 32,
          followers: 148,
          stars: 61,
          score: 92,
          grade: "A+",
          streak: { current: 41, longest: 88 },
          languages: [
            { name: "TypeScript", percent: 42 },
            { name: "JavaScript", percent: 31 },
            { name: "Python", percent: 17 },
            { name: "Go", percent: 10 },
          ],
          contributions: Array.from({ length: 14 }, (_, index) => ({
            date: `2026-04-${String(index + 1).padStart(2, "0")}`,
            count: [3, 7, 5, 9, 4, 12, 8, 6, 10, 7, 11, 9, 13, 8][index],
          })),
        };

  function goToUsername(username: string) {
    const nextUsername = username.trim().replace(/^@+/, "");
    if (!nextUsername) {
      heroInputRef.current?.focus();
      return;
    }

    router.push(`/${encodeURIComponent(nextUsername)}`);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_24%),linear-gradient(180deg,#020617_0%,#07111f_42%,#020617_100%)]" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative z-10">
        <main className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
          <section className="pt-8 sm:pt-12">
            <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-cyan-200">
                  Developer analytics, refined
                </div>

                <h1 className="mt-8 max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Turn Your GitHub Into a Developer Profile That Stands Out
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
                  Visualize your contributions, streaks, and skills with a clean, shareable dashboard.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/${DEFAULT_USERNAME}`}
                    className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-50"
                  >
                    View Demo
                  </Link>
                  <button
                    type="button"
                    onClick={() => heroInputRef.current?.focus()}
                    className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/4 px-6 py-3 text-sm font-medium text-white backdrop-blur-xl transition hover:border-cyan-300/35 hover:bg-cyan-300/8"
                  >
                    Try Your Username
                  </button>
                </div>

                <form
                  className="mt-5 flex flex-col gap-3 sm:max-w-xl sm:flex-row"
                  onSubmit={(event) => {
                    event.preventDefault();
                    goToUsername(usernameInput);
                  }}
                >
                  <input
                    ref={heroInputRef}
                    type="text"
                    value={usernameInput}
                    onChange={(event) => setUsernameInput(event.target.value)}
                    placeholder="Enter GitHub username"
                    className="h-12 flex-1 rounded-full border border-white/12 bg-white/4 px-5 text-sm text-white outline-none backdrop-blur-xl placeholder:text-slate-500 focus:border-cyan-300/40"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-300 px-5 text-sm font-medium text-slate-950 transition hover:bg-cyan-200"
                  >
                    Generate Profile
                  </button>
                </form>

                <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-slate-500">
                  <span>Shareable profiles</span>
                  <span>Beautiful analytics</span>
                  <span>Built for developers, recruiters, and teams</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
                className="relative"
              >
                <div className="absolute -inset-6 rounded-[2.5rem] bg-cyan-400/10 blur-3xl" />
                <PreviewMock data={demoData} />
              </motion.div>
            </div>
          </section>

          <section className="mt-28">
            <SectionHeading
              eyebrow="Live preview"
              title="A dashboard that feels crafted, not auto-generated"
              description="Highlight the signals that matter most, from streaks and language depth to contribution momentum and portfolio-ready metrics."
            />

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                {
                  title: "Streak momentum",
                  value: `${demoData.streak.current} days`,
                  description: "Current streak framed to show consistency at a glance.",
                },
                {
                  title: "Language depth",
                  value: `${demoData.languages[0]?.name ?? "TypeScript"} ${demoData.languages[0]?.percent ?? 42}%`,
                  description: "Skills shown as polished, animated language bars.",
                },
                {
                  title: "Contribution pulse",
                  value: `${demoData.contributions.slice(-14).reduce((sum, item) => sum + item.count, 0)} commits`,
                  description: "Recent output visualized in a premium activity pattern.",
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-[1.75rem] border border-white/10 bg-white/4 p-5 backdrop-blur-xl"
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-300/75">
                    {item.title}
                  </p>
                  <p className="mt-4 text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mt-28">
            <SectionHeading
              eyebrow="Features"
              title="Everything you need to package your GitHub into a better profile"
              description="DevInsight turns raw developer activity into a polished, shareable identity layer for hiring, personal branding, and team visibility."
              center
            />

            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <FeatureCard
                title="GitHub Analytics"
                description="See the numbers that define your work, from commits to stars to repos that matter."
                accent="linear-gradient(135deg, rgba(34,211,238,0.55), rgba(59,130,246,0.35))"
              />
              <FeatureCard
                title="Contribution Insights"
                description="Visualize patterns in your output and spotlight momentum over time."
                accent="linear-gradient(135deg, rgba(59,130,246,0.55), rgba(125,211,252,0.28))"
              />
              <FeatureCard
                title="Language Breakdown"
                description="Turn your stack history into a readable signal recruiters can understand fast."
                accent="linear-gradient(135deg, rgba(14,165,233,0.5), rgba(56,189,248,0.24))"
              />
              <FeatureCard
                title="Streak Tracking"
                description="Show commitment and consistency with streaks that feel meaningful, not gimmicky."
                accent="linear-gradient(135deg, rgba(251,191,36,0.58), rgba(249,115,22,0.30))"
              />
              <FeatureCard
                title="Shareable Profiles"
                description="Create a clean dashboard you can send in portfolios, resumes, and social profiles."
                accent="linear-gradient(135deg, rgba(244,114,182,0.42), rgba(59,130,246,0.25))"
              />
            </div>
          </section>

          <section className="mt-28">
            <SectionHeading
              eyebrow="How it works"
              title="From username to standout profile in seconds"
              description="A simple, high-conversion workflow designed to get developers from curiosity to a polished public dashboard fast."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <StepCard
                step="1"
                title="Enter your GitHub username"
                description="Start with the handle you already use. No setup maze, no manual data entry."
              />
              <StepCard
                step="2"
                title="We analyze your activity"
                description="DevInsight pulls together contributions, streaks, languages, and project signals."
              />
              <StepCard
                step="3"
                title="Get a beautiful dashboard instantly"
                description="Your profile becomes a premium, shareable dashboard ready for hiring and personal branding."
              />
            </div>
          </section>

          <section className="mt-28">
            <SectionHeading
              eyebrow="Use cases"
              title="Designed for the people who need developer signal most"
              description="Whether you're showcasing your work or evaluating talent, DevInsight makes GitHub activity easier to read and easier to trust."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <UseCaseCard
                tag="Developers"
                title="Turn GitHub into a portfolio layer"
                description="Show proof of work with a clean dashboard instead of sending raw repositories and hoping people connect the dots."
              />
              <UseCaseCard
                tag="Job seekers"
                title="Stand out with evidence, not just claims"
                description="Bring consistency, output, and technical breadth into one link you can put anywhere."
              />
              <UseCaseCard
                tag="Recruiters"
                title="Read developer activity faster"
                description="Get a visual summary of technical momentum without diving through repo after repo."
              />
            </div>
          </section>

          <section className="mt-28">
            <SectionHeading
              eyebrow="Social proof"
              title="Used by developers worldwide"
              description="Early users rely on DevInsight to make their GitHub presence look intentional, credible, and easy to share."
              center
            />

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <TestimonialCard
                quote="It finally made my GitHub look like part of my professional story instead of a pile of repos."
                name="Nadia Khan"
                role="Frontend engineer"
              />
              <TestimonialCard
                quote="I used it before interviews and people immediately understood my work at a glance."
                name="Rahim Ahmed"
                role="Full-stack developer"
              />
              <TestimonialCard
                quote="The dashboard feels premium enough to send to candidates and hiring managers without apology."
                name="Ethan Lee"
                role="Technical recruiter"
              />
            </div>
          </section>

          <section className="mt-28">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="rounded-[2rem] border border-white/10 bg-linear-to-br from-cyan-400/10 via-white/4 to-blue-500/10 px-6 py-10 text-center shadow-[0_30px_100px_rgba(8,15,36,0.42)] backdrop-blur-2xl sm:px-10"
            >
              <p className="text-[11px] uppercase tracking-[0.38em] text-cyan-200/80">
                Final call
              </p>
              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Build your developer profile now
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                Turn GitHub activity into a dashboard people actually want to explore.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href={`/${DEFAULT_USERNAME}`}
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-50"
                >
                  View Demo
                </Link>
                <button
                  type="button"
                  onClick={() => heroInputRef.current?.focus()}
                  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/4 px-6 py-3 text-sm font-medium text-white transition hover:border-cyan-300/35 hover:bg-cyan-300/8"
                >
                  Try Your Username
                </button>
              </div>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}
