import axios from 'axios'

// Menentukan alamat backend melalui satu pengaturan pada .env.
// Nilai yang diizinkan: "laravel" atau "fiber".
export const targetBackend = (import.meta.env.VITE_API_TARGET || 'laravel').toLowerCase()

const alamatBackend =
  targetBackend === 'fiber'
    ? import.meta.env.VITE_API_FIBER
    : import.meta.env.VITE_API_LARAVEL

const klien = axios.create({
  baseURL: alamatBackend,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

klien.interceptors.request.use((konfigurasi) => {
  const token = sessionStorage.getItem('token')

  if (token) {
    konfigurasi.headers.Authorization = `Bearer ${token}`
  }

  return konfigurasi
})

klien.interceptors.response.use(
  (respons) => respons,
  (galat) => {
    const alamatPermintaan = galat.config?.url || ''

    // Jangan alihkan halaman ketika kegagalan berasal dari proses login itu sendiri.
    if (
      galat.response &&
      galat.response.status === 401 &&
      !alamatPermintaan.includes('/auth/login')
    ) {
      sessionStorage.removeItem('token')
      window.location.href = '/login'
    }

    return Promise.reject(galat)
  }
)

export default klien
