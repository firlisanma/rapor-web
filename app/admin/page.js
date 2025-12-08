"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  // Proteksi halaman
  useEffect(() => {
    const user = localStorage.getItem("rapor_user");
    if (!user) return router.replace("/login");

    const data = JSON.parse(user);
    if (data.roleId !== 1) {
      return router.replace("/login");
    }
  }, []);

  const menuItems = [
    { title: "Kelola User", path: "/admin/user" },
    { title: "Kelola Siswa", path: "/admin/siswa" },
    { title: "Kelola Kelas", path: "/admin/kelas" },
    { title: "Kelola Guru", path: "/admin/guru" },
    { title: "Kelola Wali Kelas", path: "/admin/walikelas" },
    { title: "Kelola Mapel", path: "/admin/mapel" },
    { title: "Rapor & Grafik", path: "/admin/rapor" },
    { title: "Tahun Ajaran", path: "/admin/tahun-ajaran" },
  ];

  return (
    <div style={container}>
      
      {/* NAVBAR */}
      <div style={navbar}>
        <h2 style={{ margin: 0 }}>Dashboard Admin</h2>
        <button 
          style={logoutBtn}
          onClick={() => {
            localStorage.removeItem("rapor_user");
            router.replace("/login");
          }}
        >
          Logout
        </button>
      </div>

      {/* GRID MENU */}
      <div style={gridMenu}>
        {menuItems.map((item, i) => (
          <div 
            key={i} 
            style={card}
            onClick={() => router.push(item.path)}
          >
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== CSS INLINE STYLE ===== */

const container = {
  minHeight: "100vh",
  background: "#f4f4f4",
  padding: "20px",
};

const navbar = {
  background: "white",
  padding: "15px 20px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const logoutBtn = {
  background: "#ff4d4d",
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "6px",
  cursor: "pointer"
};

const gridMenu = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
};

const card = {
  background: "white",
  padding: "30px 20px",
  borderRadius: "12px",
  textAlign: "center",
  fontSize: "18px",
  fontWeight: "500",
  cursor: "pointer",
  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
  transition: "0.2s",
  userSelect: "none",
};
