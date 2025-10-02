import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { getOrders, getPartners, createOrder, assignOrder } from "../../services/api";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [newOrder, setNewOrder] = useState({ orderId: "", customerName: "", pickup: "", drop: "" });
  const [assignData, setAssignData] = useState({ orderId: "", partnerId: "" });
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!user) router.push("/");
    else if (user.role !== "admin") router.push("/partner/dashboard");
  }, [user, router]);

  useEffect(() => {
    if (user?.role === "admin") {
      fetchOrders();
      fetchPartners();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data.orders);
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to fetch orders" });
    }
  };

  const fetchPartners = async () => {
    try {
      const res = await getPartners();
      setPartners(res.data.partners || []);
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to fetch partners" });
    }
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOrder(newOrder);
      setMessage({ type: "success", text: "Order created successfully!" });
      setNewOrder({ orderId: "", customerName: "", pickup: "", drop: "" });
      fetchOrders();
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to create order" });
    }
  };

  const handleAssignOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await assignOrder(assignData.orderId, assignData.partnerId);
      setMessage({ type: "success", text: "Order assigned successfully!" });
      setAssignData({ orderId: "", partnerId: "" });
      fetchOrders();
    } catch (err: any) {
      setMessage({ type: "error", text: err.response?.data?.message || "Failed to assign order" });
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Created":
        return { backgroundColor: "#facc15", color: "#1f2937", padding: "0.2rem 0.6rem", borderRadius: "0.5rem" };
      case "Assigned":
        return { backgroundColor: "#3b82f6", color: "#fff", padding: "0.2rem 0.6rem", borderRadius: "0.5rem" };
      case "Picked":
        return { backgroundColor: "#8b5cf6", color: "#fff", padding: "0.2rem 0.6rem", borderRadius: "0.5rem" };
      case "Delivered":
        return { backgroundColor: "#10b981", color: "#fff", padding: "0.2rem 0.6rem", borderRadius: "0.5rem" };
      case "Cancelled":
        return { backgroundColor: "#ef4444", color: "#fff", padding: "0.2rem 0.6rem", borderRadius: "0.5rem" };
      default:
        return {};
    }
  };

  if (!user || user.role !== "admin") return null;

  return (
    <div className="container">
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Admin Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>

      {message.text && <p className={message.type === "error" ? "error" : "success"}>{message.text}</p>}

      <section>
        <h2>Create New Order</h2>
        <form onSubmit={handleCreateOrder}>
          <input type="text" placeholder="Order ID" value={newOrder.orderId} onChange={e => setNewOrder({ ...newOrder, orderId: e.target.value })} required />
          <input type="text" placeholder="Customer Name" value={newOrder.customerName} onChange={e => setNewOrder({ ...newOrder, customerName: e.target.value })} required />
          <input type="text" placeholder="Pickup Address" value={newOrder.pickup} onChange={e => setNewOrder({ ...newOrder, pickup: e.target.value })} required />
          <input type="text" placeholder="Drop Address" value={newOrder.drop} onChange={e => setNewOrder({ ...newOrder, drop: e.target.value })} required />
          <button type="submit">Create Order</button>
        </form>
      </section>

      <section>
        <h2>Assign Order to Partner</h2>
        <form onSubmit={handleAssignOrder}>
          <select value={assignData.orderId} onChange={e => setAssignData({ ...assignData, orderId: e.target.value })} required>
            <option value="">Select Order</option>
            {orders.map(o => <option key={o._id} value={o._id}>{o.orderId} - {o.status}</option>)}
          </select>
          <select value={assignData.partnerId} onChange={e => setAssignData({ ...assignData, partnerId: e.target.value })} required>
            <option value="">Select Partner</option>
            {partners.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>
          <button type="submit">Assign</button>
        </form>
      </section>

      <section>
        <h2>All Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Assigned Partner</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.orderId}</td>
                <td>{order.customerName}</td>
                <td><span style={getStatusBadgeStyle(order.status)}>{order.status}</span></td>
                <td>{order.assignedTo?.name || "Unassigned"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
