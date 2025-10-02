// components/Layout.tsx
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "2rem", background: "#f9fafb" }}>
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
}
