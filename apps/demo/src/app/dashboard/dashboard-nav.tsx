"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "@/components/transition-link";
import {
  BarChart3,
  ListChecks,
  Radio,
  Search,
  MessageSquare,
  Upload,
} from "lucide-react";

const tabs = [
  { href: "/dashboard/overview", label: "Overview", icon: BarChart3 },
  { href: "/dashboard/operations", label: "Operations", icon: ListChecks },
  { href: "/dashboard/signals", label: "Signals", icon: Radio },
  { href: "/dashboard/intel", label: "Intel", icon: Search },
  { href: "/dashboard/comms", label: "Comms", icon: MessageSquare },
  { href: "/dashboard/upload", label: "Upload", icon: Upload },
] as const;

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="od-tabs-list" role="tablist" aria-label="Dashboard sections">
      {tabs.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <TransitionLink
            key={href}
            href={href}
            transition={false}
            role="tab"
            aria-selected={isActive}
            className="od-tabs-trigger"
            style={{ textDecoration: "none" }}
          >
            <Icon className="h-3.5 w-3.5" style={{ marginRight: "0.45rem" }} />
            {label}
          </TransitionLink>
        );
      })}
    </nav>
  );
}
