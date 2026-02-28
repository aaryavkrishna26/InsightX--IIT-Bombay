"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Tags, TrendingUp } from "lucide-react";
import { CATEGORIES, randomBetween } from "@/lib/mock-data";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts";

const CHART_COLORS = [
  "oklch(0.55 0.18 270)", "oklch(0.72 0.15 195)", "oklch(0.45 0.18 270)",
  "oklch(0.65 0.12 195)", "oklch(0.60 0.20 280)", "oklch(0.50 0.15 270)",
  "oklch(0.75 0.10 195)", "oklch(0.40 0.15 270)",
];

export default function CategoriesPage() {
  const [revenueData, setRevenueData] = useState<{ name: string; value: number }[]>([]);
  const [orderData, setOrderData] = useState<{ name: string; value: number }[]>([]);
  const [growthData, setGrowthData] = useState<{ name: string; value: number }[]>([]);
  const [aovData, setAovData] = useState<{ name: string; value: number }[]>([]);

  const generateData = useCallback(() => {
    setRevenueData(CATEGORIES.map((c) => ({ name: c, value: randomBetween(80000, 350000) })));
    setOrderData(CATEGORIES.map((c) => ({ name: c, value: randomBetween(5000, 40000) })));
    setGrowthData(CATEGORIES.map((c) => ({ name: c, value: randomBetween(-5, 30) })));
    setAovData(CATEGORIES.map((c) => ({ name: c, value: randomBetween(25, 150) })));
  }, []);

  useEffect(() => { generateData(); }, [generateData]);

  const topCategory = revenueData.length > 0 ? [...revenueData].sort((a, b) => b.value - a.value)[0] : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Category Analysis</h2>
          <p className="mt-1 text-sm text-muted-foreground">Performance metrics across all product categories.</p>
        </div>
        {topCategory && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-2">
            <p className="text-[11px] text-primary">Top Category</p>
            <p className="text-lg font-bold text-primary">{topCategory.name}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-card-foreground"><Tags className="h-4 w-4 text-primary" />Revenue by Category</h3>
          <div className="mt-4 h-64">
            {revenueData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="oklch(0.5 0 0 / 0.4)" angle={-30} textAnchor="end" height={50} />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {revenueData.map((_, idx) => <Cell key={`rv-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-card-foreground">Order Distribution</h3>
          <div className="mt-4 h-64">
            {orderData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={orderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {orderData.map((_, idx) => <Cell key={`od-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-card-foreground"><TrendingUp className="h-4 w-4 text-primary" />Growth Rate (%)</h3>
          <div className="mt-4 h-64">
            {growthData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="oklch(0.5 0 0 / 0.4)" angle={-30} textAnchor="end" height={50} />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {growthData.map((entry, idx) => (
                      <Cell key={`gr-${idx}`} fill={entry.value >= 0 ? "oklch(0.55 0.18 270)" : "oklch(0.55 0.2 25)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-card-foreground">Avg Order Value by Category</h3>
          <div className="mt-4 h-64">
            {aovData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={aovData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="oklch(0.5 0 0 / 0.4)" angle={-30} textAnchor="end" height={50} />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="value" stroke="oklch(0.72 0.15 195)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
