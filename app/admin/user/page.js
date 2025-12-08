"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  // Fetch semua user
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/admin/user");
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kelola User</h1>

      <button 
        onClick={() => router.push("/admin/user/tambah")}
        style={{ marginBottom: "15px" }}
      >
        + Tambah User
      </button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>No</th>
            <th>ID User</th>
            <th>Username</th>
            <th>Nama Lengkap</th>
            <th>Role</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{i + 1}</td>         {/* Nomor urut UI */}
              <td>{u.id_user}</td>
              <td>{u.username}</td>
              <td>{u.nama_lengkap}</td>
              <td>{u.role?.nama_role}</td>
              <td>
              
                <button
  onClick={async () => {
    const res = await fetch(`/api/admin/user/hapus/${u.id_user}`, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log("DELETE RESPONSE:", data);

    if (data.status) {
      window.location.reload();
    } else {
      alert("Gagal menghapus user: " + (data.error || "Tidak diketahui"));
    }
  }}
>
  Hapus
</button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
