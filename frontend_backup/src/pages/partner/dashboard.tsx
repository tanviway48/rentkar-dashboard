import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { getAssignedOrders, updateOrderStatus, setAvailability } from "../../services/api";

export default function PartnerDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<any[]>([]);
  const [available, setAvailable] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!user) router.push("/");
    else if (user.role !== "partner") router.push("/admin/dashboard");
  }, [user, router]);

  useEffect(() => {
    if (user?.role === "partner") fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await getAssignedOrders();
      setOrders(res.data);
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to fetch orders" });
    }
  };

  const toggleAvailability = async () => {
    try {
      const res = await setAvailability(!available);
      setAvailable(res.data.available);
      setMessage({ type: "success", text: "Availability updated" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to update availability" });
    }
  };

  const updateStatus = async (orderId: string, status: string) => {
    try {
      await updateOrderStatus(orderId, status);
      fetchOrders();
      setMessage({ type: "success", text: "Order status updated" });
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to update status" });
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Created":
        return { backgroundColor: "#facc15", color: "#1f2937", padding: "0.2rem 0.6rem", borderRadius: "0.5rem" }; // yellow
      case "Assigned":
        return { backgroundColor: "#3b82f6", color: "#fff", padding: "0.2rem 0.6rem", borderRadius: "0.5rem" }; // blue
      case "Picked":
        return { backgroundColor: "#8b5cf6", color: "#fff", padding: "0.2rem 0.6rem", borderRadius: "0.5rem" }; // purple
      case "Delivered":
        return { backgroundColor: "#10b981", color: "#fff", padding: "0.2rem 0.6rem", borderRadius: "0.5rem" }; // green
      case "Cancelled":
        return { backgroundColor: "#ef4444", color: "#fff", padding: "0.2rem 0.6rem", borderRadius: "0.5rem" }; // red
      default:
        return {};
    }
  };

  if (!user || user.role !== "partner") return null;

  return (
    <div className="container">
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Partner Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <p style={{ marginBottom: "1rem" }}>
        Availability: <strong>{available ? "Online" : "Offline"}</strong>{" "}
        <button onClick={toggleAvailability}>{available ? "Go Offline" : "Go Online"}</button>
      </p>

      {message.text && <p className={message.type === "error" ? "error" : "success"}>{message.text}</p>}

      <section>
        <h2>Assigned Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.customerName}</td>
                <td>
                  <span style={getStatusBadgeStyle(order.status)}>{order.status}</span>
                </td>
                <td>
                  <select onChange={e => updateStatus(order._id, e.target.value)} value={order.status}>
                    <option value="Created">Created</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Picked">Picked</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
