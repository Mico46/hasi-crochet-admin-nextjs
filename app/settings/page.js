"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import Field from "@/components/Field";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    storeName: "Hasi Crochet Hand Made",
    email: "admin@hasicrochet.com",
    phone: "+251 911 234 567",
    address: "Bole Road, Addis Ababa, Ethiopia",
    currency: "USD",
    shippingFee: "4.99",
    freeShippingThreshold: "60",
    instagramHandle: "@hasicrochet",
    telegramHandle: "@hasicrochet_support",
    fbPixelId: "",
    firestoreProjectId: "hasi-crochet-prod",
    vercelProjectId: "",
  });

  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  const sections = [
    {
      title: "Store Information",
      fields: [
        { key: "storeName", label: "Store Name", type: "text" },
        { key: "email", label: "Contact Email", type: "email" },
        { key: "phone", label: "Phone Number", type: "tel" },
        { key: "address", label: "Address", type: "text" },
      ],
    },
    {
      title: "Pricing & Shipping",
      fields: [
        { key: "currency", label: "Currency", type: "text" },
        { key: "shippingFee", label: "Default Shipping Fee ($)", type: "number" },
        { key: "freeShippingThreshold", label: "Free Shipping Above ($)", type: "number" },
      ],
    },
    {
      title: "Social & Marketing",
      fields: [
        { key: "instagramHandle", label: "Instagram Handle", type: "text" },
        { key: "telegramHandle", label: "Telegram Handle", type: "text" },
        { key: "fbPixelId", label: "Facebook Pixel ID", type: "text" },
      ],
    },
    {
      title: "Integrations",
      fields: [
        { key: "firestoreProjectId", label: "Firebase Project ID", type: "text" },
        { key: "vercelProjectId", label: "Vercel Project ID", type: "text" },
      ],
    },
  ];

  return (
    <div className="max-w-2xl space-y-6">
      {sections.map((section) => (
        <div key={section.title} className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <p className="text-sm font-semibold" style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}>
              {section.title}
            </p>
          </div>
          <div className="px-5 py-4 space-y-4">
            {section.fields.map(({ key, label, type }) => (
              <Field key={key} label={label}>
                <input type={type} value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                  style={{ background: "var(--secondary)", color: "var(--foreground)" }} />
              </Field>
            ))}
          </div>
        </div>
      ))}

      <div className="rounded-2xl p-5 space-y-3" style={{ background: "#fef9f0", border: "1px solid #f59e0b33" }}>
        <p className="text-sm font-semibold" style={{ color: "#92400e", fontFamily: "'Playfair Display', serif" }}>
          Vercel Deployment
        </p>
        <p className="text-xs leading-relaxed" style={{ color: "#b45309" }}>
          This admin panel is ready to deploy on Vercel. Set the following environment variables in your Vercel project settings:
        </p>
        {["NEXT_PUBLIC_FIREBASE_API_KEY", "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN", "NEXT_PUBLIC_FIREBASE_PROJECT_ID", "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET", "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID", "NEXT_PUBLIC_FIREBASE_APP_ID"].map((v) => (
          <code key={v} className="block text-xs px-3 py-1.5 rounded-lg font-mono" style={{ background: "rgba(146,64,14,0.1)", color: "#92400e" }}>
            {v}
          </code>
        ))}
      </div>

      <button onClick={save}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
        style={{ background: saved ? "#16a34a" : "var(--primary)", color: "var(--primary-foreground)" }}>
        {saved ? <><Check size={16} /> Saved!</> : "Save Settings"}
      </button>
    </div>
  );
}
