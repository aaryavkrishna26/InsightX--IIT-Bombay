export function SolutionSection() {
  return (
    <section id="solution" className="py-10">
      <div className="border-t border-border pt-10">
        <h2 className="font-serif text-2xl font-normal text-foreground">
          Our Approach
        </h2>

        <p className="mt-6 text-[15px] leading-relaxed text-foreground/85">
          InsightAI bridges the gap between business questions and data
          answers through a six-step pipeline:
        </p>

        <ol className="mt-5 space-y-3 text-[15px] leading-relaxed text-foreground/85">
          <li className="flex gap-3">
            <span className="shrink-0 text-muted-foreground">1.</span>
            <span>
              <strong className="font-medium text-foreground">Natural language input</strong>{" "}
              -- The user types a question in plain English.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 text-muted-foreground">2.</span>
            <span>
              <strong className="font-medium text-foreground">Semantic parsing</strong>{" "}
              -- The AI layer interprets intent, entities, and context from the query.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 text-muted-foreground">3.</span>
            <span>
              <strong className="font-medium text-foreground">RAG schema lookup</strong>{" "}
              -- A retrieval-augmented generation step maps the query to the correct database tables and columns.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 text-muted-foreground">4.</span>
            <span>
              <strong className="font-medium text-foreground">SQL generation</strong>{" "}
              -- The system produces an optimized SQL query.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 text-muted-foreground">5.</span>
            <span>
              <strong className="font-medium text-foreground">Aggregation and analysis</strong>{" "}
              -- Query results are processed, patterns identified, and metrics computed.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 text-muted-foreground">6.</span>
            <span>
              <strong className="font-medium text-foreground">Insight generation</strong>{" "}
              -- The output is translated into business-readable language with charts and recommendations.
            </span>
          </li>
        </ol>
      </div>
    </section>
  );
}
