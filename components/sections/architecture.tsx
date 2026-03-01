const layers = [
  {
    label: "Frontend",
    tech: "Next.js + Tailwind CSS",
    desc: "User interface for natural language input and result display",
  },
  {
    label: "AI Layer",
    tech: "Semantic Parsing + RAG",
    desc: "Intent recognition and schema-aware retrieval",
  },
  {
    label: "Query Engine",
    tech: "SQL Generator",
    desc: "Converts parsed intent into optimized SQL queries",
  },
  {
    label: "Analytics Engine",
    tech: "Aggregation Pipeline",
    desc: "Processes results and identifies patterns",
  },
  {
    label: "Insight Generator",
    tech: "Business Language Output",
    desc: "Translates data into executive-ready summaries",
  },
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-10">
      <div className="border-t border-border pt-10">
        <h2 className="font-serif text-2xl font-normal text-foreground">
          System Architecture
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
          The system is organized as a five-layer pipeline. Each layer
          handles one stage of the query-to-insight transformation.
        </p>

        <div className="mt-8 flex flex-col items-center gap-0">
          {layers.map((layer, i) => (
            <div key={layer.label} className="flex w-full max-w-md flex-col items-center">
              <div className="w-full border border-border bg-background px-5 py-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {layer.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {layer.tech}
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {layer.desc}
                </p>
              </div>
              {i < layers.length - 1 && (
                <div className="flex h-5 items-center">
                  <div className="h-5 w-px bg-border" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
