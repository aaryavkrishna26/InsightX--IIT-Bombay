"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    question: "Is the data modified or written back?",
    answer:
      "No. All data operations are read-only. InsightAI only queries the database for analysis and never modifies, inserts, or deletes any records.",
  },
  {
    question: "What datasets does this support?",
    answer:
      "The current version is designed to work exclusively on digital payment transaction datasets. It understands schemas related to transactions, users, devices, and merchant categories.",
  },
  {
    question: "Does it provide predictive analytics?",
    answer:
      "No. InsightAI focuses on descriptive and diagnostic analytics. It provides insights based on existing data patterns but does not make predictive guarantees or forecasts.",
  },
  {
    question: "How does it handle vague or ambiguous queries?",
    answer:
      "When a query is ambiguous, the system uses clarification prompts to narrow down intent. It leverages semantic understanding and the RAG pipeline to interpret the most likely meaning.",
  },
];

export function AssumptionsSection() {
  return (
    <section id="assumptions" className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Assumptions & Scope
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Key boundaries and design decisions that shape the system.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-sm font-medium text-card-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
