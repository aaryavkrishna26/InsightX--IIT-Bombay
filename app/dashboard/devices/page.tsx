"use client";

import { useState, useEffect, useCallback } from "react";
import { Smartphone } from "lucide-react";
import { DEVICES, randomBetween, formatINR } from "@/lib/mock-data";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const CHART_COLORS = [
  "oklch(0.55 0.18 270)", "oklch(0.72 0.15 195)", "oklch(0.45 0.18 270)", "oklch(0.65 0.12 195)",
];

export default function DevicesPage() {
  const [txData, setTxData] = useState<{ name: string; value: number }[]>([]);
  const [revenueData, setRevenueData] = useState<{ name: string; value: number }[]>([]);
  const [aovData, setAovData] = useState<{ name: string; value: number }[]>([]);

  const generateData = useCallback(() => {
    setTxData(DEVICES.map((d) => ({ name: d, value: randomBetween(8000, 35000) })));
    setRevenueData(DEVICES.map((d) => ({ name: d, value: randomBetween(80000, 450000) })));
    setAovData(DEVICES.map((d) => ({ name: d, value: randomBetween(400, 1800) })));
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
        {cards.map((card) => (
          <div key={card.name} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-card-foreground">{card.name}</span>
            </div>
            <p className="mt-2 text-xl font-bold text-card-foreground">
              {new Intl.NumberFormat("en-IN").format(card.tx)}
            </p>
            <p className="text-[11px] text-muted-foreground">transactions</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Rev: {formatINR(card.rev)} | AOV: {formatINR(card.aov)}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-card-foreground">Transaction Share</h3>
          <div className="mt-4 h-56">
            {txData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={txData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {txData.map((_, idx) => <Cell key={`dt-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-card-foreground">Revenue by Device</h3>
          <div className="mt-4 h-56">
            {revenueData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {revenueData.map((_, idx) => <Cell key={`dr-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-card-foreground">Average Order Value by Device</h3>
          <div className="mt-4 h-56">
            {aovData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aovData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} formatter={(val: number) => formatINR(val)} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {aovData.map((_, idx) => <Cell key={`da-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />)}
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
