import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/layananAuth'
import { pesanGalat } from '../api/galat'

export default function Login() {
  const [email, setEmail] = useState('')
  const [kataSandi, setKataSandi] = useState('')
  const [pesan, setPesan] = useState('')
  const [sedangMemuat, setSedangMemuat] = useState(false)

  const navigasi = useNavigate()

  async function tanganiKirim(peristiwa) {
    peristiwa.preventDefault()
    setPesan('')
    setSedangMemuat(true)

    try {
      const hasil = await login(email, kataSandi)
      sessionStorage.setItem('token', hasil.data.token)
      navigasi('/mahasiswa')
    } catch (galat) {
      setPesan(pesanGalat(galat, 'Email atau kata sandi tidak sesuai'))
    } finally {
      setSedangMemuat(false)
    }
  }

  return (
    <div className="halaman-auth">
      <div className="kartu-auth">
        <p className="label-kecil">Praktikum Pemrograman Web II</p>
        <h1>Masuk</h1>
        <p className="teks-redup">
          Gunakan akun admin dari Modul 5: <br />
          <code>admin@example.com</code> / <code>admin123</code>
        </p>

        {pesan && <p className="peringatan">{pesan}</p>}

        <form onSubmit={tanganiKirim} className="formulir">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(peristiwa) => setEmail(peristiwa.target.value)}
            required
          />

          <label htmlFor="kata-sandi">Kata Sandi</label>
          <input
            id="kata-sandi"
            type="password"
            autoComplete="current-password"
            value={kataSandi}
            onChange={(peristiwa) => setKataSandi(peristiwa.target.value)}
            required
          />

          <button type="submit" className="tombol-utama" disabled={sedangMemuat}>
            {sedangMemuat ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  )
}
