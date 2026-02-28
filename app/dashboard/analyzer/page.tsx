"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical,
  Loader2,
  Terminal,
  ChevronDown,
  ChevronUp,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORIES,
  DEVICES,
  REGIONS,
  AGE_GROUPS,
  generateAnalysisResult,
  randomBetween,
} from "@/lib/mock-data";
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
  Cell,
} from "recharts";

const CHART_COLORS = [
  "oklch(0.55 0.18 270)",
  "oklch(0.72 0.15 195)",
  "oklch(0.45 0.18 270)",
  "oklch(0.65 0.12 195)",
  "oklch(0.60 0.20 280)",
];

interface AnalysisResult {
  sql: string;
  metrics: { label: string; value: string; change?: string }[];
  insight: string;
  chartData: { name: string; value: number }[];
  trendData: { name: string; value: number }[];
  tableData: { label: string; count: string; revenue: string; avg: string }[];
  growthPct: string;
}

export default function AnalyzerPage() {
  const [ageRange, setAgeRange] = useState<string>("All");
  const [device, setDevice] = useState<string>("All");
  const [category, setCategory] = useState<string>("All");
  const [timeRange, setTimeRange] = useState<string>("Last 30 Days");
  const [fraudOnly, setFraudOnly] = useState(false);
  const [region, setRegion] = useState<string>("All");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [sqlOpen, setSqlOpen] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setResult(null);
    setSqlOpen(false);

    await new Promise((r) => setTimeout(r, 1500));

    const parts = [category, device, ageRange, region, fraudOnly ? "fraud" : ""]
      .filter(Boolean)
      .join(" ");
    const base = generateAnalysisResult(parts || "revenue trends");

    const trendData = ["Week 1", "Week 2", "Week 3", "Week 4"].map((w) => ({
      name: w,
      value: randomBetween(20000, 90000),
    }));

    const tableData = CATEGORIES.slice(0, 5).map((c) => ({
      label: c,
      count: randomBetween(1000, 15000).toLocaleString(),
      revenue: `$${randomBetween(50000, 500000).toLocaleString()}`,
      avg: `$${randomBetween(30, 150)}`,
    }));

    setResult({
      ...base,
      trendData,
      tableData,
      growthPct: `+${(Math.random() * 20 + 5).toFixed(1)}%`,
    });
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analyzer Tool</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure filters and run deep analysis on your payment data.
        </p>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <Label className="text-xs">Age Range</Label>
            <Select value={ageRange} onValueChange={setAgeRange}>
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Ages</SelectItem>
                {AGE_GROUPS.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Device Type</Label>
            <Select value={device} onValueChange={setDevice}>
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Devices</SelectItem>
                {DEVICES.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Time Range</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                <SelectItem value="Last 90 Days">Last 90 Days</SelectItem>
                <SelectItem value="Last 12 Months">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Region</Label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Regions</SelectItem>
                {REGIONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-3 pb-0.5">
            <div className="flex items-center gap-2">
              <Switch checked={fraudOnly} onCheckedChange={setFraudOnly} id="fraud-toggle" />
              <Label htmlFor="fraud-toggle" className="text-xs">Fraud Only</Label>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button onClick={handleRun} disabled={loading} className="gap-2 rounded-xl">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FlaskConical className="h-4 w-4" />}
            Run Analysis
          </Button>
        </div>
      </motion.div>

      {/* Results */}
      {loading && (
        <div className="flex items-center justify-center rounded-2xl border border-border bg-card p-16">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Running deep analysis...</p>
          </div>
        </div>
      )}

      <AnimatePresence>
        {!loading && result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Growth + Insight */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-card-foreground">Growth</span>
                </div>
                <p className="mt-2 text-4xl font-bold text-primary">{result.growthPct}</p>
                <p className="mt-1 text-xs text-muted-foreground">vs previous period</p>
              </div>
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <h4 className="text-sm font-semibold text-primary">Insight Summary</h4>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{result.insight}</p>
              </div>
            </div>

            {/* Metric cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {result.metrics.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                >
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                  <p className="mt-1 text-2xl font-bold text-card-foreground">{m.value}</p>
                  {m.change && <p className="mt-0.5 text-xs font-medium text-primary">{m.change}</p>}
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Trend */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h4 className="mb-4 text-sm font-semibold text-card-foreground">Trend Chart</h4>
                <div className="h-52">
                  {result.trendData.length > 0 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={result.trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                        <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                        <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                        <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid oklch(0.5 0 0 / 0.1)", fontSize: "12px" }} />
                        <Line type="monotone" dataKey="value" stroke="oklch(0.55 0.18 270)" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Comparison */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h4 className="mb-4 text-sm font-semibold text-card-foreground">Comparison Chart</h4>
                <div className="h-52">
                  {result.chartData.length > 0 && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={result.chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="oklch(0.5 0 0 / 0.4)" />
                        <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                        <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid oklch(0.5 0 0 / 0.1)", fontSize: "12px" }} />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                          {result.chartData.map((_, idx) => (
                            <Cell key={`a-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h4 className="mb-4 text-sm font-semibold text-card-foreground">Tabular Breakdown</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 text-left text-xs font-medium text-muted-foreground">Category</th>
                      <th className="pb-3 text-right text-xs font-medium text-muted-foreground">Count</th>
                      <th className="pb-3 text-right text-xs font-medium text-muted-foreground">Revenue</th>
                      <th className="pb-3 text-right text-xs font-medium text-muted-foreground">Avg Order</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.tableData.map((row) => (
                      <tr key={row.label} className="border-b border-border/50">
                        <td className="py-3 font-medium text-card-foreground">{row.label}</td>
                        <td className="py-3 text-right text-muted-foreground">{row.count}</td>
                        <td className="py-3 text-right text-muted-foreground">{row.revenue}</td>
                        <td className="py-3 text-right text-muted-foreground">{row.avg}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SQL */}
            <div className="rounded-2xl border border-border bg-card shadow-sm">
              <button onClick={() => setSqlOpen(!sqlOpen)} className="flex w-full items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-card-foreground">Generated SQL</span>
                  <Badge variant="secondary" className="text-[10px]">Auto-generated</Badge>
                </div>
                {sqlOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
              </button>
              <AnimatePresence>
                {sqlOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <pre className="border-t border-border bg-secondary/50 px-6 py-4 font-mono text-xs leading-relaxed text-secondary-foreground">
                      {result.sql}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
