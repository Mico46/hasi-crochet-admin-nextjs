'use client';
import { useData } from "@/lib/data-context"
import { Edit } from "lucide-react";

export default function adminPage() {
    const data = useData();
    const { user } = data


    return (
        <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                    <p className="text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
                        Users List
                    </p>
                    <h1  className="text-xs font-medium flex items-center gap-1"
            style={{ color: "var(--primary)" }}>Total: {user.length}</h1>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr style={{ borderBottom: "1px solid var(--border)" }}>
                                {["Name", "email", "Phone", "Address", "Created At","action"].map((h) => (
                                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map((u) => {
                                    return (
                                        <tr key={u.id} style={{ borderBottom: "1px solid var(--border)" }} className="hover:bg-secondary/30 transition-colors">
                                            <td className="px-5 py-3 font-medium text-xs" style={{ color: "var(--primary)" }}>{u.name}</td>
                                            <td className="px-5 py-3 font-medium text-xs" style={{ color: "var(--primary)" }}>{u.email}</td>
                                            <td className="px-5 py-3 font-medium text-xs" style={{ color: "var(--primary)" }}>{u.phone}</td>
                                            <td className="px-5 py-3 font-medium text-xs" style={{ color: "var(--primary)" }}>{u.address}</td>
                                            <td className="px-5 py-3 font-medium text-xs" style={{ color: "var(--primary)" }}>{u.createdAt.toDate().toISOString().split("T")[0]}</td>
                                            <td><button onClick={()=>{alert("edit")}}><Edit size={12} /></button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}