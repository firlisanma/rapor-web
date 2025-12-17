"use client";

import { useEffect, useState } from "react";

export default function InputSikap() {
  const [siswa, setSiswa] = useState([]);
  const [ta, setTa] = useState(null);
  const [sikap, setSikap] = useState([]);
  const [nilai, setNilai] = useState({});

  useEffect(() => {
  async function init() {
    // tahun ajaran aktif
    const taRes = await fetch("/api/guru/tahun-aktif");
    const taData = await taRes.json();
    setTa(taData.ta);

    const user = JSON.parse(localStorage.getItem("rapor_user"));
    if (!user?.id_kelas || !taData.ta) return;

    // siswa kelas wali
    const sRes = await fetch(
      `/api/walikelas/siswa?id_kelas=${user.id_kelas}`
    );
    const sData = await sRes.json();
    setSiswa(sData.siswa || []);

    // master sikap
    const sikapRes = await fetch("/api/admin/sikap");
    const sikapData = await sikapRes.json();
    setSikap(sikapData.data || sikapData.sikap || sikapData || []);

    // 🔥 PRELOAD SIKAP (INI YANG SEBELUMNYA TIDAK PERNAH KEHIT)
    const preloadRes = await fetch(
      `/api/walikelas/sikap?id_kelas=${user.id_kelas}&id_tahun_ajaran=${taData.ta.id_tahun_ajaran}&semester=${taData.ta.semester}`
    );

    if (preloadRes.ok) {
      const preloadData = await preloadRes.json();
      console.log("PRELOAD NILAI SIKAP:", preloadData);
      setNilai(preloadData.nilai || {});
    }
  }

  init();
}, []);

  function setNilaiSikap(nisn, id_sikap, v) {
    setNilai(prev => ({
    ...prev,
    [`${nisn}_${id_sikap}`]: v
  }));
}

  async function simpan() {
  if (!ta) return;

  console.log("🚀 SIMPAN DIJALANKAN");
  console.log("📦 DATA NILAI STATE:", nilai);

  const entries = Object.entries(nilai);

  for (const [key, v] of entries) {
    const [nisn, id_sikap] = key.split("_");

    console.log("📤 KIRIM KE API:", {
      nisn,
      id_sikap,
      nilai: v,
      id_tahun_ajaran: ta.id_tahun_ajaran,
      semester: ta.semester
    });

    await fetch("/api/walikelas/sikap/simpan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nisn,
        id_sikap: Number(id_sikap),
        nilai: v,
        id_tahun_ajaran: ta.id_tahun_ajaran,
        semester: ta.semester
      })
    });
  }

  alert("Sikap berhasil disimpan");
}

  const kelakuan = sikap.filter(
  s => s.kategori_sikap?.toLowerCase() === "kelakuan"
);

const kepribadian = sikap.filter(
  s => s.kategori_sikap?.toLowerCase() === "kepribadian"
);


  return (
    <div style={{ padding: 20 }}>
      <h2>Input Sikap Wali Kelas</h2>

      {siswa.map((s, i) => (
        <div key={s.nisn} style={{ marginBottom: 30 }}>
          <strong>{i + 1}. {s.nama_siswa}</strong>

          <table border="1" cellPadding="6" style={{ marginTop: 10 }}>
            <thead>
              <tr>
                <th>No</th>
                <th>Aspek yang Dinilai</th>
                <th>Keterangan</th>
              </tr>
            </thead>
           <tbody>
  {/* ===== KELAKUAN ===== */}
  <tr>
    <td colSpan={3}><b>Kelakuan</b></td>
  </tr>

  {sikap
    .filter(sk => sk.kategori_sikap === "Kelakuan")
    .map((sk, idx) => (
      <tr key={sk.id_sikap}>
        <td>{String.fromCharCode(97 + idx)}.</td>
        <td>{sk.nama_sikap}</td>
        <td>
          <select
            value={nilai[`${s.nisn}_${sk.id_sikap}`] || ""}
            onChange={e =>
              setNilaiSikap(s.nisn, sk.id_sikap, e.target.value)
            }
          >
            <option value="">-</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </td>
      </tr>
    ))}

  {/* ===== KEPRIBADIAN ===== */}
  <tr>
    <td colSpan={3}><b>Kepribadian</b></td>
  </tr>

  {sikap
    .filter(sk => sk.kategori_sikap === "Kepribadian")
    .map((sk, idx) => (
      <tr key={sk.id_sikap}>
        <td>{idx + 1}.</td>
        <td>{sk.nama_sikap}</td>
        <td>
          <select
            value={nilai[`${s.nisn}_${sk.id_sikap}`] || ""}
            onChange={e =>
              setNilaiSikap(s.nisn, sk.id_sikap, e.target.value)
            }
          >
            <option value="">-</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </td>
      </tr>
    ))}
</tbody>
          </table>
        </div>
      ))}

      <button onClick={simpan}>Simpan Sikap</button>
    </div>
  );
}
