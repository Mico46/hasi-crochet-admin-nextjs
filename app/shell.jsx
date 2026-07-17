"use client";

import { useState } from "react";
import { DataProvider } from "@/lib/data-context";
import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function Shell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthGuard>
      <DataProvider>
        <div className="flex h-screen overflow-hidden" style={{ background: "var(--background)" }}>
          {sidebarOpen && (
            <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="flex-1 flex flex-col overflow-hidden min-w-0">
            <TopBar onMenuClick={() => setSidebarOpen(true)} />
            <main className="flex-1 overflow-y-auto p-4 md:p-6" style={{ scrollbarWidth: "none" }}>
              {children}
            </main>
          </div>
        </div>
      </DataProvider>
    </AuthGuard>
  );
}
