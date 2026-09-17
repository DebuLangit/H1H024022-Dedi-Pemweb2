@extends('layouts.app')

@section('judul', 'Daftar Matakuliah')

@section('konten')
<h1 class="h3 mb-4">Daftar Matakuliah</h1>

<form action="{{ route('matakuliah.index') }}" method="GET" class="mb-4">
    <div class="input-group">
        <input type="text" name="q" class="form-control" placeholder="Cari nama atau kode matakuliah..." value="{{ request('q') }}">
        <button class="btn btn-primary" type="submit">Cari</button>
        @if(request('q'))
            <a href="{{ route('matakuliah.index') }}" class="btn btn-outline-secondary">Reset</a>
        @endif
    </div>
</form>

<table class="table table-bordered bg-white">
    <thead>
        <tr>
            <th>Kode</th>
            <th>Nama</th>
            <th>SKS</th>
            <th>Aksi</th>
        </tr>
    </thead>
    <tbody>
        @forelse ($daftarMatakuliah as $mk)
            <tr>
                <td>{{ $mk['kode'] }}</td>
                <td>{{ $mk['nama'] }}</td>
                <td>
                    <x-badge-sks :sks="$mk['sks']" />
                </td>
                <td>
                    <a href="{{ route('matakuliah.show', $mk['kode']) }}" class="btn btn-sm btn-primary">Detail</a>
                </td>
            </tr>
        @empty
            <tr>
                <td colspan="4" class="text-center">Matakuliah tidak ditemukan.</td>
            </tr>
        @endforelse
    </tbody>
</table>
@endsection