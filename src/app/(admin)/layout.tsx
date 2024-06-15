"use client";
import DashboardNav from "@/components/DashboardNav";
import { Header } from "@/components/Navbar";
import UpgradePlanBtn from "@/components/UpgradePlanBtn";
import { SidebarNavItem } from "@/types/nav-types";
import { SessionProvider } from "next-auth/react";
import React from "react";
import FormGenerator from "../form-generator";

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
      title: "Settings",
      href: "/settings",
      icon: "settings",
    },
  ],
};

const layout = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Header />
      <div className="flex min-h-screen flex-col space-y-6 my-4">
        <div className="container relative">
          <div className="overflow-hidden max-sm:overflow-auto rounded-[0.5rem] border bg-background shadow">
            <div className="flex-row md:flex">
              <aside className="h-full flex flex-col gap-4 max-sm:gap-1 py-2 max-sm:py-0 px-2 mr-2 border-r-[1px] max-sm:border-none">
                {/* Side Navigation */}
                <DashboardNav items={dashboardConfig.sidebarNav} />
                {/* UpgradePlanBtn */}
                <div>
                  <UpgradePlanBtn />
                </div>
              </aside>
              <main className="flex w-full flex-1 flex-col overflow-hidden py-4">
                <div className="flex flex-col items-start px-4 py-10 border-b-[1px]">
                  <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                  <FormGenerator />
                </div>
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </SessionProvider>
  );
};

export default layout;
