import axios from "axios";

const API_URL = "http://localhost:5000/api"; // change if your backend URL is different

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to headers
export const setAuthToken = (token: string | null) => {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
};

// ----------------- AUTH -----------------

export const loginUser = (email: string, password: string) => {
  return api.post("/auth/login", { email, password });
};

export const registerUser = (data: { name: string; email: string; password: string; role: string }) => {
  return api.post("/auth/register", data);
};

// ----------------- ORDERS -----------------

export const getOrders = () => {
  return api.get("/orders"); // admin: all orders
};

export const createOrder = (data: { orderId: string; customerName: string; pickup: string; drop: string }) => {
  // Convert pickup/drop to required structure for backend
  return api.post("/orders", {
    orderId: data.orderId,
    customerName: data.customerName,
    pickup: { address: data.pickup, lat: 0, lng: 0 }, // TODO: add map/geolocation later
    drop: { address: data.drop, lat: 0, lng: 0 },
  });
};

export const assignOrder = (orderId: string, partnerId: string) => {
  return api.post(`/orders/${orderId}/assign/${partnerId}`);
};

// ----------------- PARTNERS -----------------

export const getPartners = () => {
  return api.get("/partners"); // admin only; should return list of partner users
};

// ----------------- PARTNER DASHBOARD -----------------

export const getAssignedOrders = () => {
  return api.get("/partners/orders"); // partner only
};

export const updateOrderStatus = (orderId: string, status: string) => {
  return api.patch(`/partners/orders/${orderId}/status`, { status });
};

export const setAvailability = (available: boolean) => {
  return api.patch("/partners/availability", { available });
};
