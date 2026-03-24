import { Shell, CommandHeader, Badge } from "@outerhaven/framework";
import { DashboardNav } from "./dashboard-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-10 lg:px-8">
      <CommandHeader
        badge={<Badge tone="primary">Command Dashboard</Badge>}
        eyebrow="Operational Workspace"
        title="Tactical Command Center"
        description="Navigate between operational sections to monitor, manage, and communicate across all relay sectors."
        metaItems={[
          { label: "Clearance", value: "Level 4" },
          { label: "Uptime", value: "99.98%" },
          { label: "Active sectors", value: "6 online" },
        ]}
      />

      <DashboardNav />

      <Shell density="compact" className="u-tactical-grid" style={{ minHeight: "60vh" }}>
        {children}
      </Shell>
    </main>
  );
}
