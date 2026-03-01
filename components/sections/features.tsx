const features = [
  {
    title: "Natural Language to SQL",
    desc: "Converts plain English questions into optimized SQL queries automatically.",
  },
  {
    title: "Fraud Pattern Detection",
    desc: "Identifies anomalous transaction patterns across devices, regions, and time windows.",
  },
  {
    title: "Time-based Trend Analysis",
    desc: "Analyzes transaction volumes and patterns across hours, days, and seasons.",
  },
  {
    title: "Device-wise Comparison",
    desc: "Compares metrics across Android, iOS, and web platforms.",
  },
  {
    title: "Demographic Insights",
    desc: "Breaks down spending patterns by age group and merchant category.",
  },
  {
    title: "Leadership Summary Mode",
    desc: "Generates executive-ready summaries with key takeaways and recommendations.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-10">
      <div className="border-t border-border pt-10">
        <h2 className="font-serif text-2xl font-normal text-foreground">
          Features
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-5 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.title}>
              <h3 className="text-sm font-medium text-foreground">
                {f.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
