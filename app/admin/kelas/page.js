"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function KelasPage() {
  const router = useRouter();
  const [list, setList] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/admin/kelas");
      const data = await res.json();
      setList(Array.isArray(data) ? data : []);
    }
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kelola Kelas</h1>

      <button
        onClick={() => router.push("/admin/kelas/tambah")}
        style={{ marginBottom: "15px" }}
      >
        + Tambah Kelas
      </button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Nama Kelas</th>
            <th>Tingkat</th>
            <th>Jurusan</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {list.map((k, i) => (
            <tr key={k.id_kelas}>
              <td>{i + 1}</td>
              <td>{k.id_kelas}</td>
              <td>{k.nama_kelas}</td>
              <td>{k.tingkat}</td>
              <td>{k.jurusan}</td>
              <td>
                <button
                  onClick={async () => {
                    const res = await fetch(`/api/admin/kelas/hapus/${k.id_kelas}`, {
                      method: "DELETE",
                    });
                    const data = await res.json();
                    if (data.status) window.location.reload();
                    else alert("Gagal menghapus kelas");
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
