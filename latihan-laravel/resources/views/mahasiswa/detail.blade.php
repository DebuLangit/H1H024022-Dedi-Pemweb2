@extends('layouts.app')

@section('judul', 'Detail Mahasiswa')

@section('konten')
    <a href="{{ route('mahasiswa.data') }}" class="btn btn-sm btn-secondary mb-3">
        Kembali
    </a>

    <div class="card bg-white mb-4">
        <div class="card-body">
            <h1 class="h4 mb-3">{{ $mahasiswa->nama }}</h1>
            <dl class="row mb-0">
                <dt class="col-sm-3">NIM</dt>
                <dd class="col-sm-9">{{ $mahasiswa->nim }}</dd>

                <dt class="col-sm-3">Program Studi</dt>
                <dd class="col-sm-9">{{ $mahasiswa->programStudi->nama }}</dd>

                <dt class="col-sm-3">Angkatan</dt>
                <dd class="col-sm-9">{{ $mahasiswa->angkatan }}</dd>

                <dt class="col-sm-3">IPK</dt>
                <dd class="col-sm-9">{{ $mahasiswa->ipk }}</dd>

                <dt class="col-sm-3">Status</dt>
                <dd class="col-sm-9">{{ $mahasiswa->aktif ? 'Aktif' : 'Tidak Aktif' }}</dd>
            </dl>
        </div>
    </div>

    <h2 class="h5 mb-3">Matakuliah yang Diambil</h2>

    <table class="table table-striped bg-white">
        <thead>
            <tr>
                <th>Kode</th>
                <th>Nama Matakuliah</th>
                <th class="text-center">SKS</th>
                <th class="text-center">Semester</th>
                <th class="text-center">Nilai</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($mahasiswa->matakuliah as $matakuliah)
                <tr>
                    <td>{{ $matakuliah->kode }}</td>
                    <td>{{ $matakuliah->nama }}</td>
                    <td class="text-center">{{ $matakuliah->sks }}</td>
                    <td class="text-center">{{ $matakuliah->semester }}</td>
                    <td class="text-center">{{ $matakuliah->pivot->nilai ?? '-' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="text-center">Belum ada matakuliah yang diambil.</td>
                </tr>
            @endforelse
        </tbody>
        @if ($mahasiswa->matakuliah->isNotEmpty())
            <tfoot>
                <tr class="fw-bold">
                    <td colspan="2">Total</td>
                    <td class="text-center">{{ $mahasiswa->matakuliah->sum('sks') }}</td>
                    <td class="text-center">Rata-rata</td>
                    <td class="text-center">
                        {{ number_format($mahasiswa->matakuliah->avg('pivot.nilai'), 2) }}
                    </td>
                </tr>
            </tfoot>
        @endif
    </table>
@endsection