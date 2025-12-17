"use client";

import { useEffect, useState } from "react";

export default function CatatanWaliKelas() {
  const [siswa, setSiswa] = useState([]);
  const [ta, setTa] = useState(null);
  const [catatan, setCatatan] = useState({});

  useEffect(() => {
    async function init() {
      // tahun ajaran aktif
      const taRes = await fetch("/api/guru/tahun-aktif");
      const taData = await taRes.json();
      setTa(taData.ta);

      const user = JSON.parse(localStorage.getItem("rapor_user"));

      // siswa wali kelas
      const sRes = await fetch(
        `/api/walikelas/siswa?id_kelas=${user.id_kelas}`
      );
      const sData = await sRes.json();
      setSiswa(sData.siswa || []);

      // preload catatan dari RAPOR
      const cRes = await fetch(
        `/api/walikelas/catatan?id_kelas=${user.id_kelas}&id_tahun_ajaran=${taData.ta.id_tahun_ajaran}&semester=${taData.ta.semester}`
      );
      const cData = await cRes.json();
      setCatatan(cData.data || {});
    }

    init();
  }, []);

  function ubah(nisn, value) {
    setCatatan(prev => ({
      ...prev,
      [nisn]: value
    }));
  }

  async function simpan() {
    if (!ta) return;

    for (const [nisn, text] of Object.entries(catatan)) {
      await fetch("/api/walikelas/catatan/simpan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nisn,
          catatan_wali: text,
          id_tahun_ajaran: ta.id_tahun_ajaran,
          semester: ta.semester
        })
      });
    }

    alert("Catatan wali kelas berhasil disimpan");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Catatan Wali Kelas</h2>

      {siswa.map((s, i) => (
        <div key={s.nisn} style={{ marginBottom: 20 }}>
          <strong>{i + 1}. {s.nama_siswa}</strong>
          <br />
          <textarea
            rows={6}
            style={{ width: "100%", marginTop: 5 }}
            value={catatan[s.nisn] ?? ""}
            onChange={e => ubah(s.nisn, e.target.value)}
            placeholder="Tulis catatan wali kelas untuk siswa ini..."
          />
        </div>
      ))}

      <button onClick={simpan}>Simpan Catatan</button>
    </div>
  );
}
