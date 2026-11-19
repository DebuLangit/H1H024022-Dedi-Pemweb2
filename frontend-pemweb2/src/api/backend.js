import laravel from './adapter/laravel'
import fiber from './adapter/fiber'
import { targetBackend } from './klien'

// Satu-satunya tempat pemilihan backend. Ubah VITE_API_TARGET pada .env
// lalu jalankan ulang server Vite untuk berpindah backend.
const backend = targetBackend === 'fiber' ? fiber : laravel

export default backend
