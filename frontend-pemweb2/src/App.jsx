import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './halaman/Login'
import DaftarMahasiswa from './halaman/DaftarMahasiswa'
import FormMahasiswa from './halaman/FormMahasiswa'
import RuteTerlindungi from './komponen/RuteTerlindungi'
import TataLetak from './komponen/TataLetak'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/mahasiswa" replace />} />
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <RuteTerlindungi>
              <TataLetak />
            </RuteTerlindungi>
          }
        >
          <Route path="/mahasiswa" element={<DaftarMahasiswa />} />
          <Route path="/mahasiswa/tambah" element={<FormMahasiswa />} />
        </Route>

        <Route path="*" element={<Navigate to="/mahasiswa" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
