<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PenggunaSeeder extends Seeder
{
    public function run(): void
    {
        $daftar = [
            [
                'name' => 'Administrator',
                'email' => 'admin@example.com',
                'password' => Hash::make('admin123'),
                'peran' => 'admin',
            ],
            [
                'name' => 'Dosen Pengampu',
                'email' => 'dosen@example.com',
                'password' => Hash::make('dosen123'),
                'peran' => 'dosen',
            ],
            [
                'name' => 'Mahasiswa Contoh',
                'email' => 'mahasiswa@example.com',
                'password' => Hash::make('mahasiswa123'),
                'peran' => 'mahasiswa',
            ],
        ];

        foreach ($daftar as $pengguna) {
            User::updateOrCreate(
                ['email' => $pengguna['email']],
                $pengguna
            );
        }
    }
}
