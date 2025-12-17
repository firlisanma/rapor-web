"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TambahWaliKelas() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [kelas, setKelas] = useState([]);

  const [form, setForm] = useState({
    id_user: "",
    id_kelas: "",
    nama_wali: ""
  });

  useEffect(() => {
    // user role wali kelas (id_role = 3)
    fetch("/api/admin/user")
      .then(r => r.json())
      .then(d =>
        setUsers((d.users || []).filter(u => u.id_role === 3))
      );

    fetch("/api/admin/kelas")
      .then(r => r.json())
      .then(d => setKelas(d || []));
  }, []);

  function set(name, val) {
    setForm({ ...form, [name]: val });
  }

  async function submit(e) {
    e.preventDefault();

    const res = await fetch("/api/admin/walikelas/tambah", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const d = await res.json();
    if (!d.status) {
      alert(d.error);
      return;
    }

    router.push("/admin/walikelas");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Tambah Wali Kelas</h2>

      <form onSubmit={submit}>
        <select value={form.id_user} onChange={e => set("id_user", e.target.value)}>
          <option value="">-- Pilih User Wali Kelas --</option>
          {users.map(u => (
            <option key={u.id_user} value={u.id_user}>{u.username}</option>
          ))}
        </select>
        <br /><br />

        <select value={form.id_kelas} onChange={e => set("id_kelas", e.target.value)}>
          <option value="">-- Pilih Kelas --</option>
          {kelas.map(k => (
            <option key={k.id_kelas} value={k.id_kelas}>{k.nama_kelas}</option>
          ))}
        </select>
        <br /><br />

        <input
          placeholder="Nama Wali Kelas"
          value={form.nama_wali}
          onChange={e => set("nama_wali", e.target.value)}
        />
        <br /><br />

        <button>Simpan</button>
      </form>
    </div>
  );
}
