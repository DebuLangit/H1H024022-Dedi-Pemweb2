<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMahasiswaRequest;
use App\Http\Requests\UpdateMahasiswaRequest;
use App\Http\Resources\MahasiswaResource;
use App\Models\Mahasiswa;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    public function index(Request $request)
    {
        $kueri = Mahasiswa::query()->with('programStudi');

        if ($request->filled('cari')) {
            $kataKunci = $request->query('cari');

            $kueri->where(function ($sub) use ($kataKunci) {
                $sub->where('nama', 'like', '%' . $kataKunci . '%')
                    ->orWhere('nim', 'like', '%' . $kataKunci . '%');
            });
        }

        if ($request->filled('angkatan')) {
            $kueri->where('angkatan', $request->integer('angkatan'));
        }

        if (    $request->filled('program_studi_id')) {
            $kueri->where('program_studi_id', $request->integer('program_studi_id'));
        }

        $urutan = $request->query('urut', 'nama');
        $arah = $request->query('arah', 'asc');

        $kolomDiizinkan = ['nama', 'nim', 'angkatan', 'ipk'];

        if (in_array($urutan, $kolomDiizinkan, true)) {
            $kueri->orderBy($urutan, $arah === 'desc' ? 'desc' : 'asc');
        }

        $perHalaman = min($request->integer('per_halaman', 10), 100);

        // 1. Buat collection seperti biasa
        $resourceCollection = MahasiswaResource::collection($kueri->paginate($perHalaman));

        // 2. Tambahkan logika fields
        if ($request->filled('fields')) {
            $fields = explode(',', $request->query('fields'));
            
            // Ekstrak respons resource menjadi array PHP murni (termasuk links dan meta)
            $responseData = $resourceCollection->response()->getData(true);
            
            // Saring kolom hanya pada blok 'data'
            $responseData['data'] = array_map(function ($item) use ($fields) {
                // Ambil hanya key yang cocok dengan parameter fields
                $filtered = array_intersect_key($item, array_flip($fields));
                return count($filtered) > 0 ? $filtered : $item; // Fallback jika tidak ada field yg cocok
            }, $responseData['data']);
            
            // Kembalikan sebagai JSON
            return response()->json($responseData);
        }

        // 3. Jika tidak ada parameter fields, kembalikan collection utuh
        return $resourceCollection;
    }

    public function store(StoreMahasiswaRequest $request): JsonResponse
    {
        $mahasiswa = Mahasiswa::create($request->validated());

        $mahasiswa->load('programStudi');

        return response()->json([
            'sukses' => true,
            'pesan' => 'Data mahasiswa berhasil dibuat',
            'data' => new MahasiswaResource($mahasiswa),
        ], 201);
    }

    public function show(Mahasiswa $mahasiswa): JsonResponse
    {
        $mahasiswa->load('programStudi');

        return response()->json([
            'sukses' => true,
            'data' => new MahasiswaResource($mahasiswa),
        ]);
    }

    public function update(UpdateMahasiswaRequest $request, Mahasiswa $mahasiswa): JsonResponse
    {
        $mahasiswa->update($request->validated());

        $mahasiswa->load('programStudi');

        return response()->json([
            'sukses' => true,
            'pesan' => 'Data mahasiswa berhasil diperbarui',
            'data' => new MahasiswaResource($mahasiswa),
        ]);
    }

    public function destroy(Mahasiswa $mahasiswa): JsonResponse
    {
        $mahasiswa->delete();

        return response()->json([
            'sukses' => true,
            'pesan' => 'Data mahasiswa berhasil dihapus',
        ]);
    }
}
