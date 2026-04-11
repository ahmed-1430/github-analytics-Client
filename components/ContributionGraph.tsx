"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import EmptyState from "@/components/dashboard/EmptyState";

type ContributionDay = {
  count: number;
  date: string;
};

type ContributionGraphProps = {
  data?: ContributionDay[];
  isDark?: boolean;
};

export default function ContributionGraph({
  data,
  isDark = true,
}: ContributionGraphProps) {
  const safeData = Array.isArray(data) ? data : [];

  const chartData = safeData.slice(-30).map((day) => ({
    date: new Date(day.date),
    value: day.count,
  }));

  if (chartData.length === 0) {
    return (
      <EmptyState
        title="No contribution data yet"
        description="Once activity is available, DevInsight will chart the last 30 days here."
        isDark={isDark}
      />
    );
  }

  const peak = chartData.reduce((max, point) => (point.value > max.value ? point : max));
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

  return (
    <div className="relative mt-4 h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 16, right: 12, bottom: 6, left: -18 }}>
          <defs>
            <linearGradient id="contributionArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.42} />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid
            vertical={false}
            stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.08)"}
          />

          <XAxis
            dataKey="date"
            tickFormatter={(value: Date) => formatDate(value)}
            tick={{ fontSize: 11, fill: isDark ? "#94a3b8" : "#64748b" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            stroke={isDark ? "#94a3b8" : "#64748b"}
            tick={{ fontSize: 11, fill: isDark ? "#94a3b8" : "#64748b" }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            width={34}
          />

          <Tooltip
            cursor={{ stroke: isDark ? "rgba(255,255,255,0.2)" : "rgba(15,23,42,0.15)", strokeWidth: 1 }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) {
                return null;
              }

              const point = payload[0].payload as { date: Date; value: number };

              return (
                <div className={`rounded-2xl border px-3 py-2 shadow-xl backdrop-blur-xl ${isDark ? "border-white/10 bg-slate-950/85 text-white" : "border-slate-200 bg-white/95 text-slate-900"}`}>
                  <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                    {formatDate(point.date)}
                  </p>
                  <p className="mt-1 text-sm font-semibold">{point.value} contributions</p>
                </div>
              );
            }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#38bdf8"
            strokeWidth={2.5}
            fill="url(#contributionArea)"
            animationDuration={1100}
            activeDot={{ r: 5, stroke: "#38bdf8", strokeWidth: 2, fill: "#ffffff" }}
            dot={(props) => {
              const { cx, cy, payload } = props;
              if (
                typeof cx !== "number" ||
                typeof cy !== "number" ||
                !payload ||
                typeof payload.value !== "number"
              ) {
                return null;
              }

              if (payload.value === peak.value) {
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill="#f59e0b"
                    stroke="#fff"
                    strokeWidth={2}
                    style={{ filter: "drop-shadow(0 0 8px rgba(245,158,11,0.55))" }}
                  />
                );
              }

              return null;
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] shadow-[0_0_80px_rgba(56,189,248,0.08)]" />
    </div>
  );
}
