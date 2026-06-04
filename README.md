# FAST Finance System - Frontend

FAST Finance System adalah antarmuka web untuk manajemen keuangan pribadi yang dibangun menggunakan teknologi modern guna memberikan pengalaman pengguna yang cepat, interaktif, dan elegan.

## 🚀 Teknologi yang Digunakan

- **Framework**: React 19 + Vite 8
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4 (Pendekatan CSS-first)
- **Komponen UI**: shadcn/ui (berbasis Radix UI)
- **HTTP Client**: Axios

## 📋 Prasyarat Sistem

Sebelum memulai instalasi, pastikan sistem Anda telah terpasang perangkat lunak berikut:
- **Node.js**: Versi 18.x atau yang lebih baru (sangat direkomendasikan menggunakan versi LTS terbaru).
- **Package Manager**: npm (sudah termasuk secara default saat Anda menginstal Node.js).

---

## 🛠️ Panduan Instalasi Berbagai OS

Langkah-langkah instalasi dirancang agar mudah diikuti di berbagai sistem operasi.

### Langkah 1: Kloning Repositori (Semua OS)
Buka terminal aplikasi Anda (Terminal di macOS/Linux, Command Prompt/PowerShell di Windows), lalu jalankan perintah berikut:
```bash
git clone <url-repositori-anda>
cd fst-frontend
```

### Langkah 2: Instalasi Dependensi

#### 🪟 Untuk Pengguna Windows
1. Pastikan Anda sudah membuka terminal di dalam folder `fst-frontend`.
2. Jalankan perintah instalasi:
```cmd
npm install
```

#### 🍎 Untuk Pengguna macOS & 🐧 Linux
1. Pastikan Anda sudah membuka terminal di dalam direktori `fst-frontend`.
2. Jalankan perintah instalasi:
```bash
npm install
```
*(Tips untuk Linux/macOS: Sangat disarankan menggunakan **NVM (Node Version Manager)** untuk menginstal Node.js guna menghindari masalah permission/akses `sudo` saat melakukan instalasi package global).*

---

## 💻 Panduan Penggunaan End-to-End

Setelah proses instalasi dependensi selesai, Anda dapat menggunakan script berikut untuk siklus hidup pengembangan web.

### 1. Menjalankan Server Pengembangan (Development Mode)
Untuk menjalankan aplikasi selama masa pembuatan fitur dengan fitur HMR (Hot Module Replacement):
```bash
npm run dev
```
Setelah dijalankan, terminal akan menampilkan URL lokal. Buka browser Anda dan akses alamat tersebut (biasanya `http://localhost:5173`). Setiap perubahan pada kode akan langsung terlihat di browser tanpa perlu reload.

### 2. Memeriksa Kode (Linting)
Sangat penting untuk menjaga konsistensi dan kualitas kode Javascript/JSX. Anda bisa menjalankan linter sebelum melakukan komit:
```bash
npm run lint
```
Perintah ini akan menjalankan pengecekan menggunakan ESLint sesuai konfigurasi proyek ini.

### 3. Membangun Aplikasi untuk Produksi (Production Build)
Jika aplikasi sudah siap untuk di-deploy ke server (seperti Vercel, Netlify, atau VPS), jalankan:
```bash
npm run build
```
Vite akan memproses seluruh aset dan kode, mengoptimasinya, dan meletakkannya di dalam folder `dist/`. Folder inilah yang nantinya Anda unggah ke server produksi.

### 4. Menyimulasikan Environment Produksi (Preview)
Sebelum benar-benar mendeploy folder `dist/` ke publik, ada baiknya Anda mencoba menjalankan hasil build tersebut secara lokal:
```bash
npm run preview
```
Ini membantu Anda mendeteksi error yang mungkin hanya muncul di environment produksi dan tidak terdeteksi saat menggunakan `npm run dev`.

---

## 📂 Konvensi Proyek

- **Resolusi Path**: Gunakan alias `@/` yang mengarah ke folder `src/`. Contoh: `import Button from "@/components/ui/button"`.
- **CSS & Tailwind**: Proyek ini menggunakan Tailwind v4 CSS-first, yang berarti tidak ada `tailwind.config.js`. Tema dan variabel CSS berada di `src/index.css`.
- **Komponen UI**: Semua komponen UI shadcn diletakkan di `src/components/ui/`.

---

## 👨‍💻 Credits

Dikembangkan dengan dedikasi tinggi oleh:
**Bagus Aji Fernando (Baji-Front-End)**
