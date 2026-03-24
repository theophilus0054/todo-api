# Todo API

Project simple REST API untuk manajemen tugas (todo) yang disiapkan untuk pengembangan dan pipeline DevOps.

## Ringkasan
Aplikasi ini menggunakan Express dan dirancang supaya mudah diintegrasikan ke pipeline CI/CD (GitHub Actions) dan containerized (Docker). Struktur utama proyek:
- [src/index.js](src/index.js) — entry Express (`app`) yang digunakan oleh server dan test.  
  - simbol: [`app`](src/index.js)
- [src/routes/taskRoutes.js](src/routes/taskRoutes.js) — routing endpoint tugas.  
  - simbol: [`taskRoutes`](src/routes/taskRoutes.js)
- [tests/task.test.js](tests/task.test.js) — unit/integration tests (Supertest + Jest).
- [Dockerfile](Dockerfile) — image build.
- [docker-compose.yml](docker-compose.yml) — compose untuk local run.
- [.github/workflows/ci.yml](.github/workflows/ci.yml) — CI pipeline.

## Prasyarat
- Node.js 18+
- npm
- Docker (opsional, untuk container)
- Akses ke GitHub Actions untuk CI

## Setup lokal
1. Clone repo
2. Install dependency:
```sh
npm ci
```
3. Jalankan server lokal (development):
```sh
npm start
```
Server default pada port 3000 (cek konfigurasi di src/index.js atau server.js).

## Menjalankan test
Unit/integration tests dijalankan dengan:
```sh
npm test
```
Referensi test: tests/task.test.js

## Endpoints (sementara)
- GET /tasks — mengembalikan daftar tugas (JSON).
- POST /tasks — membuat tugas baru (ditest oleh suite).

Lihat implementasi routing di src/routes/taskRoutes.js.

## CI/CD
Pipeline GitHub Actions berada di .github/workflows/ci.yml. Fitur utama:
- Setup Node 18
- npm ci
- Menjalankan test (npm test)
- Security scan (npm audit --audit-level=moderate)
- Build Docker image bila test sukses

(Contoh workflow tersedia di .github/workflows/ci.yml)

## Docker
Build image:
```sh
docker build -t todo-api .
```
Jalankan dengan docker-compose:
```sh
docker-compose up --build
```

## Praktik DevOps yang disarankan
- Jalankan test dan security scan di CI (sudah dikonfigurasi).
- Tambahkan linting & format otomatis (ESLint, Prettier) dan pre-commit hooks.
- Pisahkan pipeline deployment (staging → production) dengan approval gates.
- Gunakan secrets management untuk konfigurasi sensitif.
- Tambahkan monitoring & logging untuk observability.

## Branching & Release
- Branch utama: `main` (production), `develop` untuk integrasi.
- Feature branches: `feature/<nama>`.
- Gunakan semantic versioning untuk release.

## Kontribusi
- Fork, buat feature branch, buka pull request ke `develop`.
- Pastikan test lulus di CI sebelum merge.

## Lisensi
Tambahkan LICENSE sesuai kebijakan pemilik repo.