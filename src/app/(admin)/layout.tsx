"use client";
import DashboardNav from "@/components/DashboardNav";
import { Header } from "@/components/Header";
import { SidebarNavItem } from "@/types/nav-types";
import { SessionProvider } from "next-auth/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const dashboardConfig: { sidebarNav: SidebarNavItem[] } = {
  sidebarNav: [
    {
      title: "My Forms",
      href: "/dashboard",
      icon: "library",
    },
    {
      title: "Results",
      href: "/results",
      icon: "list",
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: "lineChart",
    },
    {
      title: "Settings",
      href: "/settings",
      icon: "settings",
    },
  ],
};

const layout = ({ children }: Props) => {
  return (
    <SessionProvider>
      <div className="flex min-h-screen flex-col space-y-6">
        <Header />
        <div className="container relative">
          <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
            <div className="flex h-[52px] items-center justify-center px-2"></div>
            <aside className="group flex flex-col gap-4 py-2 px-2 data-[collapsed=true]:py-2">
              {/* Side Navigation */}
              <DashboardNav items={dashboardConfig.sidebarNav} />
            </aside>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default layout;
