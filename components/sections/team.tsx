"use client";

import { motion } from "framer-motion";
import { Mail, Hash, User } from "lucide-react";

const teamMembers = [
  {
    name: "Yuvraj Dwivedi",
    email: "yuvrajdwivedi18@gmail.com",
  },
  {
    name: "Aaryav Krishna",
    email: "aaryavkrishna26@gmail.com",
  },
];

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
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Hash className="h-4 w-4 text-primary/60" />
            <span>Team ID: insi-250499</span>
          </div>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-card-foreground">
                {member.name}
              </h3>
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary/60" />
                <a
                  href={`mailto:${member.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {member.email}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
