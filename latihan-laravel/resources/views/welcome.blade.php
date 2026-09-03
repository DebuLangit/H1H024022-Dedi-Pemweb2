<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Latihan Laravel - Modul 1</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .card {
            background-color: #ffffff;
            padding: 2.5rem;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            text-align: center;
            border-top: 5px solid #ef4444;
            max-width: 400px;
            width: 100%;
        }
        h1 {
            color: #1e293b;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
        }
        p {
            color: #475569;
            font-size: 1.1rem;
            margin: 0.5rem 0;
        }
        .highlight {
            font-weight: bold;
            color: #0f172a;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>Praktikum Pemrograman Web II</h1>
        <p>Nama: <span class="highlight">{{ $nama }}</span></p>
        <p>NIM: <span class="highlight">{{ $nim }}</span></p>
    </div>
</body>
</html>