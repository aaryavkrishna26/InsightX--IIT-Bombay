"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import { DEVICES, CATEGORIES, randomBetween } from "@/lib/mock-data";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

const CHART_COLORS = [
  "oklch(0.55 0.18 270)", "oklch(0.72 0.15 195)", "oklch(0.45 0.18 270)", "oklch(0.65 0.12 195)",
];

export default function DevicesPage() {
  const [txData, setTxData] = useState<{ name: string; value: number }[]>([]);
  const [revenueData, setRevenueData] = useState<{ name: string; value: number }[]>([]);
  const [aovData, setAovData] = useState<{ name: string; value: number }[]>([]);
  const [radarData, setRadarData] = useState<{ subject: string; Android: number; iOS: number; Web: number; Desktop: number }[]>([]);

  const generateData = useCallback(() => {
    setTxData(DEVICES.map((d) => ({ name: d, value: randomBetween(20000, 80000) })));
    setRevenueData(DEVICES.map((d) => ({ name: d, value: randomBetween(500000, 3000000) })));
    setAovData(DEVICES.map((d) => ({ name: d, value: randomBetween(30, 120) })));
    setRadarData(
      CATEGORIES.slice(0, 6).map((c) => ({
        subject: c,
        Android: randomBetween(20, 100),
        iOS: randomBetween(20, 100),
        Web: randomBetween(10, 60),
        Desktop: randomBetween(10, 50),
      }))
    );
  }, []);

  useEffect(() => { generateData(); }, [generateData]);

  const cards = DEVICES.map((d, i) => ({
    name: d,
    tx: txData[i]?.value || 0,
    rev: revenueData[i]?.value || 0,
    aov: aovData[i]?.value || 0,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">Device Analysis</h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card, i) => (
          <motion.div key={card.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-card-foreground">{card.name}</span>
            </div>
            <p className="mt-2 text-xl font-bold text-card-foreground">{card.tx.toLocaleString()}</p>
            <p className="text-[11px] text-muted-foreground">transactions</p>
            <p className="mt-1 text-xs text-muted-foreground">Rev: ${(card.rev / 1000000).toFixed(1)}M | AOV: ${card.aov}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-card-foreground">Transaction Share</h3>
          <div className="mt-4 h-64">
            {txData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={txData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {txData.map((_, idx) => <Cell key={`dt-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-card-foreground">Revenue by Device</h3>
          <div className="mt-4 h-64">
            {revenueData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {revenueData.map((_, idx) => <Cell key={`dr-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:col-span-2">
          <h3 className="text-sm font-semibold text-card-foreground">Category Preference by Device (Radar)</h3>
          <div className="mt-4 h-80">
            {radarData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="oklch(0.5 0 0 / 0.1)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <PolarRadiusAxis tick={{ fontSize: 9 }} stroke="oklch(0.5 0 0 / 0.2)" />
                  <Radar name="Android" dataKey="Android" stroke="oklch(0.55 0.18 270)" fill="oklch(0.55 0.18 270)" fillOpacity={0.2} />
                  <Radar name="iOS" dataKey="iOS" stroke="oklch(0.72 0.15 195)" fill="oklch(0.72 0.15 195)" fillOpacity={0.2} />
                  <Tooltip contentStyle={{ borderRadius: "12px", fontSize: "12px" }} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
