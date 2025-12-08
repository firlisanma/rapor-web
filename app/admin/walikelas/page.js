"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WaliKelasPage() {
  const router = useRouter();
  const [list, setList] = useState([]); // default array
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/walikelas");
        const data = await res.json();

        // Jika server balikin array, set langsung.
        // Kalau bukan array (mis. { error: "..." }), jadikan kosong dan simpan error.
        if (Array.isArray(data)) {
          setList(data);
          setError("");
        } else {
          setList([]);
          setError(data?.error || "Data wali kelas tidak tersedia");
          console.warn("GET /api/admin/walikelas returned:", data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Gagal memuat data (cek server).");
        setList([]);
      }
    }
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kelola Wali Kelas</h1>

      <button
        onClick={() => router.push("/admin/walikelas/tambah")}
        style={{ marginBottom: "15px" }}
      >
        + Tambah Wali Kelas
      </button>

      {error && (
        <div style={{ color: "red", marginBottom: 12 }}>
          {error}
        </div>
      )}

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>No</th>
            <th>ID Wali</th>
            <th>Nama Wali</th>
            <th>User Login</th>
            <th>Kelas</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                Tidak ada data.
              </td>
            </tr>
          ) : (
            list.map((w, i) => (
              <tr key={w.id_wali ?? i}>
                <td>{i + 1}</td>
                <td>{w.id_wali}</td>
                <td>{w.nama_wali}</td>
                <td>{w.user?.username}</td>
                <td>{w.kelas?.nama_kelas}</td>
                <td>
                  <button
                    onClick={async () => {
                      const res = await fetch(`/api/admin/walikelas/hapus/${w.id_wali}`, {
                        method: "DELETE",
                      });
                      const data = await res.json();
                      if (data.status) window.location.reload();
                      else alert("Gagal hapus wali kelas: " + (data.error || ""));
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
