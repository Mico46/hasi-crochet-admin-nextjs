"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Package, ShoppingBag, MessageCircle, Settings,
  LogOut, Menu, Bell,
} from "lucide-react";
import { useData } from "@/lib/data-context";
import { useAuth } from "@/lib/auth-context";

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const data = useData();
  const { logout, user } = useAuth();
  const pendingCount = data?.pendingCount ?? 0;
  const totalUnread = data?.totalUnread ?? 0;

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  const nav = [
    { id: "/dashboard", label: "Dashboard", icon: LayoutDashboard, badge: 0 },
    { id: "/products", label: "Products", icon: Package, badge: 0 },
    { id: "/orders", label: "Orders", icon: ShoppingBag, badge: pendingCount },
    { id: "/chat", label: "Messages", icon: MessageCircle, badge: totalUnread },
    { id: "/settings", label: "Settings", icon: Settings, badge: 0 },
    { id: "/upload", label: "Upload", icon: Package, badge: 0 },
  ];

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-30 flex flex-col transition-transform duration-300 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      style={{ width: 240, background: "var(--card)", borderRight: "1px solid var(--border)", minHeight: "100vh" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: "var(--primary)" }}>
          🧶
        </div>
        <div>
          <p className="text-sm font-semibold leading-tight" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
            Hasi Crochet
          </p>
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-widest px-3 mb-3" style={{ color: "var(--muted-foreground)" }}>
          Menu
        </p>
        {nav.map(({ id, label, icon: Icon, badge }) => {
          const active = pathname === id;
          return (
            <Link
              key={id}
              href={id}
              onClick={onClose}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all no-underline"
              style={active
                ? { background: "var(--primary)", color: "var(--primary-foreground)" }
                : { color: "var(--muted-foreground)" }
              }
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
              <span className="flex-1 text-left">{label}</span>
              {badge > 0 && (
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
                  style={active
                    ? { background: "rgba(255,255,255,0.25)", color: "var(--primary-foreground)" }
                    : { background: "var(--primary)", color: "var(--primary-foreground)" }
                  }
                >
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="px-3 py-4" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: "var(--secondary)", color: "var(--primary)" }}>
            {user?.email?.[0]?.toUpperCase() || "H"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate" style={{ color: "var(--foreground)" }}>Hasi Admin</p>
            <p className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>{user?.email || "admin@hasicrochet.com"}</p>
          </div>
          <button onClick={handleLogout} className="p-1.5 rounded-lg transition-colors hover:bg-secondary" title="Sign out">
            <LogOut size={14} style={{ color: "var(--muted-foreground)" }} />
          </button>
        </div>
      </div>
    </aside>
  );
}
