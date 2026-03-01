"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DemoResult {
  sql: string;
  insight: string;
  chartData: { name: string; value: number }[];
}

const exampleQueries: Record<string, DemoResult> = {
  "Which age group spends most on Food?": {
    sql: `SELECT age_group, SUM(amount) as total_spend
FROM transactions
WHERE category = 'Food'
GROUP BY age_group
ORDER BY total_spend DESC
LIMIT 5;`,
    insight:
      "The 26-35 age group accounts for 38% of total food spending, with an average transaction value 24% higher than other groups. This suggests targeted promotional opportunities for this demographic.",
    chartData: [
      { name: "18-25", value: 1200 },
      { name: "26-35", value: 2400 },
      { name: "36-45", value: 1800 },
      { name: "46-55", value: 900 },
      { name: "56+", value: 600 },
    ],
  },
  "Are fraud transactions higher on Android?": {
    sql: `SELECT device_os,
  COUNT(*) as fraud_count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 2) as pct
FROM transactions
WHERE is_fraud = true
GROUP BY device_os
ORDER BY fraud_count DESC;`,
    insight:
      "Android devices show 18% higher fraud rates compared to iOS. This pattern is most pronounced between 12am and 3am, with Maharashtra being the most impacted region.",
    chartData: [
      { name: "Android", value: 6230 },
      { name: "iOS", value: 3770 },
      { name: "Web", value: 1200 },
      { name: "Other", value: 800 },
    ],
  },
  "What hour has peak transactions?": {
    sql: `SELECT EXTRACT(HOUR FROM created_at) as hour,
  COUNT(*) as tx_count
FROM transactions
GROUP BY hour
ORDER BY tx_count DESC
LIMIT 8;`,
    insight:
      "Transaction volume peaks at 7 PM, aligning with post-work shopping patterns. A secondary peak at 12 PM corresponds to lunch-hour activity. Infrastructure load should be planned for these windows.",
    chartData: [
      { name: "6 AM", value: 12000 },
      { name: "9 AM", value: 34000 },
      { name: "12 PM", value: 62000 },
      { name: "3 PM", value: 48000 },
      { name: "6 PM", value: 71000 },
      { name: "7 PM", value: 84200 },
      { name: "9 PM", value: 56000 },
      { name: "12 AM", value: 23000 },
    ],
  },
};

const queryOptions = Object.keys(exampleQueries);

export function DemoSection() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<DemoResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResult(null);

    await new Promise((r) => setTimeout(r, 800));

    const matched = queryOptions.find(
      (k) => k.toLowerCase() === query.toLowerCase()
    );
    setResult(matched ? exampleQueries[matched] : exampleQueries[queryOptions[0]]);
    setLoading(false);
  };

  return (
    <section id="demo" className="py-10">
      <div className="border-t border-border pt-10">
        <h2 className="font-serif text-2xl font-normal text-foreground">
          Demo
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
          Select a sample question or type your own to see how the
          system generates SQL and returns insights.
        </p>

        {/* Example query links */}
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1">
          {queryOptions.map((q) => (
            <button
              key={q}
              onClick={() => setQuery(q)}
              className={`text-[13px] transition-colors ${
                query === q
                  ? "text-foreground underline underline-offset-4"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            placeholder="Type a question..."
            className="flex-1 border-b border-border bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-foreground focus:outline-none"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !query.trim()}
            className="shrink-0 border-b border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          >
            {loading ? "Analyzing..." : "Run"}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="mt-8 space-y-6">
            {/* SQL output */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Generated SQL
              </h3>
              <pre className="mt-2 overflow-x-auto border border-border bg-secondary/50 p-4 font-mono text-xs leading-relaxed text-foreground/90">
                {result.sql}
              </pre>
            </div>

            {/* Chart */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Result
              </h3>
              <div className="mt-2 h-56 border border-border p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="oklch(0.5 0 0 / 0.08)"
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 11 }}
                      stroke="oklch(0.5 0 0 / 0.3)"
                    />
                    <YAxis
                      tick={{ fontSize: 11 }}
                      stroke="oklch(0.5 0 0 / 0.3)"
                    />
                    <Tooltip
                      contentStyle={{
                        fontSize: "12px",
                        border: "1px solid oklch(0.5 0 0 / 0.15)",
                        borderRadius: "4px",
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="oklch(0.35 0.05 250)"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Insight */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Insight
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-foreground/85">
                {result.insight}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
