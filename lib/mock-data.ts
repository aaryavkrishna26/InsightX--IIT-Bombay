// ── Shared mock data for the entire dashboard ──

export const CATEGORIES = ["Food", "Electronics", "Fashion", "Travel", "Grocery", "Entertainment", "Health", "Education"] as const;
export const DEVICES = ["Android", "iOS", "Web", "Desktop"] as const;
export const REGIONS = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan", "West Bengal", "Telangana", "Uttar Pradesh", "Kerala"] as const;
export const AGE_GROUPS = ["18-25", "26-35", "36-45", "46-55", "56+"] as const;
export const PAYMENT_METHODS = ["UPI", "Credit Card", "Debit Card", "Net Banking", "Wallet"] as const;

// ── INR Formatter ──
const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const inrFormatterDecimals = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

export function formatINR(amount: number, decimals = false): string {
  return decimals ? inrFormatterDecimals.format(amount) : inrFormatter.format(amount);
}

export function formatINRCompact(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
}

export function randomFrom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateOrderId() {
  return `ORD-${Date.now().toString(36).toUpperCase()}-${randomBetween(100, 999)}`;
}

export function generateUserId() {
  return `USR-${randomBetween(10000, 99999)}`;
}

export interface Order {
  orderId: string;
  userId: string;
  device: (typeof DEVICES)[number];
  category: (typeof CATEGORIES)[number];
  amount: number;
  location: (typeof REGIONS)[number];
  timestamp: string;
  isFraud: boolean;
  paymentMethod: (typeof PAYMENT_METHODS)[number];
  ageGroup: (typeof AGE_GROUPS)[number];
  items: { name: string; qty: number; price: number }[];
}

const ITEM_NAMES: Record<string, string[]> = {
  Food: ["Pizza", "Burger", "Sushi", "Pasta", "Biryani", "Salad"],
  Electronics: ["Headphones", "Charger", "Case", "Cable", "Mouse", "Keyboard"],
  Fashion: ["T-Shirt", "Jeans", "Sneakers", "Watch", "Bag", "Sunglasses"],
  Travel: ["Flight", "Hotel", "Cab", "Bus Ticket", "Train Ticket"],
  Grocery: ["Rice", "Dal", "Milk", "Bread", "Eggs", "Vegetables"],
  Entertainment: ["Movie Ticket", "Game Pass", "Subscription", "Concert Ticket"],
  Health: ["Vitamins", "Protein", "Mask", "Sanitizer", "Medicine"],
  Education: ["Course", "Book", "Subscription", "Stationery"],
};

export function generateOrder(): Order {
  const category = randomFrom(CATEGORIES);
  const isFraud = Math.random() < 0.08;
  const numItems = randomBetween(1, 4);
  const items: { name: string; qty: number; price: number }[] = [];
  let totalAmount = 0;
  for (let i = 0; i < numItems; i++) {
    const name = randomFrom(ITEM_NAMES[category] || ["Item"]);
    const qty = randomBetween(1, 3);
    const price = randomBetween(25, 1000);
    items.push({ name, qty, price });
    totalAmount += qty * price;
  }
  return {
    orderId: generateOrderId(),
    userId: generateUserId(),
    device: randomFrom(DEVICES),
    category,
    amount: totalAmount,
    location: randomFrom(REGIONS),
    timestamp: new Date().toISOString(),
    isFraud,
    paymentMethod: randomFrom(PAYMENT_METHODS),
    ageGroup: randomFrom(AGE_GROUPS),
    items,
  };
}

