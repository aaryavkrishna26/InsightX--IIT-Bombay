export function ProblemSection() {
  return (
    <section id="problem" className="py-10">
      <div className="border-t border-border pt-10">
        <h2 className="font-serif text-2xl font-normal text-foreground">
          Problem Statement
        </h2>

        <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-foreground/85">
          <p>
            In most digital payment companies, business leaders depend
            heavily on data engineering teams to write SQL queries,
            build dashboards, and generate reports. This creates a
            bottleneck: a question that takes seconds to ask can take
            days to get answered.
          </p>
          <p>
            Pre-built dashboards are limited to predefined views. When
            a new question arises -- say, &ldquo;Are fraud rates higher
            on Android devices during late-night hours in
            Maharashtra?&rdquo; -- there is often no existing report
            that answers it. The leader must file a request, wait for a
            query to be written, validated, and run, and then interpret
            raw numbers without business context.
          </p>
          <p>
            This delay in data access directly impacts the speed and
            quality of strategic decision-making. The gap between
            having a question and getting an answer is where
            opportunities are lost.
          </p>
        </div>
      </div>
    </section>
  );
}
