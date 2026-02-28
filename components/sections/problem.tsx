"use client";

import { motion } from "framer-motion";
import { DatabaseZap, BarChart3, Clock } from "lucide-react";

const problems = [
  {
    icon: DatabaseZap,
    title: "Dependence on SQL Teams",
    description:
      "Leaders wait days for data teams to write queries and generate reports.",
  },
  {
    icon: BarChart3,
    title: "Static Dashboards",
    description:
      "Pre-built dashboards can't answer new or unexpected business questions.",
  },
  {
    icon: Clock,
    title: "Delayed Decision-Making",
    description:
      "Critical decisions get postponed due to slow data turnaround times.",
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Leadership Struggles with Data
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Traditional data workflows create bottlenecks that slow down
            strategic decision-making.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-destructive/30 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
                <problem.icon className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                {problem.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center"
        >
          <p className="text-lg font-medium text-foreground">
            Our system removes technical barriers and turns natural language into
            strategic insights.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
