"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sun, Moon, Home, User } from "lucide-react";
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
  "/dashboard/devices": "Device Analysis",
  "/dashboard/time-trends": "Time Trends",
  "/dashboard/geography": "Geographic Map",
  "/dashboard/user-history": "User History",
  "/dashboard/analyzer": "Analyzer Tool",
  "/dashboard/questions": "Question Bank",
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
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background px-6">
      <h1 className="text-base font-semibold text-foreground">{pageTitle}</h1>

      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Back to landing">
            <Home className="h-4 w-4" />
          </Button>
        </Link>

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
