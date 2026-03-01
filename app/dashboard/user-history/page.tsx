"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Package,
  DollarSign,
  ShoppingBag,
  Tags,
  Smartphone,
  ShieldAlert,
  Search,
  UserSearch,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateUserHistory, formatINR } from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const CHART_COLORS = [
  "oklch(0.55 0.18 270)",
  "oklch(0.72 0.15 195)",
  "oklch(0.45 0.18 270)",
  "oklch(0.65 0.12 195)",
  "oklch(0.60 0.20 280)",
  "oklch(0.50 0.15 270)",
  "oklch(0.75 0.10 195)",
  "oklch(0.40 0.15 270)",
];

interface UserData {
  userId: string;
  totalOrders: number;
  totalSpend: number;
  avgOrder: number;
  topCategory: string;
  topDevice: string;
  fraudCount: number;
  monthlySpending: { month: string; amount: number }[];
  categoryDist: { name: string; value: number }[];
}

function UserHistoryContent() {
  const searchParams = useSearchParams();
  const initialUserId = searchParams?.get("userId") || "";
  const [userIdInput, setUserIdInput] = useState(initialUserId);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  const lookupUser = async (uid: string) => {
    if (!uid.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const data = generateUserHistory(uid);
    setUserData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (initialUserId) {
      lookupUser(initialUserId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUserId]);

  const statCards = userData
    ? [
        { label: "Total Orders", value: userData.totalOrders.toString(), icon: Package },
        { label: "Lifetime Spending", value: formatINR(userData.totalSpend), icon: DollarSign },
        { label: "Avg Order Value", value: formatINR(userData.avgOrder), icon: ShoppingBag },
        { label: "Top Category", value: userData.topCategory, icon: Tags },
        { label: "Device Preference", value: userData.topDevice, icon: Smartphone },
        { label: "Fraud Count", value: userData.fraudCount.toString(), icon: ShieldAlert },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">User History</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Look up any user to view their transaction history and analytics.
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <Input
          value={userIdInput}
          onChange={(e) => setUserIdInput(e.target.value)}
          placeholder="Enter User ID (e.g. USR-12345)"
          className="h-10 max-w-md"
          onKeyDown={(e) => e.key === "Enter" && lookupUser(userIdInput)}
        />
        <Button onClick={() => lookupUser(userIdInput)} disabled={loading} className="gap-2">
          <Search className="h-4 w-4" />
          Lookup
        </Button>
      </div>

      {loading && (
        <div className="flex items-center justify-center rounded-xl border border-border bg-card p-12">
          <div className="flex flex-col items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Loading user data...</p>
          </div>
        </div>
      )}

      {!loading && !userData && (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-card/50 p-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <UserSearch className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              Enter a User ID to view their transaction history.
            </p>
          </div>
        </div>
      )}

      {!loading && userData && (
        <div className="space-y-6">
          {/* User badge */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <UserSearch className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-mono text-sm font-bold text-foreground">{userData.userId}</p>
              <p className="text-xs text-muted-foreground">{userData.totalOrders} orders total</p>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
            {statCards.map((card) => (
              <div key={card.label} className="rounded-xl border border-border bg-card p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <card.icon className="h-4 w-4 text-primary" />
                </div>
                <p className="mt-2 text-lg font-bold text-card-foreground">{card.value}</p>
                <p className="text-[11px] text-muted-foreground">{card.label}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-card-foreground">Monthly Spending</h3>
              <div className="mt-4 h-56">
                {userData.monthlySpending.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userData.monthlySpending}>
                      <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                      <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="oklch(0.5 0 0 / 0.4)" />
                      <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                      <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                      <Bar dataKey="amount" fill="oklch(0.55 0.18 270)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    No spending data available
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="text-sm font-semibold text-card-foreground">Category Distribution</h3>
              <div className="mt-4 h-56">
                {userData.categoryDist.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userData.categoryDist}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {userData.categoryDist.map((_, idx) => (
                          <Cell key={`uh-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    No category data available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UserHistoryPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      }
    >
      <UserHistoryContent />
    </Suspense>
  );
}
