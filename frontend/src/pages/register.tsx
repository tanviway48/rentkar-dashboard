import { useState } from "react";
import Link from "next/link";
import { registerUser } from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser({ name, email, password, role: "partner" });
      setMessage("User registered successfully. You can now login.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-register-container">
      <h1>RENTKAR Register</h1>
      {message && (
        <p className={message.includes("successfully") ? "success" : "error"} style={{ textAlign: "center" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>

      <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.95rem" }}>
        Already have an account?{" "}
        <Link href="/" style={{ color: "var(--primary-color)", fontWeight: 500 }}>
          Login here
        </Link>
      </p>
    </div>
  );
}
