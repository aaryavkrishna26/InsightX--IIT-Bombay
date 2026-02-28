"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sun, Moon, Bell, User, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const pathLabels: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/fraud": "Fraud Analysis",
  "/dashboard/categories": "Category Analysis",
  "/dashboard/devices": "Device Analysis",
  "/dashboard/time-trends": "Time Trends",
  "/dashboard/geography": "Geographic Map",
  "/dashboard/live-orders": "Live Orders",
  "/dashboard/user-history": "User History",
  "/dashboard/analyzer": "Analyzer Tool",
  "/dashboard/questions": "Question Bank",
  "/dashboard/insights": "Leadership Insights",
};

export function DashboardTopBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const pageTitle = pathLabels[pathname || ""] || "Dashboard";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-xl">
      <h1 className="text-lg font-semibold text-foreground">{pageTitle}</h1>

      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Back to landing">
            <Home className="h-4 w-4" />
          </Button>
        </Link>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-lg" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive-foreground text-[9px] font-bold text-primary-foreground">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1">
              <span className="text-sm font-medium">Fraud spike detected</span>
              <span className="text-xs text-muted-foreground">Maharashtra region, 23% above threshold</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1">
              <span className="text-sm font-medium">Revenue milestone</span>
              <span className="text-xs text-muted-foreground">Daily revenue crossed $2M mark</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1">
              <span className="text-sm font-medium">System health</span>
              <span className="text-xs text-muted-foreground">All services running at 99.9% uptime</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme toggle */}
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        )}

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Profile">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>Admin User</span>
                <span className="text-xs font-normal text-muted-foreground">admin@insightai.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Badge variant="secondary" className="text-xs">Team: insi-250499</Badge>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">Back to Landing Page</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
