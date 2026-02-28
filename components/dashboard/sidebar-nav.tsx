"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShieldAlert,
  Tags,
  Smartphone,
  Clock,
  Globe,
  Zap,
  UserSearch,
  FlaskConical,
  HelpCircle,
  Lightbulb,
  Brain,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Fraud Analysis", href: "/dashboard/fraud", icon: ShieldAlert },
  { label: "Category Analysis", href: "/dashboard/categories", icon: Tags },
  { label: "Device Analysis", href: "/dashboard/devices", icon: Smartphone },
  { label: "Time Trends", href: "/dashboard/time-trends", icon: Clock },
  { label: "Geographic Map", href: "/dashboard/geography", icon: Globe },
  { label: "Live Orders", href: "/dashboard/live-orders", icon: Zap },
  { label: "User History", href: "/dashboard/user-history", icon: UserSearch },
  { label: "Analyzer Tool", href: "/dashboard/analyzer", icon: FlaskConical },
  { label: "Question Bank", href: "/dashboard/questions", icon: HelpCircle },
  { label: "Leadership Insights", href: "/dashboard/insights", icon: Lightbulb },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
          <Brain className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="text-base font-bold tracking-tight text-sidebar-foreground">
            InsightAI
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 2 }}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-primary/10 text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-sidebar-border p-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-center"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </aside>
  );
}

export function useSidebarWidth() {
  return "pl-[240px]";
}