export function generateUserHistory(userId: string) {
  const orderCount = randomBetween(12, 50);
  const orders: Order[] = [];
  for (let i = 0; i < orderCount; i++) {
    const order = generateOrder();
    order.userId = userId;
    const d = new Date();
    d.setDate(d.getDate() - randomBetween(0, 365));
    order.timestamp = d.toISOString();
    orders.push(order);
  }
  orders.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const totalSpend = orders.reduce((s, o) => s + o.amount, 0);
  const avgOrder = Math.round(totalSpend / orders.length);
  const catCounts: Record<string, number> = {};
  const deviceCounts: Record<string, number> = {};
  let fraudCount = 0;
  orders.forEach((o) => {
    catCounts[o.category] = (catCounts[o.category] || 0) + 1;
    deviceCounts[o.device] = (deviceCounts[o.device] || 0) + 1;
    if (o.isFraud) fraudCount++;
  });
  const topCategory = Object.entries(catCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  const topDevice = Object.entries(deviceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  // Monthly spending
  const monthlyMap: Record<string, number> = {};
  orders.forEach((o) => {
    const m = new Date(o.timestamp).toLocaleString("default", { month: "short", year: "2-digit" });
    monthlyMap[m] = (monthlyMap[m] || 0) + o.amount;
  });
  const monthlySpending = Object.entries(monthlyMap)
    .map(([month, amount]) => ({ month, amount }))
    .reverse();

  // Category distribution
  const categoryDist = Object.entries(catCounts).map(([name, value]) => ({ name, value }));

  return {
    userId,
    totalOrders: orders.length,
    totalSpend,
    avgOrder,
    topCategory,
    topDevice,
    fraudCount,
    monthlySpending,
    categoryDist,
    orders,
  };
}

// ── Geographic map data ──
export const GEO_DATA = REGIONS.map((region) => ({
  region,
  lat: getRegionCoord(region).lat,
  lng: getRegionCoord(region).lng,
  transactions: randomBetween(5000, 80000),
  revenue: randomBetween(250000, 4000000),
  fraudRate: +(Math.random() * 12 + 1).toFixed(1),
}));

function getRegionCoord(region: string) {
  const coords: Record<string, { lat: number; lng: number }> = {
    Maharashtra: { lat: 19.7515, lng: 75.7139 },
    Delhi: { lat: 28.7041, lng: 77.1025 },
    Karnataka: { lat: 15.3173, lng: 75.7139 },
    "Tamil Nadu": { lat: 11.1271, lng: 78.6569 },
    Gujarat: { lat: 22.2587, lng: 71.1924 },
    Rajasthan: { lat: 27.0238, lng: 74.2179 },
    "West Bengal": { lat: 22.9868, lng: 87.855 },
    Telangana: { lat: 18.1124, lng: 79.0193 },
    "Uttar Pradesh": { lat: 26.8467, lng: 80.9462 },
    Kerala: { lat: 10.8505, lng: 76.2711 },
  };
  return coords[region] || { lat: 20, lng: 78 };
}

// ── 110+ business questions ──
export interface QuestionItem {
  id: number;
  question: string;
  category: string;
}

export const QUESTION_CATEGORIES = [
  "Fraud Analysis",
  "Device Comparison",
  "Category Performance",
  "Time Trends",
  "Demographics",
  "Geographic Insights",
  "Revenue Metrics",
] as const;

export const ALL_QUESTIONS: QuestionItem[] = [
  // Fraud Analysis (22)
  { id: 1, question: "What is the overall fraud rate across all transactions?", category: "Fraud Analysis" },
  { id: 2, question: "Which device has the highest fraud rate?", category: "Fraud Analysis" },
  { id: 3, question: "Which category has the most fraudulent transactions?", category: "Fraud Analysis" },
  { id: 4, question: "What is the average amount of a fraudulent transaction?", category: "Fraud Analysis" },
  { id: 5, question: "Are fraud transactions increasing month over month?", category: "Fraud Analysis" },
  { id: 6, question: "Which region has the highest fraud percentage?", category: "Fraud Analysis" },
  { id: 7, question: "At what time do most fraud transactions occur?", category: "Fraud Analysis" },
  { id: 8, question: "What percentage of UPI payments are fraudulent?", category: "Fraud Analysis" },
  { id: 9, question: "Is fraud more common on weekends or weekdays?", category: "Fraud Analysis" },
  { id: 10, question: "Which age group is most vulnerable to fraud?", category: "Fraud Analysis" },
  { id: 11, question: "Are high-value transactions more likely to be fraudulent?", category: "Fraud Analysis" },
  { id: 12, question: "Which payment method has the lowest fraud incidence?", category: "Fraud Analysis" },
  { id: 13, question: "How does fraud rate compare between new and returning users?", category: "Fraud Analysis" },
  { id: 14, question: "What is the fraud detection rate by category?", category: "Fraud Analysis" },
  { id: 15, question: "Which city has the fastest growing fraud rate?", category: "Fraud Analysis" },
  { id: 16, question: "How many fraud transactions were reversed successfully?", category: "Fraud Analysis" },
  { id: 17, question: "What is the correlation between transaction time and fraud likelihood?", category: "Fraud Analysis" },
  { id: 18, question: "Are there seasonal patterns in fraud activity?", category: "Fraud Analysis" },
  { id: 19, question: "Which merchant category code has the highest fraud rate?", category: "Fraud Analysis" },
  { id: 20, question: "What is the average time to detect a fraudulent transaction?", category: "Fraud Analysis" },
  { id: 21, question: "How does fraud rate vary by transaction amount range?", category: "Fraud Analysis" },
  { id: 22, question: "What percentage of flagged transactions are false positives?", category: "Fraud Analysis" },

  // Device Comparison (17)
  { id: 23, question: "Which device generates the most revenue?", category: "Device Comparison" },
  { id: 24, question: "What is the average order value per device type?", category: "Device Comparison" },
  { id: 25, question: "Which device has the highest transaction success rate?", category: "Device Comparison" },
  { id: 26, question: "How does session duration compare across devices?", category: "Device Comparison" },
  { id: 27, question: "Which device has the highest cart abandonment rate?", category: "Device Comparison" },
  { id: 28, question: "Are iOS users spending more than Android users?", category: "Device Comparison" },
  { id: 29, question: "Which device type has the fastest checkout time?", category: "Device Comparison" },
  { id: 30, question: "What is the device distribution of active users?", category: "Device Comparison" },
  { id: 31, question: "Which device has the highest repeat purchase rate?", category: "Device Comparison" },
  { id: 32, question: "How does app crash rate compare by device?", category: "Device Comparison" },
  { id: 33, question: "Which device generates the most Food category orders?", category: "Device Comparison" },
  { id: 34, question: "What is the conversion rate by device type?", category: "Device Comparison" },
  { id: 35, question: "Which device has the most peak-hour activity?", category: "Device Comparison" },
  { id: 36, question: "How does average transaction value trend on Android vs iOS?", category: "Device Comparison" },
  { id: 37, question: "Which device type has the highest customer satisfaction?", category: "Device Comparison" },
  { id: 38, question: "What is the refund rate by device platform?", category: "Device Comparison" },
  { id: 39, question: "Which device has the highest coupon usage rate?", category: "Device Comparison" },

  // Category Performance (22)
  { id: 40, question: "Which category has the highest total revenue?", category: "Category Performance" },
  { id: 41, question: "What is the average order value per category?", category: "Category Performance" },
  { id: 42, question: "Which category is growing the fastest?", category: "Category Performance" },
  { id: 43, question: "Which category has the most repeat customers?", category: "Category Performance" },
  { id: 44, question: "What is the return rate by category?", category: "Category Performance" },
  { id: 45, question: "Which category performs best during weekends?", category: "Category Performance" },
  { id: 46, question: "What is the profit margin by category?", category: "Category Performance" },
  { id: 47, question: "Which category has the highest customer lifetime value?", category: "Category Performance" },
  { id: 48, question: "Which age group spends the most on Food?", category: "Category Performance" },
  { id: 49, question: "Which age group spends the most on Electronics?", category: "Category Performance" },
  { id: 50, question: "How does Fashion revenue compare across regions?", category: "Category Performance" },
  { id: 51, question: "What is the average basket size per category?", category: "Category Performance" },
  { id: 52, question: "Which category has the lowest cart abandonment?", category: "Category Performance" },
  { id: 53, question: "How does category preference vary by device?", category: "Category Performance" },
  { id: 54, question: "Which category generates the most UPI transactions?", category: "Category Performance" },
  { id: 55, question: "What is the seasonal demand pattern for Travel?", category: "Category Performance" },
  { id: 56, question: "Which category has the highest discount utilization?", category: "Category Performance" },
  { id: 57, question: "What is the cross-sell rate between Food and Grocery?", category: "Category Performance" },
  { id: 58, question: "Which category has the most new customer acquisitions?", category: "Category Performance" },
  { id: 59, question: "How does Entertainment revenue trend monthly?", category: "Category Performance" },
  { id: 60, question: "Which category has the best review ratings?", category: "Category Performance" },
  { id: 61, question: "What is the average delivery time by category?", category: "Category Performance" },

  // Time Trends (22)
  { id: 62, question: "What hour has the peak transaction volume?", category: "Time Trends" },
  { id: 63, question: "Which day of the week has the highest revenue?", category: "Time Trends" },
  { id: 64, question: "How does transaction volume change month over month?", category: "Time Trends" },
  { id: 65, question: "Is there a seasonal pattern in overall spending?", category: "Time Trends" },
  { id: 66, question: "Which month has the highest average order value?", category: "Time Trends" },
  { id: 67, question: "What is the year-over-year growth rate?", category: "Time Trends" },
  { id: 68, question: "How does late-night transaction volume compare to daytime?", category: "Time Trends" },
  { id: 69, question: "Which quarter has the highest fraud rate?", category: "Time Trends" },
  { id: 70, question: "Is weekend spending higher than weekday spending?", category: "Time Trends" },
  { id: 71, question: "What is the average time between repeat purchases?", category: "Time Trends" },
  { id: 72, question: "Which festival period sees the highest spike?", category: "Time Trends" },
  { id: 73, question: "How does new user acquisition trend over time?", category: "Time Trends" },
  { id: 74, question: "What is the hourly revenue distribution?", category: "Time Trends" },
  { id: 75, question: "Which time slot has the highest failure rate?", category: "Time Trends" },
  { id: 76, question: "How does order frequency change after first purchase?", category: "Time Trends" },
  { id: 77, question: "What is the weekly active user trend?", category: "Time Trends" },
  { id: 78, question: "At what time do refund requests peak?", category: "Time Trends" },
  { id: 79, question: "How does payment method preference change over time?", category: "Time Trends" },
  { id: 80, question: "What is the daily transaction count trend for the last 30 days?", category: "Time Trends" },
  { id: 81, question: "Which month shows the highest customer churn?", category: "Time Trends" },
  { id: 82, question: "How does transaction speed vary by time of day?", category: "Time Trends" },
  { id: 83, question: "What is the trend of average transaction value over 12 months?", category: "Time Trends" },

  // Demographics (16)
  { id: 84, question: "Which age group has the highest transaction count?", category: "Demographics" },
  { id: 85, question: "What is the spending pattern of users aged 18-25?", category: "Demographics" },
  { id: 86, question: "Which age group prefers UPI payments?", category: "Demographics" },
  { id: 87, question: "How does average order value differ by age group?", category: "Demographics" },
  { id: 88, question: "Which age group has the highest customer retention?", category: "Demographics" },
  { id: 89, question: "What is the preferred device for users aged 46-55?", category: "Demographics" },
  { id: 90, question: "Which age group shops most during late night hours?", category: "Demographics" },
  { id: 91, question: "How does fraud vulnerability change with age?", category: "Demographics" },
  { id: 92, question: "What category do users aged 36-45 prefer most?", category: "Demographics" },
  { id: 93, question: "Which age group has the highest refund rate?", category: "Demographics" },
  { id: 94, question: "What is the average session duration by age group?", category: "Demographics" },
  { id: 95, question: "How does coupon usage vary by age?", category: "Demographics" },
  { id: 96, question: "Which age group has the highest brand loyalty?", category: "Demographics" },
  { id: 97, question: "What is the preferred payment method for 56+ users?", category: "Demographics" },
  { id: 98, question: "Which age group generates the most revenue per user?", category: "Demographics" },
  { id: 99, question: "How does customer acquisition cost vary by age?", category: "Demographics" },

  // Geographic Insights (12)
  { id: 100, question: "Which region has the highest transaction volume?", category: "Geographic Insights" },
  { id: 101, question: "What is the average order value by state?", category: "Geographic Insights" },
  { id: 102, question: "Which city has the fastest growing user base?", category: "Geographic Insights" },
  { id: 103, question: "How does fraud rate compare across top 5 regions?", category: "Geographic Insights" },
  { id: 104, question: "Which region prefers mobile payments the most?", category: "Geographic Insights" },
  { id: 105, question: "What is the revenue distribution across India?", category: "Geographic Insights" },
  { id: 106, question: "Which region has the highest Electronics spending?", category: "Geographic Insights" },
  { id: 107, question: "How does delivery time vary by region?", category: "Geographic Insights" },
  { id: 108, question: "Which metro city contributes most to revenue?", category: "Geographic Insights" },
  { id: 109, question: "What is the regional distribution of new users?", category: "Geographic Insights" },
  { id: 110, question: "Which state has the highest cash-on-delivery rate?", category: "Geographic Insights" },
  { id: 111, question: "How does category preference vary by region?", category: "Geographic Insights" },

  // Revenue Metrics (12)
  { id: 112, question: "What is the total revenue for the current quarter?", category: "Revenue Metrics" },
  { id: 113, question: "What is the average revenue per user (ARPU)?", category: "Revenue Metrics" },
  { id: 114, question: "How does revenue per transaction trend monthly?", category: "Revenue Metrics" },
  { id: 115, question: "What is the revenue split by payment method?", category: "Revenue Metrics" },
  { id: 116, question: "Which category contributes most to gross margin?", category: "Revenue Metrics" },
  { id: 117, question: "What is the projected revenue for next quarter?", category: "Revenue Metrics" },
  { id: 118, question: "How does refund volume impact net revenue?", category: "Revenue Metrics" },
  { id: 119, question: "What is the lifetime value of top 10% customers?", category: "Revenue Metrics" },
  { id: 120, question: "How does discount depth affect revenue?", category: "Revenue Metrics" },
  { id: 121, question: "What is the revenue growth rate by category?", category: "Revenue Metrics" },
  { id: 122, question: "Which channel drives the highest revenue per session?", category: "Revenue Metrics" },
  { id: 123, question: "What is the revenue impact of fraud losses?", category: "Revenue Metrics" },
];

// Generate mock analysis result for any question
export function generateAnalysisResult(question: string) {
  const lower = question.toLowerCase();
  const isFraud = lower.includes("fraud");
  const isDevice = lower.includes("device") || lower.includes("android") || lower.includes("ios");
  const isCategory = lower.includes("category") || lower.includes("food") || lower.includes("electronics") || lower.includes("fashion");
  const isTime = lower.includes("hour") || lower.includes("time") || lower.includes("day") || lower.includes("month") || lower.includes("week") || lower.includes("trend") || lower.includes("seasonal") || lower.includes("peak");
  const isGeo = lower.includes("region") || lower.includes("city") || lower.includes("state") || lower.includes("geographic") || lower.includes("metro");
  const isRevenue = lower.includes("revenue") || lower.includes("arpu") || lower.includes("margin") || lower.includes("spend");
  const isAge = lower.includes("age") || lower.includes("demographic");

  let chartData: { name: string; value: number }[] = [];
  let sql = "";
  let insight = "";
  let metrics: { label: string; value: string; change?: string }[] = [];

  if (isFraud) {
    chartData = [
      { name: "Android", value: randomBetween(4000, 7000) },
      { name: "iOS", value: randomBetween(2000, 4000) },
      { name: "Web", value: randomBetween(800, 2000) },
      { name: "Desktop", value: randomBetween(300, 1000) },
    ];
    sql = `SELECT device_os, COUNT(*) as fraud_count,\n  ROUND(COUNT(*)*100.0/SUM(COUNT(*)) OVER(), 2) as pct\nFROM transactions\nWHERE is_fraud = true\nGROUP BY device_os\nORDER BY fraud_count DESC;`;
    insight = "Fraud patterns show Android devices accounting for ~60% of flagged transactions. Late-night hours (12am-3am) show 3x higher fraud rates. Maharashtra and Delhi are the most impacted regions. Implementing real-time ML scoring could reduce fraud by an estimated 40%.";
    metrics = [
      { label: "Total Fraud", value: `${randomBetween(10000, 20000).toLocaleString()}`, change: "+8.2%" },
      { label: "Fraud Rate", value: `${(Math.random() * 5 + 3).toFixed(1)}%` },
      { label: "Avg Fraud Amt", value: formatINR(randomBetween(75, 200)) },
      { label: "Detection Rate", value: `${randomBetween(85, 97)}%`, change: "+3.1%" },
    ];
  } else if (isDevice) {
    chartData = DEVICES.map((d) => ({ name: d, value: randomBetween(10000, 80000) }));
    sql = `SELECT device_type, COUNT(*) as tx_count,\n  SUM(amount) as total_revenue,\n  AVG(amount) as avg_order\nFROM transactions\nGROUP BY device_type\nORDER BY total_revenue DESC;`;
    insight = "Mobile devices (Android + iOS) dominate with 78% of all transactions. iOS users show 22% higher average order values. Desktop has the highest conversion rate at 4.2%. Web traffic is primarily browse-only with lower checkout completion.";
    metrics = [
      { label: "Top Device", value: "Android", change: "45% share" },
      { label: "Highest AOV", value: "iOS", change: "₹2,850" },
      { label: "Best Convert", value: "Desktop", change: "4.2%" },
      { label: "Total Devices", value: "4 Types" },
    ];
  } else if (isCategory) {
    chartData = CATEGORIES.map((c) => ({ name: c, value: randomBetween(50000, 300000) }));
    sql = `SELECT category, COUNT(*) as order_count,\n  SUM(amount) as revenue,\n  AVG(amount) as avg_value\nFROM transactions\nGROUP BY category\nORDER BY revenue DESC;`;
    insight = "Food and Electronics lead category performance, contributing 52% of total revenue. Fashion shows the highest growth rate at 18% MoM. Grocery has strong repeat purchase patterns with 3.2x monthly frequency. Travel shows seasonal spikes during holiday periods.";
    metrics = [
      { label: "Top Category", value: "Food", change: "+15%" },
      { label: "Total Revenue", value: `₹${(Math.random() * 2.5 + 4).toFixed(1)}Cr` },
      { label: "Avg Basket", value: formatINR(randomBetween(500, 3000)) },
      { label: "Growth Rate", value: "18% MoM", change: "+4.2%" },
    ];
  } else if (isTime) {
    chartData = [
      { name: "6AM", value: randomBetween(8000, 15000) },
      { name: "9AM", value: randomBetween(25000, 40000) },
      { name: "12PM", value: randomBetween(50000, 70000) },
      { name: "3PM", value: randomBetween(40000, 55000) },
      { name: "6PM", value: randomBetween(60000, 80000) },
      { name: "7PM", value: randomBetween(75000, 95000) },
      { name: "9PM", value: randomBetween(45000, 65000) },
      { name: "12AM", value: randomBetween(15000, 30000) },
    ];
    sql = `SELECT EXTRACT(HOUR FROM created_at) as hour,\n  COUNT(*) as tx_count,\n  SUM(amount) as total_amount\nFROM transactions\nGROUP BY hour\nORDER BY tx_count DESC\nLIMIT 8;`;
    insight = "Peak transaction volume occurs at 7PM (19:00), correlating with post-work shopping behavior. A secondary peak at 12PM aligns with lunch-hour purchases. Weekend volumes are 28% higher than weekdays. Infrastructure should be scaled for these windows.";
    metrics = [
      { label: "Peak Hour", value: "7 PM", change: "Highest" },
      { label: "Peak Volume", value: `${randomBetween(70000, 95000).toLocaleString()}` },
      { label: "Daily Total", value: `${randomBetween(400000, 600000).toLocaleString()}` },
      { label: "Avg/Min", value: `${randomBetween(800, 1500).toLocaleString()}` },
    ];
  } else if (isGeo) {
    chartData = REGIONS.slice(0, 6).map((r) => ({ name: r, value: randomBetween(20000, 90000) }));
    sql = `SELECT region, COUNT(*) as tx_count,\n  SUM(amount) as revenue,\n  AVG(CASE WHEN is_fraud THEN 1 ELSE 0 END)*100 as fraud_pct\nFROM transactions\nGROUP BY region\nORDER BY revenue DESC\nLIMIT 10;`;
    insight = "Maharashtra leads with 22% of national transaction volume, followed by Delhi at 18%. Karnataka shows the highest growth trajectory at 24% QoQ. Southern states show higher average order values. Tier-2 cities are emerging as key growth markets.";
    metrics = [
      { label: "Top Region", value: "Maharashtra", change: "22% share" },
      { label: "Total Regions", value: "10 States" },
      { label: "Fastest Growth", value: "Karnataka", change: "+24% QoQ" },
      { label: "Avg Revenue", value: `₹${(Math.random() * 1 + 0.5).toFixed(1)}Cr` },
    ];
  } else if (isRevenue) {
    chartData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => ({ name: m, value: randomBetween(500000, 2500000) }));
    sql = `SELECT DATE_TRUNC('month', created_at) as month,\n  SUM(amount) as revenue,\n  COUNT(DISTINCT user_id) as active_users,\n  SUM(amount)/COUNT(DISTINCT user_id) as arpu\nFROM transactions\nGROUP BY month\nORDER BY month;`;
    insight = "Revenue shows consistent 12% MoM growth with Q4 projections exceeding ₹6Cr. ARPU has increased by 18% over the last quarter. Top 10% of customers contribute 42% of total revenue. Reducing fraud losses could add ₹50L to net revenue annually.";
    metrics = [
      { label: "Q4 Revenue", value: `₹${(Math.random() * 2.5 + 5).toFixed(1)}Cr`, change: "+12%" },
      { label: "ARPU", value: formatINR(randomBetween(1500, 5000)), change: "+18%" },
      { label: "Net Margin", value: `${randomBetween(15, 35)}%` },
      { label: "Growth", value: "12% MoM", change: "Steady" },
    ];
  } else if (isAge) {
    chartData = AGE_GROUPS.map((a) => ({ name: a, value: randomBetween(10000, 60000) }));
    sql = `SELECT age_group, COUNT(*) as tx_count,\n  SUM(amount) as total_spend,\n  AVG(amount) as avg_order\nFROM transactions\nGROUP BY age_group\nORDER BY total_spend DESC;`;
    insight = "The 26-35 age group dominates spending at 38% of total volume. Users aged 18-25 show the highest growth rate but lower AOV. The 46-55 segment has the best retention metrics. Targeted campaigns for each cohort could increase overall engagement by 25%.";
    metrics = [
      { label: "Top Segment", value: "26-35", change: "38% spend" },
      { label: "Fastest Growing", value: "18-25", change: "+32%" },
      { label: "Best Retention", value: "46-55", change: "72%" },
      { label: "Avg AOV", value: formatINR(randomBetween(500, 2000)) },
    ];
  } else {
    // Generic fallback
    chartData = CATEGORIES.slice(0, 5).map((c) => ({ name: c, value: randomBetween(10000, 60000) }));
    sql = `SELECT category, COUNT(*) as count,\n  SUM(amount) as total\nFROM transactions\nGROUP BY category\nORDER BY total DESC\nLIMIT 5;`;
    insight = "Analysis reveals strong growth trends across key metrics. The platform processes over 500K daily transactions with 99.7% uptime. User engagement has increased 28% QoQ. Recommended focus areas include fraud prevention and geographic expansion.";
    metrics = [
      { label: "Transactions", value: `${randomBetween(400, 600)}K/day` },
      { label: "Uptime", value: "99.7%", change: "Stable" },
      { label: "Users", value: `${randomBetween(80, 200)}K`, change: "+28%" },
      { label: "Avg Value", value: formatINR(randomBetween(500, 2500)) },
    ];
  }

  return { sql, metrics, insight, chartData };
}
