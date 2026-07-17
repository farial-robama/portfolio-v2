import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard — Jahidul Alam",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-[240px_1fr] min-h-screen bg-cream-2">
      <Sidebar />
      <main className="p-6 lg:p-10">{children}</main>
    </div>
  );
}
