@extends('layouts.app')

@section('judul', 'Detail Matakuliah')

@section('konten')
<h1 class="h3 mb-4">Detail Matakuliah</h1>

<div class="card">
    <div class="card-body">
        <h5 class="card-title">{{ $matakuliah['nama'] }}</h5>
        <p class="card-text mb-1">Kode: <strong>{{ $matakuliah['kode'] }}</strong></p>
        <p class="card-text">Bobot: <x-badge-sks :sks="$matakuliah['sks']" /></p>
    </div>
</div>

<a href="{{ route('matakuliah.index') }}" class="btn btn-secondary mt-3">Kembali</a>
@endsection