"use client";

import { motion } from "framer-motion";
import {
  MessageSquareCode,
  Shield,
  TrendingUp,
  Smartphone,
  Users,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: MessageSquareCode,
    title: "Natural Language to SQL",
    description:
      "Convert plain English questions into optimized SQL queries automatically.",
  },
  {
    icon: Shield,
    title: "Fraud Pattern Detection",
    description:
      "Identify anomalous transaction patterns across devices, regions, and time.",
  },
  {
    icon: TrendingUp,
    title: "Time-based Trend Analysis",
    description:
      "Analyze transaction volumes and patterns across hours, days, and seasons.",
  },
  {
    icon: Smartphone,
    title: "Device-wise Comparison",
    description:
      "Compare metrics across Android, iOS, and web platforms instantly.",
  },
  {
    icon: Users,
    title: "Age & Category Insights",
    description:
      "Breakdown spending patterns by demographics and merchant categories.",
  },
  {
    icon: FileText,
    title: "Leadership Summary Mode",
    description:
      "Get executive-ready summaries with key takeaways and recommendations.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[300px] w-[400px] rounded-full bg-primary/5 blur-[100px]" />
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
            Powerful Features
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Everything leadership needs to make data-driven decisions without
            writing a single line of code.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-card-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
