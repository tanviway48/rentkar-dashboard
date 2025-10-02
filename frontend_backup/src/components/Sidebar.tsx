// components/Sidebar.tsx
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside style={{
      width: "250px",
      background: "var(--card-bg)",
      borderRight: "1px solid var(--border-color)",
      padding: "2rem",
    }}>
      <h2 style={{ color: "var(--primary-color)", marginBottom: "1.5rem" }}>RENTKAR</h2>
      <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/orders">Orders</Link>
        <Link href="/admin/partners">Partners</Link>
      </nav>
    </aside>
  );
}
