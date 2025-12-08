"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahUser() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [roleId, setRoleId] = useState(1);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/admin/user/tambah", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password, nama_lengkap: nama, roleId }),
});

const data = await res.json();
console.log("API RESPONSE:", data);

if (!data.status) {
  alert("Gagal menambah user: " + data.error);
  return;
}

router.push("/admin/user");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tambah User</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <input
          placeholder="Nama Lengkap"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />

        <br /><br />

        <select value={roleId} onChange={(e) => setRoleId(Number(e.target.value))}>
          <option value={1}>Admin</option>
          <option value={2}>Guru</option>
          <option value={3}>Wali Kelas</option>
        </select>

        <br /><br />

        <button>Tambah</button>
      </form>
    </div>
  );
}
