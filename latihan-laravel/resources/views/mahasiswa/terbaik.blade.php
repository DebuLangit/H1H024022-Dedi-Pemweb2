@extends('layouts.app')

@section('judul', 'Sepuluh Mahasiswa IPK Tertinggi')

@section('konten')
    <a href="{{ route('mahasiswa.data') }}" class="btn btn-sm btn-secondary mb-3">
        Kembali
    </a>

    <h1 class="h3 mb-1">Sepuluh Mahasiswa dengan IPK Tertinggi</h1>
    <p class="text-muted mb-4">Program Studi Teknik Komputer</p>

    <table class="table table-striped bg-white">
        <thead>
            <tr>
                <th class="text-center" style="width: 60px;">#</th>
                <th>NIM</th>
                <th>Nama</th>
                <th class="text-center">Angkatan</th>
                <th class="text-center">IPK</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($mahasiswaTerbaik as $mahasiswa)
                <tr>
                    <td class="text-center">{{ $loop->iteration }}</td>
                    <td>
                        <a href="{{ route('mahasiswa.detail', $mahasiswa) }}">
                            {{ $mahasiswa->nim }}
                        </a>
                    </td>
                    <td>{{ $mahasiswa->nama }}</td>
                    <td class="text-center">{{ $mahasiswa->angkatan }}</td>
                    <td class="text-center fw-bold">{{ $mahasiswa->ipk }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="text-center">
                        Belum ada data mahasiswa Teknik Komputer.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>
@endsection