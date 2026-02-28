"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Terminal,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ALL_QUESTIONS,
  QUESTION_CATEGORIES,
  generateAnalysisResult,
} from "@/lib/mock-data";
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
  "oklch(0.60 0.20 280)",
  "oklch(0.50 0.15 270)",
  "oklch(0.75 0.10 195)",
  "oklch(0.40 0.15 270)",
];

interface AnalysisResult {
  sql: string;
  metrics: { label: string; value: string; change?: string }[];
  insight: string;
  chartData: { name: string; value: number }[];
}

export default function QuestionBankPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [sqlOpen, setSqlOpen] = useState(false);

  const filteredQuestions = useMemo(() => {
    return ALL_QUESTIONS.filter((q) => {
      const matchSearch =
        search === "" ||
        q.question.toLowerCase().includes(search.toLowerCase());
      const matchCategory =
        activeCategory === "All" || q.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [search, activeCategory]);

  const handleQuestionClick = async (question: string) => {
    setSelectedQuestion(question);
    setLoading(true);
    setResult(null);
    setSqlOpen(false);

    await new Promise((r) => setTimeout(r, 1200));
    const analysis = generateAnalysisResult(question);
    setResult(analysis);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Question Bank</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {ALL_QUESTIONS.length} curated business analytics questions. Click any
          question to run an instant analysis.
        </p>
      </div>

      {/* Search + Category Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="h-10 rounded-xl pl-9"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("All")}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
            activeCategory === "All"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-card text-muted-foreground hover:border-primary/30"
          }`}
        >
          All ({ALL_QUESTIONS.length})
        </button>
        {QUESTION_CATEGORIES.map((cat) => {
          const count = ALL_QUESTIONS.filter((q) => q.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/30"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Question List */}
        <div className="space-y-2 max-h-[600px] overflow-y-auto rounded-2xl border border-border bg-card p-4">
          {filteredQuestions.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No questions match your search.
            </p>
          ) : (
            filteredQuestions.map((q, i) => (
              <motion.button
                key={q.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: Math.min(i * 0.02, 0.5) }}
                onClick={() => handleQuestionClick(q.question)}
                className={`flex w-full items-start gap-3 rounded-xl px-4 py-3 text-left text-sm transition-all ${
                  selectedQuestion === q.question
                    ? "bg-primary/10 text-primary"
                    : "text-card-foreground hover:bg-secondary"
                }`}
              >
                <span className="mt-0.5 shrink-0 text-xs font-mono text-muted-foreground">
                  {String(q.id).padStart(3, "0")}
                </span>
                <div className="flex-1">
                  <span className="font-medium">{q.question}</span>
                  <Badge variant="secondary" className="ml-2 text-[10px]">
                    {q.category}
                  </Badge>
                </div>
                <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-primary/40" />
              </motion.button>
            ))
          )}
        </div>

        {/* Analysis Result */}
        <div className="space-y-4">
          {loading && (
            <div className="flex items-center justify-center rounded-2xl border border-border bg-card p-16">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  Analyzing query...
                </p>
              </div>
            </div>
          )}

          {!loading && !result && (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 p-16">
              <div className="flex flex-col items-center gap-3 text-center">
                <Search className="h-8 w-8 text-muted-foreground/50" />
                <p className="text-sm text-muted-foreground">
                  Select a question from the list to see instant analysis
                  results.
                </p>
              </div>
            </div>
          )}

          <AnimatePresence>
            {!loading && result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Selected question */}
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-sm font-semibold text-primary">
                    {selectedQuestion}
                  </p>
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-2 gap-3">
                  {result.metrics.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.08 }}
                      className="rounded-xl border border-border bg-card p-3 shadow-sm"
                    >
                      <p className="text-[11px] text-muted-foreground">
                        {m.label}
                      </p>
                      <p className="mt-0.5 text-xl font-bold text-card-foreground">
                        {m.value}
                      </p>
                      {m.change && (
                        <p className="text-[11px] font-medium text-primary">
                          {m.change}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Chart */}
                {result.chartData.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <h4 className="mb-3 text-xs font-semibold text-card-foreground">
                      Visualization
                    </h4>
                    <div className="h-52">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={result.chartData}>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="oklch(0.5 0 0 / 0.1)"
                          />
                          <XAxis
                            dataKey="name"
                            tick={{ fontSize: 10 }}
                            stroke="oklch(0.5 0 0 / 0.4)"
                          />
                          <YAxis
                            tick={{ fontSize: 10 }}
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
                            {result.chartData.map((_, idx) => (
                              <Cell
                                key={`q-${idx}`}
                                fill={CHART_COLORS[idx % CHART_COLORS.length]}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* SQL */}
                <div className="rounded-2xl border border-border bg-card shadow-sm">
                  <button
                    onClick={() => setSqlOpen(!sqlOpen)}
                    className="flex w-full items-center justify-between px-4 py-3"
                  >
                    <div className="flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-primary" />
                      <span className="text-xs font-medium text-card-foreground">
                        Generated SQL
                      </span>
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
                        className="overflow-hidden"
                      >
                        <pre className="border-t border-border bg-secondary/50 px-4 py-3 font-mono text-xs leading-relaxed text-secondary-foreground">
                          {result.sql}
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Insight */}
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                  <h4 className="text-xs font-semibold text-primary">
                    Leadership Insight
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                    {result.insight}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
