"use client";
import { useEffect, useState } from "react";

export default function InputNilaiGuru() {
  const [ta, setTa] = useState(null);
  const [kelas, setKelas] = useState([]);
  const [kelasId, setKelasId] = useState("");
  const [kelasTerpilih, setKelasTerpilih] = useState(null);
  const [siswa, setSiswa] = useState([]);
  const [nilai, setNilai] = useState({});
  const [loading, setLoading] = useState(false);

  // init
  useEffect(() => {
    async function init() {
      const resTA = await fetch("/api/guru/tahun-aktif");
      const dTA = await resTA.json();
      setTa(dTA.ta);

      const resKelas = await fetch("/api/guru/kelas");
      const dKelas = await resKelas.json();
      setKelas(dKelas);
    }
    init();
  }, []);

  async function loadSiswa() {
  if (!kelasId) {
    alert("Pilih kelas terlebih dahulu");
    return;
  }

  if (!ta) {
    alert("Tahun ajaran belum siap");
    return;
  }

  try {
    setLoading(true);

    // 1️⃣ Ambil siswa per kelas
    const resSiswa = await fetch(
      `/api/guru/kelas-siswa?id_kelas=${kelasId}`
    );
    const dataSiswa = await resSiswa.json();

    const listSiswa = dataSiswa.siswa || [];
    setSiswa(listSiswa);

    // 2️⃣ Ambil nilai lama (PRELOAD)
    const resNilai = await fetch(
      `/api/guru/nilai?id_kelas=${kelasId}&id_tahun_ajaran=${ta.id_tahun_ajaran}&semester=${ta.semester}`
    );

    // 🔎 kalau API preload gagal, jangan bikin UI mati
    if (resNilai.ok) {
      const dataNilai = await resNilai.json();

      // bentuk HARUS: { nisn: nilai }
      setNilai(dataNilai.nilai || {});
    } else {
      console.warn("Preload nilai gagal:", resNilai.status);
      setNilai({});
    }

  } catch (err) {
    console.error("ERROR loadSiswa:", err);
    alert("Gagal memuat data siswa");
  } finally {
    setLoading(false);
  }
}

  function ubahNilai(nisn, v) {
    setNilai(prev => ({
      ...prev,
      [nisn]: v === "" ? "" : Number(v)
    }));
  }

  async function simpan() {
    if (!ta || !kelasId) {
      alert("Data belum lengkap");
      return;
    }

    const payload = siswa.map(s => ({
      nisn: s.nisn,
      nilai_angka: nilai[s.nisn] ?? 0
    }));

    const res = await fetch("/api/guru/nilai/simpan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_kelas: Number(kelasId),
        id_tahun_ajaran: ta.id_tahun_ajaran,
        semester: ta.semester,
        data: payload
      })
    });

    if (!res.ok) {
      alert("Gagal menyimpan nilai");
      return;
    }

    alert("Nilai berhasil disimpan");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Input Nilai Guru</h1>

      {ta && (
        <p>
          Tahun Ajaran Aktif: {ta.tahun_ajaran} (
          {ta.semester === 1 ? "Ganjil" : "Genap"})
        </p>
      )}

      <label>Pilih Kelas</label><br />
      <select
        value={kelasId}
        onChange={(e) => {
          const id = e.target.value;
          setKelasId(id);
          setKelasTerpilih(
            kelas.find(k => k.id_kelas === Number(id))
          );
          setSiswa([]);
          setNilai({});
        }}
      >
        <option value="">-- Pilih Kelas --</option>
        {kelas.map(k => (
          <option key={k.id_kelas} value={k.id_kelas}>
            {k.nama_kelas}
          </option>
        ))}
      </select>

      <br /><br />
      <button onClick={loadSiswa} disabled={loading}>
        {loading ? "Loading..." : "Load Siswa"}
      </button>

      {kelasTerpilih && (
        <p>
          Menampilkan kelas:
          <b> {kelasTerpilih.nama_kelas}</b>
        </p>
      )}

      {siswa.length > 0 && (
        <>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>No</th>
                <th>NISN</th>
                <th>Nama</th>
                <th>Nilai</th>
              </tr>
            </thead>
            <tbody>
              {siswa.map((s, i) => (
                <tr key={s.nisn}>
                  <td>{i + 1}</td>
                  <td>{s.nisn}</td>
                  <td>{s.nama_siswa}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={nilai[s.nisn] ?? ""}
                      onChange={(e) =>
                        ubahNilai(s.nisn, e.target.value)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <br />
          <button onClick={simpan}>Simpan Nilai</button>
        </>
      )}
    </div>
  );
}
