// components/Navbar.tsx
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem"
    }}>
      <h1>Welcome, {user?.name || "User"}</h1>
      <button onClick={logout}>Logout</button>
    </header>
  );
}
