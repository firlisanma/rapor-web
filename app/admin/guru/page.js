"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function GuruPage() {
  const router = useRouter();
  const [guru, setGuru] = useState([]);

  useEffect(() => {
    fetch("/api/admin/guru")
      .then(r => r.json())
      .then(d => setGuru(d.guru || []));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Kelola Guru</h1>

      <button onClick={() => router.push("/admin/guru/tambah")}>
        + Tambah Guru
      </button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Guru</th>
            <th>User Login</th>
            <th>Mapel</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {guru.map((g, i) => (
            <tr key={g.id_guru}>
              <td>{i + 1}</td>
              <td>{g.nama_guru}</td>
              <td>{g.user?.username}</td>
              <td>{g.mapel?.nama_mapel}</td>
              <td>
                <button
  onClick={async () => {
    const res = await fetch(`/api/admin/guru/hapus/${g.id_guru}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.status) {
      window.location.reload();
    } else {
      alert(data.message);
    }
  }}
>
  Hapus
</button>

              </td>
            </tr>
          ))}
          {guru.length === 0 && (
            <tr><td colSpan="5">Belum ada data.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
