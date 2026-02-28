import { NextRequest, NextResponse } from "next/server";

const mockResponses: Record<
  string,
  {
    sql: string;
    metrics: { label: string; value: string; change?: string }[];
    insight: string;
    chartData: { name: string; value: number }[];
  }
> = {
  food: {
    sql: `SELECT age_group, SUM(amount) as total_spend FROM transactions WHERE category = 'Food' GROUP BY age_group ORDER BY total_spend DESC LIMIT 5;`,
    metrics: [
      { label: "Top Age Group", value: "26-35", change: "+24%" },
      { label: "Total Spend", value: "$2.4M" },
      { label: "Avg Transaction", value: "$47.80" },
      { label: "Growth Rate", value: "12.3%" },
    ],
    insight:
      "The 26-35 age group dominates Food category spending, accounting for 38% of total food transactions.",
    chartData: [
      { name: "18-25", value: 1200 },
      { name: "26-35", value: 2400 },
      { name: "36-45", value: 1800 },
      { name: "46-55", value: 900 },
      { name: "56+", value: 600 },
    ],
  },
  fraud: {
    sql: `SELECT device_os, COUNT(*) as fraud_count FROM transactions WHERE is_fraud = true GROUP BY device_os ORDER BY fraud_count DESC;`,
    metrics: [
      { label: "Android Fraud", value: "62.3%", change: "+18%" },
      { label: "iOS Fraud", value: "37.7%" },
      { label: "Total Flagged", value: "14,832" },
      { label: "Avg Amount", value: "$234.50" },
    ],
    insight:
      "Android devices show 18% higher fraud rates compared to iOS, especially during late-night hours.",
    chartData: [
      { name: "Android", value: 6230 },
      { name: "iOS", value: 3770 },
      { name: "Web", value: 1200 },
      { name: "Other", value: 800 },
    ],
  },
  peak: {
    sql: `SELECT EXTRACT(HOUR FROM created_at) as hour, COUNT(*) as tx_count FROM transactions GROUP BY hour ORDER BY tx_count DESC LIMIT 8;`,
    metrics: [
      { label: "Peak Hour", value: "7 PM", change: "Highest" },
      { label: "Peak Volume", value: "84,200" },
      { label: "Peak Amount", value: "$4.1M" },
      { label: "Avg per Min", value: "1,403" },
    ],
    insight:
      "Transaction volume peaks at 7 PM, aligning with post-work shopping patterns.",
    chartData: [
      { name: "6AM", value: 12000 },
      { name: "9AM", value: 34000 },
      { name: "12PM", value: 62000 },
      { name: "3PM", value: 48000 },
      { name: "7PM", value: 84200 },
      { name: "9PM", value: 56000 },
    ],
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const query = (body.query || "").toLowerCase();

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    let response = mockResponses.peak;
    if (query.includes("food") || query.includes("age")) {
      response = mockResponses.food;
    } else if (query.includes("fraud") || query.includes("android") || query.includes("ios")) {
      response = mockResponses.fraud;
    }

    return NextResponse.json({ success: true, data: response });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
