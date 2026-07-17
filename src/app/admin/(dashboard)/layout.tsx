import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";

// Server-side check in addition to middleware — defense in depth.
// Middleware protects the route, but this guarantees no data fetch
// in a nested page can run without a verified session, even if a
// middleware matcher is ever misconfigured later.
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");

  return (
    <div className="grid lg:grid-cols-[240px_1fr] min-h-screen bg-cream-2">
      <Sidebar />
      <main className="p-6 lg:p-10">{children}</main>
    </div>
  );
}