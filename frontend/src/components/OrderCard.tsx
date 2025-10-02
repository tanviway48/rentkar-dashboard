// interface OrderCardProps {
//   order: any;
// }

// export default function OrderCard({ order }: OrderCardProps) {
//   return (
//     <div className="card">
//       <p><strong>Order ID:</strong> {order.orderId}</p>
//       <p><strong>Customer:</strong> {order.customerName}</p>
//       <p><strong>Status:</strong> {order.status}</p>
//       <p><strong>Pickup:</strong> {order.pickup.address}</p>
//       <p><strong>Drop:</strong> {order.drop.address}</p>
//       <p><strong>Assigned To:</strong> {order.assignedTo?.name || "Not assigned"}</p>
//     </div>
//   );
// }


// components/OrderCard.tsx
interface OrderCardProps {
  order: any;
  onStatusChange?: (orderId: string, status: string) => void;
}

export default function OrderCard({ order, onStatusChange }: OrderCardProps) {
  return (
    <div className="card">
      <h3>{order.orderId} - {order.status}</h3>
      <p><strong>Customer:</strong> {order.customerName}</p>
      <p><strong>Pickup:</strong> {order.pickup}</p>
      <p><strong>Drop:</strong> {order.drop}</p>
      {onStatusChange && (
        <select value={order.status} onChange={(e) => onStatusChange(order._id, e.target.value)}>
          <option value="Created">Created</option>
          <option value="Assigned">Assigned</option>
          <option value="Picked">Picked</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      )}
    </div>
  );
}
