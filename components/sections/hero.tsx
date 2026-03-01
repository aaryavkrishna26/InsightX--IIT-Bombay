export function IntroSection() {
  return (
    <section id="overview" className="pt-12 pb-10">
      <h1 className="font-serif text-3xl font-normal leading-tight text-foreground sm:text-4xl">
        InsightAI
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Leadership Intelligence Assistant for Digital Payments
      </p>

      <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-foreground/85">
        <p>
          InsightAI is an AI-powered analytics tool that lets business
          leaders ask questions about payment transaction data in plain
          English. The system interprets the query, generates the
          appropriate SQL, runs it against the database, and returns
          results as leadership-ready insights -- charts, summaries,
          and actionable recommendations.
        </p>
        <p>
          This project was built for the IIT Bombay Techfest 2026
          problem statement on designing an intelligent assistant for
          decision-makers in the digital payments space. The goal is to
          remove technical barriers between leadership and data.
        </p>
      </div>

      <div className="mt-6 flex gap-4 text-xs text-muted-foreground">
        <span>Team ID: insi-250499</span>
        <span className="text-border">|</span>
        <span>IIT Bombay Techfest 2026</span>
      </div>
    </section>
  );
}
