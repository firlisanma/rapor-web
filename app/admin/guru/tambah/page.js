"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahGuru() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [mapel, setMapel] = useState([]);

  const [form, setForm] = useState({
    id_user: "",
    id_mapel: "",
    nama_guru: "",
    nip: ""
  });

  useEffect(() => {
  fetch("/api/admin/user")
    .then(res => res.json())
    .then(data => {
      console.log("DEBUG USERS:", data.users); // ⬅️ penting
      setUsers(
        (data.users || []).filter(u => u.id_role === 2)
      );
    });

  fetch("/api/admin/mapel")
    .then(res => res.json())
    .then(data => setMapel(data.mapel || []));
}, []);


  function set(name, val) {
    setForm({ ...form, [name]: val });
  }

  async function submit(e) {
    e.preventDefault();
    await fetch("/api/admin/guru/tambah", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    router.push("/admin/guru");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Tambah Guru</h2>
      <form onSubmit={submit}>
        <select value={form.id_user} onChange={e => set("id_user", e.target.value)}>
          <option value="">-- Pilih User Guru --</option>
          {users.map(u => (
            <option key={u.id_user} value={u.id_user}>{u.username}</option>
          ))}
        </select><br /><br />

        <select value={form.id_mapel} onChange={e => set("id_mapel", e.target.value)}>
          <option value="">-- Pilih Mapel --</option>
          {mapel.map(m => (
            <option key={m.id_mapel} value={m.id_mapel}>{m.nama_mapel}</option>
          ))}
        </select><br /><br />

        <input placeholder="Nama Guru" value={form.nama_guru}
               onChange={e => set("nama_guru", e.target.value)} /><br /><br />

        <input placeholder="NIP (opsional)" value={form.nip}
               onChange={e => set("nip", e.target.value)} /><br /><br />

        <button>Simpan</button>
      </form>
    </div>
  );
}
