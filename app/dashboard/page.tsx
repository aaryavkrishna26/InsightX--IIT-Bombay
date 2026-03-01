"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShieldAlert,
  Clock,
  Users,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { CATEGORIES, DEVICES, REGIONS, randomBetween, formatINR } from "@/lib/mock-data";

const CHART_COLORS = [
  "oklch(0.55 0.18 270)",
  "oklch(0.72 0.15 195)",
  "oklch(0.45 0.18 270)",
  "oklch(0.65 0.12 195)",
  "oklch(0.60 0.20 280)",
  "oklch(0.50 0.15 270)",
  "oklch(0.75 0.10 195)",
  "oklch(0.40 0.15 270)",
];

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalTransactions: 0,
    revenue: 0,
    fraudRate: 0,
    peakHour: "7 PM",
    activeUsers: 0,
  });

  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);
  const [trendData, setTrendData] = useState<{ name: string; transactions: number }[]>([]);
  const [deviceData, setDeviceData] = useState<{ name: string; value: number }[]>([]);
  const [regionData, setRegionData] = useState<{ name: string; value: number }[]>([]);

  const generateData = useCallback(() => {
    setStats({
      totalTransactions: randomBetween(18000, 45000),
      revenue: randomBetween(120000, 450000),
      fraudRate: +(Math.random() * 4 + 2).toFixed(1),
      peakHour: "7 PM",
      activeUsers: randomBetween(8000, 22000),
    });
    setCategoryData(CATEGORIES.map((c) => ({ name: c, value: randomBetween(2000, 12000) })));
    setTrendData(
      ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => ({
        name: d,
        transactions: randomBetween(8000, 25000),
      }))
    );
    setDeviceData(DEVICES.map((d) => ({ name: d, value: randomBetween(3000, 15000) })));
    setRegionData(REGIONS.slice(0, 6).map((r) => ({ name: r, value: randomBetween(2000, 12000) })));
  }, []);

  useEffect(() => {
    generateData();
  }, [generateData]);

  const metricCards = [
    {
      label: "Total Transactions",
      value: new Intl.NumberFormat("en-IN").format(stats.totalTransactions),
      icon: Activity,
      change: "+12.3%",
      up: true,
    },
    {
      label: "Revenue Today",
      value: formatINR(stats.revenue),
      icon: DollarSign,
      change: "+8.7%",
      up: true,
    },
    {
      label: "Fraud Rate",
      value: `${stats.fraudRate}%`,
      icon: ShieldAlert,
      change: "-2.1%",
      up: false,
    },
    {
      label: "Peak Hour",
      value: stats.peakHour,
      icon: Clock,
      change: "7-8 PM",
      up: true,
    },
    {
      label: "Active Users",
      value: new Intl.NumberFormat("en-IN").format(stats.activeUsers),
      icon: Users,
      change: "+15.4%",
      up: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metricCards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">{card.label}</p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <card.icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-card-foreground">{card.value}</p>
            <div className="mt-1 flex items-center gap-1">
              {card.up ? (
                <ArrowUpRight className="h-3 w-3 text-emerald-500" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-emerald-500" />
              )}
              <span className="text-xs font-medium text-emerald-500">{card.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-card-foreground">Weekly Transactions</h3>
          <p className="text-xs text-muted-foreground">Transaction volume by day</p>
          <div className="mt-4 h-56">
            {trendData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="transactions" stroke="oklch(0.55 0.18 270)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-card-foreground">Revenue by Category</h3>
          <p className="text-xs text-muted-foreground">Distribution across categories</p>
          <div className="mt-4 h-56">
            {categoryData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="oklch(0.5 0 0 / 0.4)" angle={-30} textAnchor="end" height={50} />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {categoryData.map((_, index) => (
                      <Cell key={`cat-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-card-foreground">Device Distribution</h3>
          <p className="text-xs text-muted-foreground">Transactions by device type</p>
          <div className="mt-4 h-56">
            {deviceData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {deviceData.map((_, index) => (
                      <Cell key={`dev-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-card-foreground">Top Regions</h3>
          <p className="text-xs text-muted-foreground">Transaction volume by state</p>
          <div className="mt-4 h-56">
            {regionData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" width={90} />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {regionData.map((_, index) => (
                      <Cell key={`reg-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
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
