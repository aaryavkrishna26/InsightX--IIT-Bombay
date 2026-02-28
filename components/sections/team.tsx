"use client";

import { motion } from "framer-motion";
import { Mail, Hash, User } from "lucide-react";

export function TeamSection() {
  return (
    <section id="team" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Meet the Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            The minds behind InsightAI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mt-12 max-w-md"
        >
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <User className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mt-5 text-xl font-bold text-card-foreground">
              Yuvraj Dwivedi
            </h3>
            <p className="mt-1 text-sm font-medium text-primary">
              Team Leader
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Hash className="h-4 w-4 text-primary/60" />
                <span>Team ID: insi-250499</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary/60" />
                <a
                  href="mailto:yuvrajdwivedi18@gmail.com"
                  className="transition-colors hover:text-foreground"
                >
                  yuvrajdwivedi18@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
