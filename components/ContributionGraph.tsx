"use client";

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";

/* ================= TYPES ================= */

type ContributionDay = {
  count: number;
  date: string;
};

/* ================= COMPONENT ================= */

export default function ContributionGraph({
  data,
}: {
  data?: ContributionDay[]; // ✅ allow undefined
}) {
  //  SAFE DATA HANDLING
  const safeData = Array.isArray(data) ? data : [];

  const chartData = safeData.slice(-30).map((d) => ({
    date: new Date(d.date),
    value: d.count,
  }));

  //  EMPTY STATE
  if (chartData.length === 0) {
    return (
      <div className="h-72 flex items-center justify-center text-gray-400">
        No contribution data available
      </div>
    );
  }

  //  FORMAT DATE
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  //  SAFE PEAK CALCULATION
  const peak = chartData.reduce((max, d) =>
    d.value > max.value ? d : max
  );

  return (
    <div className="h-72 w-full mt-4 relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>

          {/* GRID */}
          <CartesianGrid
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />

          {/* GRADIENT */}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* X AXIS */}
          <XAxis
            dataKey="date"
            tickFormatter={(value) => formatDate(value)}
            stroke="#64748b"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y AXIS */}
          <YAxis
            orientation="left"
            domain={[0, "dataMax + 1"]}
            ticks={[2, 4, 6, 8]}
            stroke="#64748b"
            tick={{ fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          {/* TOOLTIP */}
          <Tooltip
            cursor={{
              stroke: "rgba(255,255,255,0.2)",
              strokeWidth: 1,
            }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;

              const d = payload[0].payload;

              return (
                <div className="px-3 py-2 rounded-lg bg-[#020617]/90 backdrop-blur-xl border border-white/10 shadow-xl">
                  <p className="text-xs text-gray-400">
                    {formatDate(d.date)}
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {d.value} contributions
                  </p>
                </div>
              );
            }}
          />

          {/* AREA */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#areaGradient)"
            animationDuration={1200}
            activeDot={{
              r: 6,
              stroke: "#3b82f6",
              strokeWidth: 2,
              fill: "#fff",
            }}
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

              // 🔥 Highlight peak point
              if (payload.value === peak.value) {
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill="#fb923c"
                    stroke="#fff"
                    strokeWidth={2}
                    style={{
                      filter:
                        "drop-shadow(0 0 8px rgba(251,146,60,0.8))",
                    }}
                  />
                );
              }

              return null;
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* GLOBAL GLOW */}
      <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[0_0_80px_rgba(59,130,246,0.15)]" />
    </div>
  );
}
