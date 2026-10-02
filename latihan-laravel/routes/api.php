<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MahasiswaController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\MatakuliahController;
use App\Models\ProgramStudi;
use App\Http\Resources\MahasiswaResource;

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:5,1');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/profil', [AuthController::class, 'profil']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::post('/auth/logout-semua', [AuthController::class, 'logoutSemua']);
    Route::put('/auth/password', [AuthController::class, 'updatePassword']); // Rute Ubah Password

    Route::get('/mahasiswa', [MahasiswaController::class, 'index']);
    Route::get('/mahasiswa/{mahasiswa}', [MahasiswaController::class, 'show']);

    Route::middleware('ability:mahasiswa:tulis')->group(function () {
        Route::post('/mahasiswa', [MahasiswaController::class, 'store']);
        Route::put('/mahasiswa/{mahasiswa}', [MahasiswaController::class, 'update']);
        Route::patch('/mahasiswa/{mahasiswa}', [MahasiswaController::class, 'update']);
    });
    // Rute DELETE dipisah agar bisa dikenakan otorisasi ganda (Token Tulis + Peran Admin)
    Route::delete('/mahasiswa/{mahasiswa}', [MahasiswaController::class, 'destroy'])
        ->middleware('peran.admin');
});


Route::get('/status', function () {
    return response()->json([
        'sukses' => true,
        'pesan' => 'API Pemweb II aktif',
        'waktu' => now()->toIso8601String(),
    ]);
});

// Route::apiResource('mahasiswa', MahasiswaController::class);

Route::apiResource('matakuliah', MatakuliahController::class);

Route::get('/program-studi/{id}/mahasiswa', function ($id, \Illuminate\Http\Request $request) {
    $programStudi = ProgramStudi::findOrFail($id);
    
    $perHalaman = min($request->integer('per_halaman', 10), 100);
    $mahasiswa = $programStudi->mahasiswa()->with('programStudi')->paginate($perHalaman);

    return MahasiswaResource::collection($mahasiswa);
});