"use client";

import dynamic from "next/dynamic";

const Shell = dynamic(() => import("./shell"), { ssr: false });

export default function Layout({ children }) {
  return <Shell>{children}</Shell>;
}
