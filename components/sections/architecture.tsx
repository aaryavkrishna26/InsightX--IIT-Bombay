"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  Brain,
  Database,
  BarChart3,
  Lightbulb,
  ArrowDown,
} from "lucide-react";

const layers = [
  {
    icon: Monitor,
    title: "Frontend",
    subtitle: "Next.js + Tailwind",
    description: "Interactive user interface for natural language queries",
  },
  {
    icon: Brain,
    title: "AI Layer",
    subtitle: "Semantic + RAG",
    description: "Intent recognition and retrieval-augmented generation",
  },
  {
    icon: Database,
    title: "Query Engine",
    subtitle: "SQL Generator",
    description: "Converts understood intent into optimized SQL queries",
  },
  {
    icon: BarChart3,
    title: "Analytics Engine",
    subtitle: "Aggregation Pipeline",
    description: "Processes query results and identifies patterns",
  },
  {
    icon: Lightbulb,
    title: "Insight Generator",
    subtitle: "Business Language",
    description: "Translates analysis into executive-ready insights",
  },
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="relative py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            System Architecture
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A five-layer pipeline that transforms natural language into
            leadership intelligence.
          </p>
        </motion.div>

        <div className="mt-16 flex flex-col items-center gap-0">
          {layers.map((layer, i) => (
            <div key={layer.title} className="flex w-full flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                whileHover={{ scale: 1.02 }}
                className="w-full max-w-lg rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <layer.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-card-foreground">
                        {layer.title}
                      </h3>
                      <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {layer.subtitle}
                      </span>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {layer.description}
                    </p>
                  </div>
                </div>
              </motion.div>

              {i < layers.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.12 + 0.1 }}
                  className="flex h-8 items-center"
                >
                  <ArrowDown className="h-4 w-4 text-primary/40" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
