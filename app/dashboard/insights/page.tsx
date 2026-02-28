"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  TrendingUp,
  ShieldAlert,
  Users,
  Smartphone,
  MapPin,
  Clock,
  DollarSign,
} from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    title: "Revenue Growing 12% MoM",
    description:
      "Consistent month-over-month growth driven primarily by Food and Electronics categories. Q4 projections indicate crossing the $15M mark. Recommend increasing marketing budget for top-performing categories.",
    priority: "High",
  },
  {
    icon: ShieldAlert,
    title: "Fraud Hotspot: Maharashtra Late-Night",
    description:
      "62% of fraudulent transactions originate from Android devices between 12AM-3AM in the Maharashtra region. Implementing geo-time based risk scoring could reduce fraud by 40% without impacting legitimate transactions.",
    priority: "Critical",
  },
  {
    icon: Users,
    title: "26-35 Age Group: Highest LTV",
    description:
      "Users aged 26-35 account for 38% of total spending and show 24% higher average order values. This segment has 72% retention rate. Targeted loyalty programs could increase ARPU by an estimated 15%.",
    priority: "High",
  },
  {
    icon: Smartphone,
    title: "iOS Users Spend 22% More",
    description:
      "Despite Android having higher transaction volume (45% vs 33%), iOS users demonstrate 22% higher average order values. Consider premium feature targeting for iOS users to capitalize on higher spending patterns.",
    priority: "Medium",
  },
  {
    icon: Clock,
    title: "7 PM Peak Window Optimization",
    description:
      "Peak transaction volume occurs at 7 PM with 84,200+ transactions per hour. Secondary peak at 12 PM. Auto-scaling infrastructure during these windows could save 18% on compute costs while improving response times.",
    priority: "Medium",
  },
  {
    icon: MapPin,
    title: "Tier-2 Cities Emerging Markets",
    description:
      "Transaction volume from tier-2 cities has grown 45% in the last quarter. Rajasthan and Telangana show the highest growth rates. Early investment in regional language support could capture untapped market potential.",
    priority: "High",
  },
  {
    icon: DollarSign,
    title: "UPI Dominates Payment Mix",
    description:
      "UPI accounts for 58% of all successful transactions, growing 8% monthly. Credit card usage is declining among younger demographics. Offering UPI-exclusive rewards could boost engagement by 20%.",
    priority: "Medium",
  },
  {
    icon: Lightbulb,
    title: "Cross-sell Opportunity: Food + Grocery",
    description:
      "Users who purchase in the Food category have a 3.2x higher probability of purchasing Grocery items within 48 hours. Implementing smart bundling recommendations could increase basket size by 25%.",
    priority: "High",
  },
];

const priorityColors: Record<string, string> = {
  Critical: "bg-red-500/10 text-red-500 border-red-500/20",
  High: "bg-primary/10 text-primary border-primary/20",
  Medium: "bg-accent/10 text-accent border-accent/20",
};

export default function InsightsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Leadership Insights
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          AI-generated strategic insights from your transaction data for
          executive decision-making.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <insight.icon className="h-5 w-5 text-primary" />
              </div>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${
                  priorityColors[insight.priority] || ""
                }`}
              >
                {insight.priority}
              </span>
            </div>
            <h3 className="mt-4 text-base font-semibold text-card-foreground">
              {insight.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {insight.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
