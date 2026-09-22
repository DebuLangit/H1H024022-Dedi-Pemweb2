<?php

namespace Database\Seeders;

use App\Models\Matakuliah;
use Illuminate\Database\Seeder;

class MatakuliahSeeder extends Seeder
{
    public function run(): void
    {
        $daftar = [
            ['kode' => 'TKO101', 'nama' => 'Algoritma dan Pemrograman', 'sks' => 3, 'semester' => 1],
            ['kode' => 'TKO102', 'nama' => 'Matematika Diskrit',        'sks' => 3, 'semester' => 1],
            ['kode' => 'TKO201', 'nama' => 'Struktur Data',             'sks' => 3, 'semester' => 2],
            ['kode' => 'TKO202', 'nama' => 'Sistem Digital',            'sks' => 3, 'semester' => 2],
            ['kode' => 'TKO301', 'nama' => 'Basis Data',                'sks' => 3, 'semester' => 3],
            ['kode' => 'TKO302', 'nama' => 'Jaringan Komputer',         'sks' => 3, 'semester' => 3],
            ['kode' => 'TKO401', 'nama' => 'Pemrograman Web I',         'sks' => 3, 'semester' => 4],
            ['kode' => 'TKO402', 'nama' => 'Sistem Operasi',            'sks' => 3, 'semester' => 4],
            ['kode' => 'TKO501', 'nama' => 'Pemrograman Web II',        'sks' => 3, 'semester' => 5],
            ['kode' => 'TKO502', 'nama' => 'Kecerdasan Buatan',         'sks' => 3, 'semester' => 5],
        ];

        foreach ($daftar as $item) {
            Matakuliah::create($item);
        }
    }
}