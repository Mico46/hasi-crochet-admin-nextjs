"use client";

import { usePathname } from "next/navigation";
import { Bell, Menu } from "lucide-react";
import { useData } from "@/lib/data-context";
import { auth } from "@/lib/firebase";  

const titles = {
  "/dashboard": "Dashboard",
  "/products": "Products",
  "/orders": "Orders",
  "/chat": "Messages",
  "/settings": "Settings",
  "/upload": "Upload Images",
};

export default function TopBar({ onMenuClick }) {
  const pathname = usePathname();
  const data = useData();
  const { user, setUser } = data;
  const totalUnread = data?.totalUnread ?? 0;
  const currentUser = user.find((u) => u.email === auth.currentUser.email);
  return (
    <header
      className="flex items-center gap-3 px-4 md:px-6 py-3 shrink-0"
      style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}
    >
      <button className="lg:hidden p-1.5 rounded-lg" style={{ background: "var(--secondary)" }} onClick={onMenuClick}>
        <Menu size={18} style={{ color: "var(--foreground)" }} />
      </button>
      <div className="flex-1">
        <h1 className="text-base font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
          {titles[pathname] || "Admin"}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-xl" style={{ background: "var(--secondary)" }}>
          <Bell size={17} style={{ color: "var(--muted-foreground)" }} />
          {totalUnread > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: "var(--primary)" }} />
          )}
        </button>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}>
          {currentUser.name[0].toUpperCase()}
        </div>
       
      </div>
       <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}> ({currentUser.role})</p>
    </header>
  );
}
