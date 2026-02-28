"use client";

import { motion } from "framer-motion";

const techStack = [
  {
    name: "Next.js",
    description: "React Framework",
    icon: (
      <svg viewBox="0 0 180 180" className="h-8 w-8" fill="none">
        <mask
          id="mask0"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="180"
          height="180"
        >
          <circle cx="90" cy="90" r="90" fill="black" />
        </mask>
        <g mask="url(#mask0)">
          <circle cx="90" cy="90" r="90" fill="currentColor" />
          <path
            d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
            fill="url(#paint0)"
          />
          <rect
            x="115"
            y="54"
            width="12"
            height="72"
            fill="url(#paint1)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0"
            x1="109"
            y1="116.5"
            x2="144.5"
            y2="160.5"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--color-background)" />
            <stop
              offset="1"
              stopColor="var(--color-background)"
              stopOpacity="0"
            />
          </linearGradient>
          <linearGradient
            id="paint1"
            x1="121"
            y1="54"
            x2="120.799"
            y2="106.875"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="var(--color-background)" />
            <stop
              offset="1"
              stopColor="var(--color-background)"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    name: "Vercel",
    description: "Deployment Platform",
    icon: (
      <svg viewBox="0 0 76 65" className="h-7 w-7" fill="currentColor">
        <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
      </svg>
    ),
  },
  {
    name: "OpenAI API",
    description: "Language Model",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    description: "Database",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.336 4.14.403 2.804.775 1.814 1.82.826 2.865.334 4.483.572 6.735c.065.626.16 1.27.29 1.93.393 2.001 1.12 4.326 2.03 5.993.454.834.998 1.557 1.698 1.97.35.206.755.343 1.184.343.343 0 .616-.07.965-.246a5.56 5.56 0 0 0 .382-.22c.122.155.27.293.433.411.453.328.906.474 1.347.542.104.016.23.012.356.006l.005-.001c-.01.285-.003.57.034.86.08.622.267 1.263.712 1.758.466.518 1.13.747 1.96.737a3.14 3.14 0 0 0 .24-.014c1.058-.1 1.748-.546 2.226-1.168.359-.467.574-1.027.732-1.622l.04-.152c.193.038.39.063.591.077.612.044 1.269-.025 1.92-.21a5.87 5.87 0 0 0 .5-.179l.009-.003c.07.389.19.753.39 1.069.386.608.98.89 1.654.998a3.968 3.968 0 0 0 .51.043c.943 0 1.684-.433 2.244-1.012.558-.576.946-1.29 1.216-1.928.152-.36.288-.753.405-1.168a8.42 8.42 0 0 0 .242-1.124c.19-1.276.141-2.684-.023-3.644a3.006 3.006 0 0 0-.055-.259c.352-.465.622-1 .8-1.594.279-.93.262-1.862-.15-2.64a2.928 2.928 0 0 0-1.132-1.156c-.456-.266-1.092-.444-1.879-.317a4.685 4.685 0 0 0-.516.116 10.143 10.143 0 0 0-3.34-2.498A10.087 10.087 0 0 0 17.128 0z" />
      </svg>
    ),
  },
  {
    name: "RAG Pipeline",
    description: "Retrieval System",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    description: "Styling Framework",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
];

export function TechStackSection() {
  return (
    <section id="tech-stack" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tech Stack
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Built with modern, production-grade technologies.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="text-foreground">{tech.icon}</div>
              <div className="text-center">
                <p className="text-sm font-semibold text-card-foreground">
                  {tech.name}
                </p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {tech.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
