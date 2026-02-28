"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const chatMessages = [
  {
    role: "user" as const,
    text: "Are fraud transactions higher on Android during late night hours?",
  },
  {
    role: "ai" as const,
    insights: [
      { label: "Android Fraud Rate", value: "18% higher", color: "text-red-400" },
      { label: "Peak Hours", value: "12am - 3am", color: "text-cyan-500" },
      { label: "Top Region", value: "Maharashtra", color: "text-primary" },
    ],
  },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 lg:flex-row lg:items-center lg:gap-12">
        {/* Left content */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="secondary"
              className="mb-6 gap-1.5 border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary"
            >
              <Sparkles className="h-3 w-3" />
              Built for IIT Bombay Techfest 2026
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Ask Your Data.{" "}
            <span className="text-primary">
              Get Leadership Insights.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            AI-powered analytics assistant for decision-makers in digital
            payments. Turn natural language into strategic insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button
              size="lg"
              className="gap-2 rounded-xl bg-primary px-6 text-primary-foreground hover:bg-primary/90"
              asChild
            >
              <a href="#demo">
                Try Demo
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl border-border px-6"
              asChild
            >
              <a href="#architecture">View Architecture</a>
            </Button>
          </motion.div>
        </div>

        {/* Right: Animated Chat UI */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-lg flex-1"
        >
          <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-xl backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs font-medium text-muted-foreground">
                InsightAI Terminal
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {/* User message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-start gap-3"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
                <div className="rounded-xl rounded-tl-sm bg-secondary px-4 py-3 text-sm text-secondary-foreground">
                  {chatMessages[0].text}
                </div>
              </motion.div>

              {/* AI response */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                className="flex items-start gap-3"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="rounded-xl rounded-tl-sm border border-border bg-card px-4 py-3 text-sm text-card-foreground">
                    Based on the analysis of 2.4M transactions:
                  </div>
                  <div className="grid gap-2">
                    {chatMessages[1].role === "ai" &&
                      chatMessages[1].insights?.map((insight, i) => (
                        <motion.div
                          key={insight.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 1.6 + i * 0.2 }}
                          className="flex items-center justify-between rounded-lg border border-border bg-card/50 px-4 py-2.5"
                        >
                          <span className="text-xs text-muted-foreground">
                            {insight.label}
                          </span>
                          <span className={`text-sm font-semibold ${insight.color}`}>
                            {insight.value}
                          </span>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
