"use client";

import { useState } from "react";
import {
  FlaskConical,
  Loader2,
  Terminal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { DEVICES, randomBetween, formatINR } from "@/lib/mock-data";
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
];

interface SimpleResult {
  metrics: { label: string; value: string }[];
  chartData: { name: string; value: number }[];
  insight: string;
  sql: string;
}

export default function AnalyzerPage() {
  const [device, setDevice] = useState<string>("All");
  const [timeRange, setTimeRange] = useState<string>("Last 30 Days");
  const [fraudOnly, setFraudOnly] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimpleResult | null>(null);
  const [sqlOpen, setSqlOpen] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setResult(null);
    setSqlOpen(false);

    await new Promise((r) => setTimeout(r, 1000));

    const totalTx = randomBetween(8000, 45000);
    const totalRev = randomBetween(120000, 450000);

    const chartData = DEVICES.map((d) => ({
      name: d,
      value: randomBetween(2000, 15000),
    }));

    const deviceFilter = device !== "All" ? `AND device = '${device}'` : "";
    const fraudFilter = fraudOnly ? "AND is_fraud = TRUE" : "";

    setResult({
      metrics: [
        { label: "Total Transactions", value: new Intl.NumberFormat("en-IN").format(totalTx) },
        { label: "Total Revenue", value: formatINR(totalRev) },
      ],
      chartData,
      insight: fraudOnly
        ? `Fraud transactions account for ${(Math.random() * 5 + 2).toFixed(1)}% of total volume in the ${timeRange.toLowerCase()} window. ${device !== "All" ? `${device} shows a ${(Math.random() * 3 + 1).toFixed(1)}% fraud rate.` : "Android and Web show slightly higher fraud rates than iOS."}`
        : `Transaction volume is steady across the ${timeRange.toLowerCase()} period. ${device !== "All" ? `${device} users contribute ${randomBetween(15, 40)}% of total transactions.` : "Mobile platforms dominate with 68% of all transactions."} Average order value is ${formatINR(randomBetween(350, 1200))}.`,
      sql: `SELECT device, COUNT(*) AS txn_count,\n  SUM(amount) AS revenue\nFROM transactions\nWHERE created_at >= NOW() - INTERVAL '${timeRange === "Last 7 Days" ? "7" : timeRange === "Last 30 Days" ? "30" : "90"} days'\n  ${deviceFilter}\n  ${fraudFilter}\nGROUP BY device\nORDER BY txn_count DESC;`,
    });
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analyzer Tool</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure filters and run analysis on your payment data.
        </p>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label className="text-xs">Device Type</Label>
            <Select value={device} onValueChange={setDevice}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Devices</SelectItem>
                {DEVICES.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Time Range</Label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                <SelectItem value="Last 90 Days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-3 pb-1">
            <div className="flex items-center gap-2">
              <Switch checked={fraudOnly} onCheckedChange={setFraudOnly} id="fraud-toggle" />
              <Label htmlFor="fraud-toggle" className="text-xs">Fraud Only</Label>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <Button onClick={handleRun} disabled={loading} className="gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FlaskConical className="h-4 w-4" />}
            Run Analysis
          </Button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center rounded-xl border border-border bg-card p-12">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Running analysis...</p>
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && result && (
        <div className="space-y-5">
          {/* Metric cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {result.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="mt-1 text-2xl font-bold text-card-foreground">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h4 className="mb-3 text-sm font-semibold text-card-foreground">Transactions by Device</h4>
            <div className="h-56">
              {result.chartData.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                    <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                    <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {result.chartData.map((_, idx) => (
                        <Cell key={`a-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Insight */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <h4 className="text-xs font-semibold text-primary">Insight</h4>
            <p className="mt-1 text-sm leading-relaxed text-foreground">{result.insight}</p>
          </div>

          {/* SQL */}
          <div className="rounded-xl border border-border bg-card">
            <button onClick={() => setSqlOpen(!sqlOpen)} className="flex w-full items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-card-foreground">Generated SQL</span>
                <Badge variant="secondary" className="text-[10px]">Auto-generated</Badge>
              </div>
              {sqlOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </button>
            {sqlOpen && (
              <pre className="border-t border-border bg-secondary/50 px-4 py-3 font-mono text-xs leading-relaxed text-secondary-foreground">
                {result.sql}
              </pre>
            )}
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !result && (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-12">
          <p className="text-sm text-muted-foreground">
            Configure filters above and click Run Analysis to see results.
          </p>
        </div>
      )}
    </div>
  );
}
