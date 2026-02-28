"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, MapPin } from "lucide-react";
import { GEO_DATA } from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CHART_COLORS = [
  "oklch(0.55 0.18 270)",
  "oklch(0.72 0.15 195)",
  "oklch(0.45 0.18 270)",
  "oklch(0.65 0.12 195)",
  "oklch(0.60 0.20 280)",
  "oklch(0.50 0.15 270)",
  "oklch(0.75 0.10 195)",
  "oklch(0.40 0.15 270)",
  "oklch(0.58 0.16 270)",
  "oklch(0.68 0.14 195)",
];

type ViewMode = "transactions" | "revenue" | "fraud";

export default function GeographyPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("transactions");
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const sortedData = [...GEO_DATA].sort((a, b) => {
    if (viewMode === "transactions") return b.transactions - a.transactions;
    if (viewMode === "revenue") return b.revenue - a.revenue;
    return b.fraudRate - a.fraudRate;
  });

  const chartData = sortedData.map((d) => ({
    name: d.region,
    value:
      viewMode === "transactions"
        ? d.transactions
        : viewMode === "revenue"
        ? d.revenue
        : d.fraudRate,
  }));

  const maxVal = Math.max(...GEO_DATA.map((d) =>
    viewMode === "transactions" ? d.transactions : viewMode === "revenue" ? d.revenue : d.fraudRate
  ));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Geographic Map</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Regional distribution of transactions, revenue, and fraud across India.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex gap-2">
        {(["transactions", "revenue", "fraud"] as ViewMode[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`rounded-full border px-4 py-1.5 text-xs font-medium capitalize transition-all ${
              viewMode === mode
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/30"
            }`}
          >
            View by {mode === "fraud" ? "Fraud %" : mode}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Visual map representation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-card-foreground">
            <Globe className="h-4 w-4 text-primary" />
            India - Regional Heatmap
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {sortedData.map((region, i) => {
              const intensity =
                viewMode === "transactions"
                  ? region.transactions / maxVal
                  : viewMode === "revenue"
                  ? region.revenue / maxVal
                  : region.fraudRate / maxVal;

              return (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onMouseEnter={() => setHoveredRegion(region.region)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  className="relative cursor-pointer rounded-xl border border-border p-4 transition-all hover:border-primary/50 hover:shadow-md"
                  style={{
                    background: `oklch(0.55 0.18 270 / ${Math.max(intensity * 0.25, 0.05)})`,
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-semibold text-card-foreground">
                      {region.region}
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-bold text-card-foreground">
                    {viewMode === "transactions"
                      ? region.transactions.toLocaleString()
                      : viewMode === "revenue"
                      ? `$${(region.revenue / 1000000).toFixed(1)}M`
                      : `${region.fraudRate}%`}
                  </p>
                  {i === 0 && (
                    <span className="absolute -right-1 -top-1 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold text-primary-foreground">
                      Highest
                    </span>
                  )}

                  {/* Tooltip on hover */}
                  {hoveredRegion === region.region && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-1 left-0 right-0 translate-y-full z-10 rounded-lg border border-border bg-popover p-3 shadow-lg"
                    >
                      <p className="text-xs font-semibold text-popover-foreground">{region.region}</p>
                      <div className="mt-1 space-y-0.5 text-[11px] text-muted-foreground">
                        <p>Transactions: {region.transactions.toLocaleString()}</p>
                        <p>Revenue: ${(region.revenue / 1000000).toFixed(2)}M</p>
                        <p>Fraud Rate: {region.fraudRate}%</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="mb-4 text-sm font-semibold text-card-foreground">
            Regional Comparison - {viewMode === "fraud" ? "Fraud %" : viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
          </h3>
          <div className="h-[400px]">
            {chartData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis type="number" tick={{ fontSize: 10 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" width={100} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid oklch(0.5 0 0 / 0.1)", fontSize: "12px" }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {chartData.map((_, index) => (
                      <Cell key={`geo-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
