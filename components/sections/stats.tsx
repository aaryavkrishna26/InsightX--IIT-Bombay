"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "Queries Processed", target: 2400000, suffix: "+", prefix: "" },
  { label: "Avg Response Time", target: 1.2, suffix: "s", prefix: "" },
  { label: "Accuracy Rate", target: 96.8, suffix: "%", prefix: "" },
  { label: "Active Datasets", target: 12, suffix: "", prefix: "" },
];

function AnimatedCounter({
  target,
  suffix,
  prefix,
}: {
  target: number;
  suffix: string;
  prefix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [target]);

  const formatNumber = (n: number) => {
    if (target >= 1000000) return (n / 1000000).toFixed(1) + "M";
    if (target >= 1000) return (n / 1000).toFixed(0) + "K";
    if (target < 100 && target % 1 !== 0) return n.toFixed(1);
    return Math.round(n).toString();
  };

  return (
    <div ref={ref} className="text-3xl font-bold text-foreground sm:text-4xl">
      {prefix}
      {formatNumber(count)}
      {suffix}
    </div>
  );
}

export function StatsSection() {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 gap-8 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter
                target={stat.target}
                suffix={stat.suffix}
                prefix={stat.prefix}
              />
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
