"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Loader2,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
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

interface DemoResult {
  sql: string;
  metrics: { label: string; value: string; change?: string }[];
  insight: string;
  chartData: { name: string; value: number }[];
}

const exampleQueries: Record<string, DemoResult> = {
  "Which age group spends most on Food?": {
    sql: `SELECT age_group, SUM(amount) as total_spend\nFROM transactions\nWHERE category = 'Food'\nGROUP BY age_group\nORDER BY total_spend DESC\nLIMIT 5;`,
    metrics: [
      { label: "Top Age Group", value: "26-35", change: "+24%" },
      { label: "Total Spend", value: "$2.4M" },
      { label: "Avg Transaction", value: "$47.80" },
      { label: "Growth Rate", value: "12.3%" },
    ],
    insight:
      "The 26-35 age group dominates Food category spending, accounting for 38% of total food transactions. This demographic shows 24% higher average spend compared to other groups, suggesting targeted marketing opportunities.",
    chartData: [
      { name: "18-25", value: 1200 },
      { name: "26-35", value: 2400 },
      { name: "36-45", value: 1800 },
      { name: "46-55", value: 900 },
      { name: "56+", value: 600 },
    ],
  },
  "Are fraud transactions higher on iOS or Android?": {
    sql: `SELECT device_os, COUNT(*) as fraud_count,\n  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as pct\nFROM transactions\nWHERE is_fraud = true\nGROUP BY device_os\nORDER BY fraud_count DESC;`,
    metrics: [
      { label: "Android Fraud", value: "62.3%", change: "+18%" },
      { label: "iOS Fraud", value: "37.7%" },
      { label: "Total Flagged", value: "14,832" },
      { label: "Avg Amount", value: "$234.50" },
    ],
    insight:
      "Android devices show 18% higher fraud rates compared to iOS. This pattern is most pronounced during late-night hours (12am-3am), with Maharashtra being the most impacted region.",
    chartData: [
      { name: "Android", value: 6230 },
      { name: "iOS", value: 3770 },
      { name: "Web", value: 1200 },
      { name: "Other", value: 800 },
    ],
  },
  "What hour has peak transactions?": {
    sql: `SELECT EXTRACT(HOUR FROM created_at) as hour,\n  COUNT(*) as tx_count,\n  SUM(amount) as total_amount\nFROM transactions\nGROUP BY hour\nORDER BY tx_count DESC\nLIMIT 8;`,
    metrics: [
      { label: "Peak Hour", value: "7 PM", change: "Highest" },
      { label: "Peak Volume", value: "84,200" },
      { label: "Peak Amount", value: "$4.1M" },
      { label: "Avg per Min", value: "1,403" },
    ],
    insight:
      "Transaction volume peaks at 7 PM (19:00), aligning with post-work shopping patterns. A secondary peak occurs at 12 PM during lunch hours. System load should be optimized for these windows.",
    chartData: [
      { name: "6AM", value: 12000 },
      { name: "9AM", value: 34000 },
      { name: "12PM", value: 62000 },
      { name: "3PM", value: 48000 },
      { name: "6PM", value: 71000 },
      { name: "7PM", value: 84200 },
      { name: "9PM", value: 56000 },
      { name: "12AM", value: 23000 },
    ],
  },
};

const queryOptions = Object.keys(exampleQueries);

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

export function DemoSection() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<DemoResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [sqlOpen, setSqlOpen] = useState(false);

  const handleAnalyze = async () => {
    if (!query.trim()) {
      toast.error("Please enter a query to analyze.");
      return;
    }

    setLoading(true);
    setResult(null);
    setSqlOpen(false);

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));

    const matchedKey = queryOptions.find(
      (k) => k.toLowerCase() === query.toLowerCase()
    );
    const res = matchedKey
      ? exampleQueries[matchedKey]
      : exampleQueries[queryOptions[0]];

    setResult(res);
    setLoading(false);
    toast.success("Analysis complete! Insights are ready.");
  };

  return (
    <section id="demo" className="relative py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Try It Yourself
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Ask a business question and see how InsightAI transforms it into
            actionable intelligence.
          </p>
        </motion.div>

        {/* Query selector pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 flex flex-wrap justify-center gap-2"
        >
          {queryOptions.map((q) => (
            <button
              key={q}
              onClick={() => setQuery(q)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-all ${
                query === q
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
              }`}
            >
              {q}
            </button>
          ))}
        </motion.div>

        {/* Input area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex gap-3"
        >
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question about your payment data..."
            className="h-12 rounded-xl border-border bg-card text-sm"
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          />
          <Button
            onClick={handleAnalyze}
            disabled={loading}
            size="lg"
            className="h-12 shrink-0 gap-2 rounded-xl bg-primary px-6 text-primary-foreground hover:bg-primary/90"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            Analyze
          </Button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mt-8 space-y-6"
            >
              {/* SQL Query (collapsible) */}
              <div className="rounded-2xl border border-border bg-card shadow-sm">
                <button
                  onClick={() => setSqlOpen(!sqlOpen)}
                  className="flex w-full items-center justify-between px-6 py-4"
                >
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-card-foreground">
                      Generated SQL Query
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-[10px] text-muted-foreground"
                    >
                      Auto-generated
                    </Badge>
                  </div>
                  {sqlOpen ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
                <AnimatePresence>
                  {sqlOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <pre className="border-t border-border bg-secondary/50 px-6 py-4 font-mono text-xs leading-relaxed text-secondary-foreground">
                        {result.sql}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Metric cards */}
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {result.metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="rounded-2xl border border-border bg-card p-4 shadow-sm"
                  >
                    <p className="text-xs text-muted-foreground">
                      {metric.label}
                    </p>
                    <p className="mt-1 text-2xl font-bold text-card-foreground">
                      {metric.value}
                    </p>
                    {metric.change && (
                      <p className="mt-0.5 text-xs font-medium text-primary">
                        {metric.change}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Chart */}
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold text-card-foreground">
                  Data Visualization
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={result.chartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="oklch(0.5 0 0 / 0.1)"
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        stroke="oklch(0.5 0 0 / 0.4)"
                      />
                      <YAxis
                        tick={{ fontSize: 12 }}
                        stroke="oklch(0.5 0 0 / 0.4)"
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "12px",
                          border: "1px solid oklch(0.5 0 0 / 0.1)",
                          fontSize: "12px",
                        }}
                      />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {result.chartData.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Insight summary */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
                <h3 className="text-sm font-semibold text-primary">
                  Leadership Insight
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground">
                  {result.insight}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
