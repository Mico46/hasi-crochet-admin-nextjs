"use client";

import { useData } from "@/lib/data-context";
import { useRouter } from "next/navigation";
import {
  TrendingUp, TrendingDown, ShoppingBag, Package, Users,
  DollarSign, ChevronRight, AlertCircle,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { salesData, categoryData, statusMeta } from "@/lib/data";
import { Clock, Sparkles, Truck, CheckCircle2, X } from "lucide-react";

const statusIcons = {
  pending: Clock,
  processing: Sparkles,
  shipped: Truck,
  delivered: CheckCircle2,
  cancelled: X,
};

function toDate(timestamp) {
  if (!timestamp) return "";
  if (timestamp.toDate) return timestamp.toDate().toDateString();
  return new Date(timestamp).toDateString();
}

export default function DashboardPage() {
  const data = useData();
  const router = useRouter();
  const { products, orders, totalRevenue, pendingCount } = data;

  const activeProducts = products.filter((p) => p.active).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock < 5).length;

  const stats = [
    { label: "Total Revenue", value: `Birr -${totalRevenue.toLocaleString()}`, sub: "+12% this month", icon: DollarSign, up: true },
    { label: "Orders", value: orders.length, sub: `${pendingCount} pending`, icon: ShoppingBag, up: true },
    { label: "Active Products", value: activeProducts, sub: `${lowStock} low stock`, icon: Package, up: false },
    { label: "Customers", value: 142, sub: "+8 this week", icon: Users, up: true },
  ];

  const recent = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, sub, icon: Icon, up }) => (
          <div key={label} className="p-4 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "var(--secondary)" }}>
                <Icon size={18} style={{ color: "var(--primary)" }} />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium" style={{ color: up ? "#16a34a" : "#dc2626" }}>
                {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              </div>
            </div>
            <p className="text-2xl font-bold mb-0.5" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
              {value}
            </p>
            <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>{label}</p>
            <p className="text-xs mt-0.5 font-medium" style={{ color: "var(--muted-foreground)" }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 p-5 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
              Revenue Overview
            </p>
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "var(--secondary)", color: "var(--muted-foreground)" }}>
              6 months
            </span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8c4b2f" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8c4b2f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: "var(--foreground)" }}
              />
              <Area type="monotone" dataKey="sales" stroke="#8c4b2f" strokeWidth={2.5} fill="url(#grad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="p-5 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <p className="text-sm font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
            Sales by Category
          </p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                {categoryData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: c.color }} />
                  <span style={{ color: "var(--muted-foreground)" }}>{c.name}</span>
                </div>
                <span className="font-medium" style={{ color: "var(--foreground)" }}>{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <p className="text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
            Recent Orders
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="text-xs font-medium flex items-center gap-1"
            style={{ color: "var(--primary)" }}
          >
            View all <ChevronRight size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Order", "Customer", "Items", "Total", "Status", "Date"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((o) => {
                const { label, bg, text } = statusMeta[o.status];
                const StatusIcon = statusIcons[o.status];
                return (
                  <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-5 py-3 font-medium text-xs" style={{ color: "var(--primary)" }}>{o.id}</td>
                    <td className="px-5 py-3 text-xs font-medium" style={{ color: "var(--foreground)" }}>{o.customer}</td>
                    <td className="px-5 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{o.items?.length || 0} item{(o.items?.length || 0) !== 1 ? "s" : ""}</td>
                    <td className="px-5 py-3 text-xs font-semibold" style={{ color: "var(--foreground)" }}>Birr {o.total}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
                        <StatusIcon size={12} />{label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{toDate(o.date)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low stock alert */}
      {products.filter((p) => p.stock < 5).length > 0 && (
        <div className="p-4 rounded-2xl flex items-start gap-3" style={{ background: "#fef9f0", border: "1px solid #f59e0b33" }}>
          <AlertCircle size={18} className="shrink-0 mt-0.5" style={{ color: "#d97706" }} />
          <div>
            <p className="text-sm font-semibold" style={{ color: "#92400e" }}>Low Stock Alert</p>
            <p className="text-xs mt-0.5" style={{ color: "#b45309" }}>
              {products.filter((p) => p.stock < 5 && p.stock > 0).map((p) => p.name).join(", ")} {products.filter((p) => p.stock === 0).length > 0 && `· Out of stock: ${products.filter((p) => p.stock === 0).map((p) => p.name).join(", ")}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
