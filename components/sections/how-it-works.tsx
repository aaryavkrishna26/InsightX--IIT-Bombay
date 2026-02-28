"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Brain,
  BookOpen,
  Database,
  BarChart3,
  Lightbulb,
} from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Ask in Plain English",
    description: "User asks a business question in natural language.",
  },
  {
    icon: Brain,
    title: "Semantic Understanding",
    description: "AI interprets the intent and context of the query.",
  },
  {
    icon: BookOpen,
    title: "RAG Schema Lookup",
    description: "Retrieval-augmented generation connects to the schema guide.",
  },
  {
    icon: Database,
    title: "SQL Generation",
    description: "Natural language is converted into optimized SQL queries.",
  },
  {
    icon: BarChart3,
    title: "Aggregation & Analysis",
    description: "Data is aggregated and patterns are analyzed.",
  },
  {
    icon: Lightbulb,
    title: "Business Insight",
    description: "Results translated into actionable business language.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-0 h-[300px] w-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From natural language to actionable insights in six seamless steps.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-1 text-xs font-semibold text-primary">
                Step {i + 1}
              </div>
              <div className="mt-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-card-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
