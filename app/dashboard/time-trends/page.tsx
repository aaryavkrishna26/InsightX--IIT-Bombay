"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock, Calendar, TrendingUp } from "lucide-react";
import { randomBetween } from "@/lib/mock-data";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, Cell,
} from "recharts";

const CHART_COLORS = [
  "oklch(0.55 0.18 270)", "oklch(0.72 0.15 195)", "oklch(0.45 0.18 270)",
  "oklch(0.65 0.12 195)", "oklch(0.60 0.20 280)", "oklch(0.50 0.15 270)",
  "oklch(0.75 0.10 195)",
];

export default function TimeTrendsPage() {
  const [hourly, setHourly] = useState<{ name: string; value: number }[]>([]);
  const [daily, setDaily] = useState<{ name: string; value: number }[]>([]);
  const [monthly, setMonthly] = useState<{ name: string; transactions: number; revenue: number }[]>([]);
  const [weekdayVsWeekend, setWeekdayVsWeekend] = useState<{ name: string; weekday: number; weekend: number }[]>([]);

  const generateData = useCallback(() => {
    setHourly(
      Array.from({ length: 24 }, (_, i) => ({
        name: `${i.toString().padStart(2, "0")}:00`,
        value: randomBetween(i >= 6 && i <= 22 ? 5000 : 1000, i >= 17 && i <= 20 ? 25000 : 15000),
      }))
    );
    setDaily(
      ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => ({
        name: d,
        value: randomBetween(12000, 35000),
      }))
    );
    setMonthly(
      ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => ({
        name: m,
        transactions: randomBetween(80000, 250000),
        revenue: randomBetween(200000, 450000),
      }))
    );
    setWeekdayVsWeekend(
      Array.from({ length: 24 }, (_, i) => ({
        name: `${i.toString().padStart(2, "0")}`,
        weekday: randomBetween(1000, 15000),
        weekend: randomBetween(2000, 18000),
      }))
    );
  }, []);

  useEffect(() => { generateData(); }, [generateData]);

  const peakHour = hourly.length > 0 ? hourly.reduce((prev, curr) => curr.value > prev.value ? curr : prev, hourly[0]) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Time Trends</h2>
          <p className="mt-1 text-sm text-muted-foreground">Transaction patterns across hours, days, and months.</p>
        </div>
        {peakHour && (
          <div className="flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2">
            <Clock className="h-4 w-4 text-primary" />
            <div>
              <p className="text-[11px] text-primary">Peak Hour</p>
              <p className="text-sm font-bold text-primary">{peakHour.name} ({new Intl.NumberFormat("en-IN").format(peakHour.value)} txns)</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Hourly */}
        <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-card-foreground"><Clock className="h-4 w-4 text-primary" />Hourly Volume (24h)</h3>
          <div className="mt-4 h-56">
            {hourly.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={hourly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke="oklch(0.5 0 0 / 0.4)" interval={2} />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="value" stroke="oklch(0.55 0.18 270)" fill="oklch(0.55 0.18 270 / 0.15)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Daily */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-card-foreground"><Calendar className="h-4 w-4 text-primary" />Daily Distribution</h3>
          <div className="mt-4 h-56">
            {daily.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={daily}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {daily.map((_, idx) => <Cell key={`dd-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Monthly */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-card-foreground"><TrendingUp className="h-4 w-4 text-primary" />Monthly Trend</h3>
          <div className="mt-4 h-56">
            {monthly.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <YAxis tick={{ fontSize: 10 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Line type="monotone" dataKey="transactions" stroke="oklch(0.55 0.18 270)" strokeWidth={2} dot={{ r: 3 }} name="Transactions" />
                  <Line type="monotone" dataKey="revenue" stroke="oklch(0.72 0.15 195)" strokeWidth={2} dot={{ r: 3 }} name="Revenue (INR)" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Weekday vs Weekend */}
        <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
          <h3 className="text-sm font-semibold text-card-foreground">Weekday vs Weekend (Hourly)</h3>
          <div className="mt-4 h-56">
            {weekdayVsWeekend.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekdayVsWeekend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.5 0 0 / 0.1)" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <YAxis tick={{ fontSize: 11 }} stroke="oklch(0.5 0 0 / 0.4)" />
                  <Tooltip contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="weekday" stroke="oklch(0.55 0.18 270)" fill="oklch(0.55 0.18 270 / 0.1)" strokeWidth={2} name="Weekday" />
                  <Area type="monotone" dataKey="weekend" stroke="oklch(0.72 0.15 195)" fill="oklch(0.72 0.15 195 / 0.1)" strokeWidth={2} name="Weekend" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
