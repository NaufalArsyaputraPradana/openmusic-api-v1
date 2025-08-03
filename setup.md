# OpenMusic API v1 - Setup & Running Guide

## 🚀 Setup dan Menjalankan Aplikasi

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- PostgreSQL Server (v12 atau lebih tinggi)
- npm atau yarn

### Langkah-langkah Setup

#### 1. Install Dependencies
```bash
npm install
```

#### 2. Setup Database PostgreSQL
Buat database baru di PostgreSQL:
```sql
CREATE DATABASE openmusic;
```

#### 3. Setup Environment Variables
File `.env` sudah tersedia dengan konfigurasi default. Sesuaikan jika diperlukan:
```env
HOST=localhost
PORT=5000
PGUSER=postgres
PGPASSWORD=password
PGDATABASE=openmusic
PGHOST=localhost
PGPORT=5432
DATABASE_URL=postgres://postgres:password@localhost:5432/openmusic
```

#### 4. Jalankan Database Migration
```bash
npm run migrate up
```

#### 5. (Opsional) Cek Code Quality
```bash
npm run lint
```

#### 6. Jalankan Server
```bash
# Production mode
npm start

# Development mode (auto-restart)
npm run start-dev
```

## 🔧 Command Reference

### Migration Commands
```bash
# Jalankan migration
npm run migrate up

# Rollback migration
npm run migrate down

# Membuat migration baru
npm run migrate create nama-migration

# Cek status migration
npm run migrate
```

### Development Commands
```bash
# Jalankan server production
npm start

# Jalankan server development (auto-restart)
npm run start-dev

# Cek code quality
npm run lint

# Fix ESLint issues otomatis
npm run lint:fix
```

### Database Reset (jika diperlukan)
```bash
# Reset database
npm run migrate down
npm run migrate up
```

## ⚡ Quick Start
```bash
npm install
npm run migrate up
npm start
```

## 🧪 Testing API

### Menggunakan cURL (Linux/Mac/WSL)
```bash
# Test POST album
curl -X POST http://localhost:5000/albums \
  -H "Content-Type: application/json" \
  -d '{"name":"Viva la Vida","year":2008}'

# Test GET songs
curl http://localhost:5000/songs
```

### Menggunakan PowerShell (Windows)
```powershell
# Test POST album
Invoke-RestMethod -Uri "http://localhost:5000/albums" -Method POST -ContentType "application/json" -Body '{"name":"Viva la Vida","year":2008}'

# Test GET songs
Invoke-RestMethod -Uri "http://localhost:5000/songs" -Method GET
```

## 📚 API Endpoints

### Albums
- `POST /albums` - Tambah album baru
- `GET /albums/{id}` - Dapatkan album by ID
- `PUT /albums/{id}` - Update album by ID
- `DELETE /albums/{id}` - Hapus album by ID

### Songs
- `POST /songs` - Tambah lagu baru
- `GET /songs` - Dapatkan semua lagu
- `GET /songs/{id}` - Dapatkan lagu by ID
- `PUT /songs/{id}` - Update lagu by ID
- `DELETE /songs/{id}` - Hapus lagu by ID

### Query Parameters (GET /songs)
- `?title=keyword` - Cari berdasarkan judul
- `?performer=keyword` - Cari berdasarkan performer
- `?title=keyword&performer=keyword` - Kombinasi pencarian

## ✅ Verifikasi Setup Berhasil

Setelah menjalankan `npm start`, server akan menampilkan:
```
Server berjalan pada http://localhost:5000
```

API siap digunakan! 🎉
