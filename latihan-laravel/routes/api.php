<?php

use App\Http\Controllers\Api\MahasiswaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MatakuliahController;
use App\Models\ProgramStudi;
use App\Http\Resources\MahasiswaResource;

Route::get('/status', function () {
    return response()->json([
        'sukses' => true,
        'pesan' => 'API Pemweb II aktif',
        'waktu' => now()->toIso8601String(),
    ]);
});

Route::apiResource('mahasiswa', MahasiswaController::class);

Route::apiResource('matakuliah', MatakuliahController::class);

Route::get('/program-studi/{id}/mahasiswa', function ($id, \Illuminate\Http\Request $request) {
    $programStudi = ProgramStudi::findOrFail($id);
    
    $perHalaman = min($request->integer('per_halaman', 10), 100);
    $mahasiswa = $programStudi->mahasiswa()->with('programStudi')->paginate($perHalaman);

    return MahasiswaResource::collection($mahasiswa);
});