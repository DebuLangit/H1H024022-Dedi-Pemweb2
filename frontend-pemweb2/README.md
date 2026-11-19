# Frontend Pemweb II

Aplikasi React + Vite untuk Modul 9 (Integrasi Backend dan Frontend).

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:5173.

## Konfigurasi backend

Semua pengaturan ada di `.env`:

```env
VITE_API_TARGET=laravel   # atau fiber
VITE_API_LARAVEL=http://127.0.0.1:8000/api
VITE_API_FIBER=http://127.0.0.1:3000/api
```

Ubah `VITE_API_TARGET`, lalu jalankan ulang `npm run dev`.

## Struktur penting

```text
src/
├── api/
│   ├── adapter/laravel.js   # normalisasi respons Laravel
│   ├── adapter/fiber.js     # normalisasi respons Fiber
│   ├── backend.js           # pemilih adapter
│   ├── galat.js             # pemetaan galat validasi
│   ├── klien.js             # Axios + interceptor
│   ├── layananAuth.js
│   └── layananMahasiswa.js
├── komponen/
│   ├── RuteTerlindungi.jsx
│   └── TataLetak.jsx
├── halaman/
│   ├── Login.jsx
│   ├── DaftarMahasiswa.jsx
│   └── FormMahasiswa.jsx
└── App.jsx
```

## Akun demo

| Peran | Email | Kata sandi |
|---|---|---|
| Admin | `admin@example.com` | `admin123` |
| Dosen | `dosen@example.com` | `dosen123` |
| Mahasiswa | `mahasiswa@example.com` | `mahasiswa123` |
