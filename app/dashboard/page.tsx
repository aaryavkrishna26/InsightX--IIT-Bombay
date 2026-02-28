"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
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
import { CATEGORIES, DEVICES, REGIONS, randomBetween } from "@/lib/mock-data";

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

function AnimatedCounter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{prefix}{value.toLocaleString()}{suffix}</span>;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalTransactions: 0,
    revenue: 0,
    fraudRate: 0,
    peakHour: "7 PM",
    activeUsers: 0,
  });

  const [categoryData, setCategoryData] = useState<{ name: string; value: number }[]>([]);
  const [trendData, setTrendData] = useState<{ name: string; transactions: number; revenue: number }[]>([]);
  const [deviceData, setDeviceData] = useState<{ name: string; value: number }[]>([]);
  const [regionData, setRegionData] = useState<{ name: string; value: number }[]>([]);

  const generateData = useCallback(() => {
    setStats({
      totalTransactions: randomBetween(450000, 620000),
      revenue: randomBetween(1800000, 3200000),
      fraudRate: +(Math.random() * 4 + 2).toFixed(1),
      peakHour: "7 PM",
      activeUsers: randomBetween(82000, 145000),
    });
    setCategoryData(CATEGORIES.map((c) => ({ name: c, value: randomBetween(30000, 120000) })));
    setTrendData(
      ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => ({
        name: d,
        transactions: randomBetween(50000, 90000),
        revenue: randomBetween(800000, 1500000),
      }))
    );
    setDeviceData(DEVICES.map((d) => ({ name: d, value: randomBetween(15000, 70000) })));
    setRegionData(REGIONS.slice(0, 6).map((r) => ({ name: r, value: randomBetween(20000, 80000) })));
  }, []);

  useEffect(() => {
    generateData();
  }, [generateData]);

  const metricCards = [
    {
      label: "Total Transactions Today",
      value: stats.totalTransactions,
      prefix: "",
      suffix: "",
      icon: Activity,
      change: "+12.3%",
      up: true,
    },
    {
      label: "Revenue Today",
      value: stats.revenue,
      prefix: "$",
      suffix: "",
      icon: DollarSign,
      change: "+8.7%",
      up: true,
    },
    {
      label: "Fraud Rate",
      value: stats.fraudRate,
      prefix: "",
      suffix: "%",
      icon: ShieldAlert,
      change: "-2.1%",
      up: false,
    },
    {
      label: "Peak Hour",
      value: null,
      display: stats.peakHour,
      icon: Clock,
      change: "7-8 PM",
      up: true,
    },
    {
      label: "Active Users",
      value: stats.activeUsers,
      prefix: "",
      suffix: "",
      icon: Users,
      change: "+15.4%",
      up: true,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metricCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">{card.label}</p>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <card.icon className="h-4 w-4 text-primary" />
              </div>
            </div>
            <p className="mt-2 text-2xl font-bold text-card-foreground">
              {card.value !== null && card.value !== undefined ? (
                <AnimatedCounter target={card.value} prefix={card.prefix || ""} suffix={card.suffix || ""} />
              ) : (
                card.display
              )}
            </p>
            <div className="mt-1 flex items-center gap-1">
              {card.up ? (
                <ArrowUpRight className="h-3 w-3 text-emerald-500" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-emerald-500" />
              )}
              <span className="text-xs font-medium text-emerald-500">{card.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Weekly Transaction Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="text-sm font-semibold text-card-foreground">Weekly Transactions</h3>
          <p className="text-xs text-muted-foreground">Transaction volume by day</p>
          <div className="mt-4 h-64">
            {trendData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid oklch(0.5 0 0 / 0.1)", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="transactions" stroke="oklch(0.55 0.18 270)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Category Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="text-sm font-semibold text-card-foreground">Revenue by Category</h3>
          <p className="text-xs text-muted-foreground">Distribution across categories</p>
          <div className="mt-4 h-64">
            {categoryData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="oklch(0.5 0 0 / 0.4)" angle={-30} textAnchor="end" height={50} />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid oklch(0.5 0 0 / 0.1)", fontSize: "12px" }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {categoryData.map((_, index) => (
                      <Cell key={`cat-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Device Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="text-sm font-semibold text-card-foreground">Device Distribution</h3>
          <p className="text-xs text-muted-foreground">Transactions by device type</p>
          <div className="mt-4 h-64">
            {deviceData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deviceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {deviceData.map((_, index) => (
                      <Cell key={`dev-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid oklch(0.5 0 0 / 0.1)", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Top Regions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="text-sm font-semibold text-card-foreground">Top Regions</h3>
          <p className="text-xs text-muted-foreground">Transaction volume by state</p>
          <div className="mt-4 h-64">
            {regionData.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis type="number" tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" width={90} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid oklch(0.5 0 0 / 0.1)", fontSize: "12px" }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                    {regionData.map((_, index) => (
                      <Cell key={`reg-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
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
