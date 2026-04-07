"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ContributionGraph from "@/components/ContributionGraph";

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/stats?user=ahmed-1430")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-black">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        <h1 className="text-2xl font-semibold">
          {data.name} — GitHub Analytics
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Activity */}
          <Card>
            <h2 className="card-title">GitHub Activity</h2>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <Stat label="Commits" value={data.commits} />
              <Stat label="Repos" value={data.repos} />
              <Stat label="Followers" value={data.followers} />
              <Stat label="Stars" value={data.stars} />
            </div>

            {/* Grade */}
            <div className="absolute right-6 top-16">
              <div className="w-20 h-20 rounded-xl bg-blue-500/20 flex items-center justify-center border border-white/10">
                <span className="text-3xl font-bold text-blue-400">
                  {data.grade}
                </span>
              </div>
            </div>
          </Card>

          {/* Languages */}
          <Card>
            <h2 className="card-title">Language Mastery</h2>

            <div className="space-y-4 mt-4">
              {data.languages.map((lang) => (
                <ProgressBar key={lang.name} {...lang} />
              ))}
            </div>
          </Card>
        </div>

        {/* Consistency */}
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



// # 🔥 COMPONENTS
const Card = ({ children }) => (
  <div className="relative p-6 rounded-2xl 
    bg-gradient-to-br from-white/5 to-white/0
    backdrop-blur-xl 
    border border-white/10
    shadow-[0_20px_80px_rgba(0,0,0,0.7)]
    hover:shadow-[0_20px_80px_rgba(59,130,246,0.15)]
    transition duration-300"
  >
    {children}
  </div>
);
const Stat = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

const Highlight = ({ label, value }) => (
  <div className="p-4 rounded-xl border border-orange-400/30 bg-orange-500/10">
    <p className="text-sm text-orange-300">{label}</p>
    <p className="text-xl font-bold text-orange-400">{value}</p>
  </div>
);

const ProgressBar = ({ name, percent }) => (
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