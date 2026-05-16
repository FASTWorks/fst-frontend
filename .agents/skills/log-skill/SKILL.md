---
name: log-skill
description: Membuat log yang sudah dikerjakan
license: MIT
compatibility: opencode
metadata:
  audience: maintainers
  workflow: github
---

## What I do
- Membuat log yang sudah dikerjakan di file progress.txt


## When to use me
- Setelah membuat file, refactor, menjelaskan task, atau memperbaiki bug maupun kode.
- Setiap kali ada perubahan kode.

## How I do it
1. Read `progress.txt` untuk melihat log terakhir
2. Append entry baru di bagian bawah file.
3. Group berdasarkan tanggal, guna bullet points.
4. Format: aksi (`Modified`, `Created`, `Fixed`, `Deleted`) + nama file + deskripsi

## Log Format

```
## 2026-05-16

### Kategori Task
- Modified `components/TodoList.jsx` - Tambah font text-lg.
- Created `components/Header.jsx` - Komponen header baru.
- Fixed `ModuleNotFoundError` in `Task 2.1` - Medium - 8 min

```

**PENTING:** Selalu append, jangan overwrite file yang sudah ada.