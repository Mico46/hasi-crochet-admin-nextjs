"use client";

import { useState } from "react";
import { useData } from "@/lib/data-context";
import { Search, Eye, Clock, Sparkles, Truck, CheckCircle2, X } from "lucide-react";
import { statusMeta } from "@/lib/data";

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

export default function OrdersPage() {
  const data = useData();
  const { orders, setOrders } = data;
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const statuses = ["all", "pending", "processing", "shipped", "delivered", "cancelled"];
  const filtered = orders.filter((o) => {
    const mStatus = statusFilter === "all" || o.status === statusFilter;
    const mSearch = o.customer?.toLowerCase().includes(search.toLowerCase()) || o.id?.includes(search);
    return mStatus && mSearch;
  });

  function updateStatus(id, status) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
    if (selected?.id === id) setSelected((prev) => (prev ? { ...prev, status } : null));
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-48 flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <Search size={15} style={{ color: "var(--muted-foreground)" }} />
          <input type="text" placeholder="Search by name or order ID..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm" style={{ color: "var(--foreground)" }} />
        </div>
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {statuses.map((s) => {
            const label = s === "all" ? "All" : statusMeta[s].label;
            return (
              <button key={s} onClick={() => setStatusFilter(s)}
                className="shrink-0 px-3 py-2 rounded-xl text-xs font-medium capitalize transition-all"
                style={statusFilter === s ? { background: "var(--primary)", color: "var(--primary-foreground)" } : { background: "var(--card)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}>
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Table */}
        <div className="lg:col-span-3 rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  {["Order", "Customer", "Total", "Status", "Date"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => {
                  const { label, bg, text } = statusMeta[o.status];
                  const StatusIcon = statusIcons[o.status];
                  return (
                    <tr key={o.id}
                      onClick={() => setSelected(o)}
                      className="cursor-pointer transition-colors"
                      style={{ borderBottom: "1px solid var(--border)", background: selected?.id === o.id ? "var(--secondary)" : undefined }}>
                      <td className="px-4 py-3 font-semibold text-xs" style={{ color: "var(--primary)" }}>{o.id}</td>
                      <td className="px-4 py-3 text-xs font-medium" style={{ color: "var(--foreground)" }}>{o.customer}</td>
                      <td className="px-4 py-3 text-xs font-semibold" style={{ color: "var(--foreground)" }}>${o.total}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}><StatusIcon size={12} />{label}</span>
                      </td>
                      <td className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>{toDate(o.date)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-2 rounded-2xl p-5 space-y-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          {!selected ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3">
              <Eye size={32} style={{ color: "var(--muted-foreground)", opacity: 0.4 }} />
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Select an order to view details</p>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--primary)" }}>{selected.id}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{toDate(selected.date)}</p>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusMeta[selected.status]?.bg} ${statusMeta[selected.status]?.text}`}>
                  {statusMeta[selected.status]?.label}
                </span>
              </div>

              <div className="space-y-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
                <p><span className="font-medium" style={{ color: "var(--foreground)" }}>{selected.customer}</span></p>
                <p>{selected.email}</p>
                <p>{selected.phone}</p>
                <p>{selected.address}</p>
              </div>

              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: "var(--foreground)" }}>Items</p>
                <div className="space-y-1.5">
                  {selected.items?.map((item, i) => (
                    <div key={i} className="flex justify-between text-xs">
                      <span style={{ color: "var(--muted-foreground)" }}>{item.productName} x {item.quantity}</span>
                      <span className="font-medium" style={{ color: "var(--foreground)" }}>${(item.productPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm font-semibold pt-1" style={{ borderTop: "1px solid var(--border)", color: "var(--foreground)" }}>
                    <span>Total</span><span style={{ color: "var(--primary)" }}>${selected.total}</span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold mb-2" style={{ color: "var(--foreground)" }}>Update Status</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
                    <button key={s} onClick={() => updateStatus(selected.id, s)}
                      className={`px-2 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1 justify-center transition-all ${statusMeta[s].bg} ${statusMeta[s].text} ${selected.status === s ? "ring-2 ring-offset-1" : "opacity-70 hover:opacity-100"}`}
                      style={selected.status === s ? { outlineColor: "var(--primary)" } : {}}>
                      {statusMeta[s].label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
