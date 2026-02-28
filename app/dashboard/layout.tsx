import { DashboardSidebar } from "@/components/dashboard/sidebar-nav";
import { DashboardTopBar } from "@/components/dashboard/top-bar";

export const metadata = {
  title: "Dashboard - InsightAI",
  description: "AI-powered analytics dashboard for digital payment insights",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col pl-[240px]">
        <DashboardTopBar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
