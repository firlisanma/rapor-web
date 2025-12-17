"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TahunAjaranPage() {
  const router = useRouter();
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("/api/admin/tahunajaran")
      .then(r => r.json())
      .then(d => setList(d.data || []));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Tahun Ajaran</h1>

      <button onClick={() => router.push("/admin/tahunajaran/tambah")}>
        + Tambah Tahun Ajaran
      </button>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>No</th>
            <th>Tahun Ajaran</th>
            <th>Semester</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {list.map((t, i) => (
            <tr key={t.id_tahun_ajaran}>
              <td>{i + 1}</td>
              <td>{t.tahun_ajaran}</td>
              <td>{t.semester === 1 ? "Ganjil" : "Genap"}</td>
              <td>{t.status}</td>
              <td>
                <button
                  onClick={async () => {
                    const res = await fetch(
                      `/api/admin/tahunajaran/hapus/${t.id_tahun_ajaran}`,
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
