<?php

namespace Database\Seeders;

use App\Models\Mahasiswa;
use App\Models\Matakuliah;
use Illuminate\Database\Seeder;

class KrsSeeder extends Seeder
{
    public function run(): void
    {
        $matakuliah = Matakuliah::all();

        Mahasiswa::each(function (Mahasiswa $mahasiswa) use ($matakuliah) {
            $dipilih = $matakuliah->random(rand(4, 6));

            $data = $dipilih->mapWithKeys(fn ($mk) => [
                $mk->id => ['nilai' => fake()->randomFloat(2, 55, 100)],
            ])->all();

            $mahasiswa->matakuliah()->sync($data);
        });
    }
}