"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WaliKelasPage() {
  const router = useRouter();
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("/api/admin/walikelas")
      .then(r => r.json())
      .then(d => setList(d.data || []));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Kelola Wali Kelas</h1>

      <button onClick={() => router.push("/admin/walikelas/tambah")}>
        + Tambah Wali Kelas
      </button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Wali</th>
            <th>User Login</th>
            <th>Kelas</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {list.map((w, i) => (
            <tr key={w.id_wali}>
              <td>{i + 1}</td>
              <td>{w.nama_wali}</td>
              <td>{w.user?.username}</td>
              <td>{w.kelas?.nama_kelas}</td>
              <td>
                <button
                  onClick={async () => {
                    const res = await fetch(
                      `/api/admin/walikelas/hapus/${w.id_wali}`,
                      { method: "DELETE" }
                    );
                    const d = await res.json();
                    if (d.status) window.location.reload();
                    else alert(d.error);
                  }}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {list.length === 0 && (
            <tr><td colSpan="5">Belum ada data.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
