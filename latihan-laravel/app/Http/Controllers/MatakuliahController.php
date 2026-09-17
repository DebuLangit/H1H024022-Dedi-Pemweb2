<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MatakuliahController extends Controller
{
    private $daftarMatakuliah = [
        ['kode' => 'TKA101', 'nama' => 'Algoritma dan Pemrograman', 'sks' => 3],
        ['kode' => 'TKA102', 'nama' => 'Struktur Data', 'sks' => 3],
        ['kode' => 'TKA103', 'nama' => 'Basis Data', 'sks' => 4],
        ['kode' => 'TKA104', 'nama' => 'Pemrograman Web I', 'sks' => 2],
        ['kode' => 'TKA105', 'nama' => 'Bahasa Inggris', 'sks' => 2],
    ];

    public function index(Request $request)
    {
        $kataKunci = $request->query('q', '');
        $hasilPencarian = $this->daftarMatakuliah;

        if ($kataKunci !== '') {
            $hasilPencarian = array_filter($this->daftarMatakuliah, function ($mk) use ($kataKunci) {
                return stripos($mk['nama'], $kataKunci) !== false || stripos($mk['kode'], $kataKunci) !== false;
            });
        }

        return view('matakuliah.index', [
            'daftarMatakuliah' => $hasilPencarian
        ]);
    }

    public function show(string $kode)
    {
        $matakuliah = null;
        foreach ($this->daftarMatakuliah as $mk) {
            if ($mk['kode'] === $kode) {
                $matakuliah = $mk;
                break;
            }
        }

        if (!$matakuliah) {
            abort(404);
        }

        return view('matakuliah.show', ['matakuliah' => $matakuliah]);
    }
}