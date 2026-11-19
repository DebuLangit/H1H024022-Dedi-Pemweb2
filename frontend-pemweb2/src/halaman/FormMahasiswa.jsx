import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ambilProgramStudi, simpanMahasiswa } from '../api/layananMahasiswa'
import { galatValidasi, pesanGalat } from '../api/galat'

const NILAI_AWAL = {
  nim: '',
  nama: '',
  email: '',
  program_studi_id: '',
  angkatan: new Date().getFullYear(),
  ipk: '',
  aktif: true,
}

export default function FormMahasiswa() {
  const [formulir, setFormulir] = useState(NILAI_AWAL)
  const [daftarProdi, setDaftarProdi] = useState([])
  const [galatField, setGalatField] = useState({})
  const [pesan, setPesan] = useState('')
  const [sedangMemuat, setSedangMemuat] = useState(false)

  const navigasi = useNavigate()

  useEffect(() => {
    let dibatalkan = false

    async function muatProdi() {
      try {
        const hasil = await ambilProgramStudi()

        if (dibatalkan === false) {
          setDaftarProdi(hasil)
        }
      } catch (galat) {
        if (dibatalkan === false) {
          setPesan(pesanGalat(galat, 'Gagal memuat program studi'))
        }
      }
    }

    muatProdi()

    return () => {
      dibatalkan = true
    }
  }, [])

  function ubah(field, nilai) {
    setFormulir((sebelumnya) => ({ ...sebelumnya, [field]: nilai }))
    setGalatField((sebelumnya) => ({ ...sebelumnya, [field]: undefined }))
  }

  async function tanganiKirim(peristiwa) {
    peristiwa.preventDefault()
    setPesan('')
    setGalatField({})
    setSedangMemuat(true)

    const data = {
      nim: formulir.nim.trim(),
      nama: formulir.nama.trim(),
      email: formulir.email.trim(),
      program_studi_id: Number(formulir.program_studi_id),
      angkatan: Number(formulir.angkatan),
      ipk: formulir.ipk === '' ? 0 : Number(formulir.ipk),
      aktif: formulir.aktif,
    }

    try {
      await simpanMahasiswa(data)
      navigasi('/mahasiswa')
    } catch (galat) {
      const kesalahan = galatValidasi(galat)
      setGalatField(kesalahan)

      if (Object.keys(kesalahan).length === 0) {
        setPesan(pesanGalat(galat, 'Gagal menyimpan data mahasiswa'))
      } else {
        setPesan('Periksa kembali data yang ditandai.')
      }
    } finally {
      setSedangMemuat(false)
    }
  }

  return (
    <section className="halaman-sempit">
      <div className="judul-halaman">
        <div>
          <p className="label-kecil">Data akademik</p>
          <h1>Tambah Mahasiswa</h1>
        </div>

        <Link className="tombol-sekunder" to="/mahasiswa">
          Kembali
        </Link>
      </div>

      {pesan && <p className="peringatan">{pesan}</p>}

      <form className="formulir kartu-formulir" onSubmit={tanganiKirim} noValidate>
        <div className="grup-field">
          <label htmlFor="nim">NIM</label>
          <input
            id="nim"
            value={formulir.nim}
            onChange={(peristiwa) => ubah('nim', peristiwa.target.value)}
            placeholder="H1H024001"
            className={galatField.nim ? 'input-galat' : ''}
            required
          />
          {galatField.nim && <small className="teks-galat">{galatField.nim}</small>}
        </div>

        <div className="grup-field">
          <label htmlFor="nama">Nama Lengkap</label>
          <input
            id="nama"
            value={formulir.nama}
            onChange={(peristiwa) => ubah('nama', peristiwa.target.value)}
            className={galatField.nama ? 'input-galat' : ''}
            required
          />
          {galatField.nama && <small className="teks-galat">{galatField.nama}</small>}
        </div>

        <div className="grup-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={formulir.email}
            onChange={(peristiwa) => ubah('email', peristiwa.target.value)}
            className={galatField.email ? 'input-galat' : ''}
            required
          />
          {galatField.email && <small className="teks-galat">{galatField.email}</small>}
        </div>

        <div className="grup-field">
          <label htmlFor="program-studi">Program Studi</label>
          <select
            id="program-studi"
            value={formulir.program_studi_id}
            onChange={(peristiwa) => ubah('program_studi_id', peristiwa.target.value)}
            className={galatField.program_studi_id ? 'input-galat' : ''}
            required
          >
            <option value="">Pilih program studi</option>
            {daftarProdi.map((prodi) => (
              <option key={prodi.id} value={prodi.id}>
                {prodi.kode} - {prodi.nama}
              </option>
            ))}
          </select>
          {galatField.program_studi_id && (
            <small className="teks-galat">{galatField.program_studi_id}</small>
          )}
        </div>

        <div className="baris-dua">
          <div className="grup-field">
            <label htmlFor="angkatan">Angkatan</label>
            <input
              id="angkatan"
              type="number"
              min="2000"
              max="2100"
              value={formulir.angkatan}
              onChange={(peristiwa) => ubah('angkatan', peristiwa.target.value)}
              className={galatField.angkatan ? 'input-galat' : ''}
              required
            />
            {galatField.angkatan && (
              <small className="teks-galat">{galatField.angkatan}</small>
            )}
          </div>

          <div className="grup-field">
            <label htmlFor="ipk">IPK</label>
            <input
              id="ipk"
              type="number"
              min="0"
              max="4"
              step="0.01"
              value={formulir.ipk}
              onChange={(peristiwa) => ubah('ipk', peristiwa.target.value)}
              className={galatField.ipk ? 'input-galat' : ''}
            />
            {galatField.ipk && <small className="teks-galat">{galatField.ipk}</small>}
          </div>
        </div>

        <label className="kotak-centang">
          <input
            type="checkbox"
            checked={formulir.aktif}
            onChange={(peristiwa) => ubah('aktif', peristiwa.target.checked)}
          />
          Mahasiswa aktif
        </label>

        <button type="submit" className="tombol-utama" disabled={sedangMemuat}>
          {sedangMemuat ? 'Menyimpan...' : 'Simpan Mahasiswa'}
        </button>
      </form>
    </section>
  )
}
