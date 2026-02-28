"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { DEVICES, REGIONS, CATEGORIES, randomBetween } from "@/lib/mock-data";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from "recharts";

const CHART_COLORS = [
  "oklch(0.55 0.18 270)", "oklch(0.72 0.15 195)", "oklch(0.45 0.18 270)",
  "oklch(0.65 0.12 195)", "oklch(0.60 0.20 280)", "oklch(0.50 0.15 270)",
];

export default function FraudPage() {
  const [deviceFraud, setDeviceFraud] = useState<{ name: string; value: number }[]>([]);
  const [categoryFraud, setCategoryFraud] = useState<{ name: string; value: number }[]>([]);
  const [monthlyTrend, setMonthlyTrend] = useState<{ name: string; fraud: number; total: number }[]>([]);
  const [regionFraud, setRegionFraud] = useState<{ name: string; value: number }[]>([]);
  const [stats, setStats] = useState({ total: 0, rate: 0, avgAmt: 0, detected: 0 });

  const generateData = useCallback(() => {
    setDeviceFraud(DEVICES.map((d) => ({ name: d, value: randomBetween(500, 7000) })));
    setCategoryFraud(CATEGORIES.map((c) => ({ name: c, value: randomBetween(200, 3000) })));
    setMonthlyTrend(
      ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((m) => ({
        name: m,
        fraud: randomBetween(1000, 4000),
        total: randomBetween(40000, 80000),
      }))
    );
    setRegionFraud(REGIONS.slice(0, 6).map((r) => ({ name: r, value: +(Math.random() * 10 + 2).toFixed(1) })));
    setStats({
      total: randomBetween(10000, 25000),
      rate: +(Math.random() * 5 + 2).toFixed(1),
      avgAmt: randomBetween(150, 450),
      detected: randomBetween(85, 97),
    });
  }, []);

  useEffect(() => { generateData(); }, [generateData]);

  const statCards = [
    { label: "Total Fraud Transactions", value: stats.total.toLocaleString(), icon: ShieldAlert, trend: "+8.2%", up: true },
    { label: "Overall Fraud Rate", value: `${stats.rate}%`, icon: AlertTriangle, trend: "-1.3%", up: false },
    { label: "Avg Fraud Amount", value: `$${stats.avgAmt}`, icon: TrendingUp, trend: "+12%", up: true },
    { label: "Detection Rate", value: `${stats.detected}%`, icon: TrendingDown, trend: "+3.1%", up: true },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Fraud Analysis</h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <card.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 text-2xl font-bold text-card-foreground">{card.value}</p>
            <p className="text-xs text-muted-foreground">{card.label}</p>
            <p className={`mt-0.5 text-xs font-medium ${card.up ? "text-emerald-500" : "text-emerald-500"}`}>{card.trend}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-card-foreground">Fraud by Device</h3>
          <div className="mt-4 h-64">
            {deviceFraud.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deviceFraud} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {deviceFraud.map((_, idx) => <Cell key={`df-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-card-foreground">Monthly Fraud Trend</h3>
          <div className="mt-4 h-64">
            {monthlyTrend.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="fraud" stroke="oklch(0.55 0.18 270)" strokeWidth={2} dot={{ r: 3 }} name="Fraud" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-card-foreground">Fraud by Category</h3>
          <div className="mt-4 h-64">
            {categoryFraud.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryFraud}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="oklch(0.5 0 0 / 0.4)" angle={-30} textAnchor="end" height={50} />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {categoryFraud.map((_, idx) => <Cell key={`cf-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-card-foreground">Fraud Rate by Region</h3>
          <div className="mt-4 h-64">
            {regionFraud.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionFraud} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" width={90} />
                  <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {regionFraud.map((_, idx) => <Cell key={`rf-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
