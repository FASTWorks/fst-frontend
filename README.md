<div align="center">
  <!-- Add your project logo here if available -->
  <h1>FAST Finance System - Frontend</h1>
  <p>FAST Finance System adalah antarmuka web untuk manajemen keuangan pribadi yang dibangun menggunakan teknologi modern guna memberikan pengalaman pengguna yang cepat, interaktif, dan elegan.</p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/React-19-blue" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-purple" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind-v4-38B2AC" alt="Tailwind" />
</div>

## :ledger: Index

- [About](#beginner-about)
- [Usage](#zap-usage)
  - [Installation](#electric_plug-installation)
  - [Commands](#package-commands)
- [Development](#wrench-development)
  - [Pre-Requisites](#notebook-pre-requisites)
  - [Development Environment](#nut_and_bolt-development-environment)
  - [File Structure](#file_folder-file-structure)
  - [Build](#hammer-build)  
  - [Deployment](#rocket-deployment)  
- [Community](#cherry_blossom-community)
  - [Contribution](#fire-contribution)
  - [Branches](#cactus-branches)
  - [Guideline](#exclamation-guideline)  
- [FAQ](#question-faq)
- [Resources](#page_facing_up-resources)
- [Gallery](#camera-gallery)
- [Credit/Acknowledgment](#star2-creditacknowledgment)
- [License](#lock-license)

## :beginner: About
FAST Finance System adalah aplikasi manajemen keuangan pribadi *end-to-end* yang dirancang untuk memudahkan pengguna dalam mencatat pemasukan, melacak pengeluaran, memantau *budget*, serta mengelola target tabungan (Saving Goals). Frontend aplikasi ini dibangun dengan penekanan pada UI/UX yang elegan dan responsif, menggunakan React 19, Vite, dan Tailwind CSS v4.

## :zap: Usage
Bagian ini menjelaskan cara menginstal dan menggunakan proyek ini di lingkungan lokal Anda.

### :electric_plug: Installation
Langkah-langkah instalasi dirancang agar mudah diikuti di berbagai sistem operasi.

1. **Kloning Repositori (Semua OS)**
Buka terminal aplikasi Anda (Terminal di macOS/Linux, Command Prompt/PowerShell di Windows), lalu jalankan perintah berikut:
```bash
git clone https://github.com/FASTWorks/fst-frontend.git
cd fst-frontend
```

2. **Instalasi Dependensi (Windows, macOS, Linux)**
Pastikan Anda sudah berada di dalam direktori `fst-frontend`, kemudian jalankan:
```bash
npm install
```
*(Tips untuk Linux/macOS: Sangat disarankan menggunakan **NVM (Node Version Manager)** untuk menginstal Node.js guna menghindari masalah permission/akses `sudo` saat melakukan instalasi package global).*

### :package: Commands
Setelah instalasi selesai, Anda dapat menggunakan perintah berikut untuk menjalankan siklus hidup proyek:

- `npm run dev` : Menjalankan server pengembangan (Development Mode) dengan HMR. Aplikasi dapat diakses di `http://localhost:5173`.
- `npm run lint` : Menjalankan pengecekan ESLint untuk memeriksa kualitas kode Javascript/JSX.
- `npm run build` : Membangun (*build*) aplikasi untuk produksi. Hasil build akan berada di folder `dist/`.
- `npm run preview` : Menjalankan server lokal untuk menyimulasikan hasil *production build* dari folder `dist/`.

## :wrench: Development
Jika Anda ingin berkontribusi dalam pengembangan proyek ini, silakan ikuti panduan berikut.

### :notebook: Pre-Requisites
Daftar perangkat lunak yang dibutuhkan sistem Anda untuk menjalankan proyek ini:
- Node.js (Versi 18.x atau LTS terbaru direkomendasikan)
- npm (Package manager bawaan Node.js)
- Git

### :nut_and_bolt: Development Environment
- **Framework**: React 19 + Vite 8
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4 (Pendekatan CSS-first)
- **Komponen UI**: shadcn/ui (berbasis Radix UI)
- **HTTP Client**: Axios

### :file_folder: File Structure
Struktur dasar direktori dari *source code* aplikasi:

```
.
├── public
│   └── assets
├── src
│   ├── api          # Layanan koneksi API (auth, finance, analytics, aggregator)
│   ├── components   # Komponen UI yang dapat digunakan kembali (termasuk shadcn/ui)
│   ├── lib          # Utilitas seperti konfigurasi Axios, auth context, dan fungsi cn()
│   ├── pages        # Halaman-halaman utama (Dashboard, Pemasukan, Tabungan, dll)
│   ├── App.jsx      # Konfigurasi routing utama (React Router v7)
│   ├── index.css    # File CSS utama (menggunakan @theme inline Tailwind v4)
│   └── main.jsx     # Titik masuk (entry point) aplikasi React
├── package.json
└── vite.config.js
```

| No | File Name | Details |
|----|------------|-------|
| 1  | main.jsx | Entry point React |
| 2  | App.jsx | Setup React Router v7 |
| 3  | index.css | Variabel tema dan CSS utama |

### :hammer: Build
Untuk melakukan *build* aplikasi guna keperluan produksi, jalankan:
```bash
npm run build
```
Vite akan memproses dan mengoptimasi seluruh aset, lalu meletakkannya di dalam folder `dist/`.

### :rocket: Deployment
Folder `dist/` hasil *build* sudah siap untuk di-deploy ke server atau layanan *hosting* statis seperti Vercel, Netlify, atau Nginx.

## :cherry_blossom: Community

### :fire: Contribution
Kontribusi Anda sangat berharga! Berikut hal yang bisa Anda lakukan:

1. **Report a bug** <br>
Jika Anda menemukan *bug*, silakan buat laporan *issue* di repositori proyek ini agar segera ditindaklanjuti.

2. **Request a feature** <br>
Anda juga bisa meminta fitur baru melalui GitHub Issues. Jika relevan dan memungkinkan, fitur tersebut akan dimasukkan dalam daftar pengembangan.

3. **Create a pull request** <br>
Ini adalah cara terbaik untuk berkontribusi. Anda dapat mengambil *issue* yang berstatus *open* dan membuat *Pull Request* baru.

### :cactus: Branches
Proyek ini menggunakan metodologi yang memastikan stabilitas *master branch*.

1. **`dev` / `stage`** adalah *branch* pengembangan.
2. **`main` / `master`** adalah *branch* produksi.
3. Untuk fitur baru, silakan buat *branch* sementara (contoh: `feat-NAMA-FITUR`) lalu buat Pull Request ke *branch* pengembangan.

**Langkah membuat Pull Request:**
1. Buat PR ke *branch* pengembangan (`dev` atau `stage`).
2. Patuhi standar kode (gunakan `npm run lint`).
3. Jika ada perubahan UI, sertakan *screenshot*.

### :exclamation: Guideline
- **Resolusi Path**: Gunakan alias `@/` yang mengarah ke folder `src/`.
- **CSS & Tailwind**: Proyek ini menggunakan Tailwind v4 CSS-first (tanpa `tailwind.config.js`). Variabel CSS ada di `src/index.css`.
- **Tidak ada TypeScript**: Seluruh kode sumber menggunakan Javascript/JSX.

## :question: FAQ
*(Akan ditambahkan seiring dengan berjalannya proyek)*

## :page_facing_up: Resources
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/en/main)
- [Recharts](https://recharts.org/en/)

## :camera: Gallery
*(Akan ditambahkan seiring dengan berjalannya proyek)*

## :star2: Credit/Acknowledgment
Dikembangkan dengan 💖 oleh:
- **Bagus Aji Fernando (Baji-Front-End)** - *Frontend Development*
- **Abdurrahman Abdul Hamid (Hamid-Back-End)** - *Backend Development*
- **Ahmad Raja Fadhil (Raja-AI-Engineer)** - *AI Engineer*
- **Putri Maharani Fetra (Putri-AI-Engineer)** - *AI Engineer*
- **Nalitha Eka Naswadyna (Nalitha-Data-Scientist)** - *Data Scientist*
- **Dytin Ba Devia Azzahro (Devia-Data-Scientist)** - *Data Scientist*


## :lock: License
Proyek ini adalah bagian dari CodingCamp FAST Finance System.
