"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("Memproses login...");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      // Jika error dari server
      if (!res.ok || !data.user) {
        setMessage(data.message || "Login gagal");
        return;
      }

      // Simpan user ke localStorage
      localStorage.setItem("rapor_user", JSON.stringify(data.user));

      // Ambil role (sesuai API kamu sekarang: roleName)
      const roleName =
        data.user.roleName?.toLowerCase() ||
        data.user.role?.nama_role?.toLowerCase() ||
        "";

      setMessage(`Login berhasil. Role: ${roleName}`);

      // Redirect berdasarkan role
      if (roleName === "admin") {
        router.push("/admin");
      } else if (roleName === "guru") {
        router.push("/guru");
      } else if (roleName === "walikelas") {
        router.push("/walikelas");
      } else {
        setMessage("Role tidak dikenali.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f4f4",
      padding: "20px"
    }}>
      <div style={{
        background: "white",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "380px"
      }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: "25px",
          fontSize: "24px",
          fontWeight: "600"
        }}>
          Login Rapor Web
        </h2>

        {/* FORM LOGIN */}
        <form 
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          onSubmit={handleLogin}
        >
          <input 
            type="text" 
            placeholder="Username" 
            style={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input 
            type="password" 
            placeholder="Password" 
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Dummy dropdown (belum dihubungkan ke DB, nanti bisa) */}
          <select style={inputStyle}>
            <option value="">Pilih Tahun Ajaran</option>
            <option>2024/2025</option>
            <option>2023/2024</option>
          </select>

          <select style={inputStyle}>
            <option value="">Semester</option>
            <option>Ganjil</option>
            <option>Genap</option>
          </select>

          <button style={{
            background: "#0070f3",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.2s"
          }}>
            Login
          </button>
        </form>

        {/* MESSAGE */}
        <p style={{ marginTop: "10px", textAlign: "center", color: "red" }}>
          {message}
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "14px"
};
