# Laravel Pattern Generator

> Web-based tool untuk menghasilkan kode pattern Laravel Zul yang repetitif (Model, Migration, Service, Controller, Request, Resource, Route) secara otomatis dari schema yang didefinisikan.

## Table of Contents

- [Tentang](#tentang)
- [Fitur](#fitur)
- [Tech Stack](#tech-stack)
- [Instalasi](#instalasi)
- [Cara Penggunaan](#cara-penggunaan)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

## Tentang

Proyek ini dibuat untuk membantu Zulfikar mempercepat proses pengembangan dengan generate pattern kode secara otomatis. Cukup definisikan nama model dan field-field yang diperlukan, maka tool ini akan menghasilkan:

- **Migration** - Database migration untuk tabel
- **Model** - Eloquent model dengan fillable, casts, relations, scopes
- **Service** - Service class untuk business logic
- **Store/Update Request** - Form request untuk validasi
- **Resource** - API Resource untuk transformasi response
- **Controller** - CRUD controller dengan dependency injection
- **Route** - RESTful route definitions

## Fitur

- ✅ Definisi field dengan berbagai tipe data (string, text, integer, boolean, password, foreignId)
- ✅ Konfigurasi relasi antar model (belongsTo, hasMany, belongsToMany)
- ✅ Opsi Soft Deletes
- ✅ Validasi field (required, unique, index)
- ✅ Auto-generate scopes untuk boolean fields
- ✅ Copy to clipboard untuk setiap generated code
- ✅ Preview kode secara real-time

## Tech Stack

**Frontend:** React.js, Vite, Tailwind CSS  
**UI Library:** Ant Design  
**Build Tool:** Vite

## Instalasi

```bash
# Clone repository
git clone https://github.com/zuLmeister/generator-laravel.git

# Masuk ke folder proyek
cd generator-laravel

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

## Cara Penggunaan

1. **Masukkan nama model** (contoh: User, Product, Category)
2. **Tambahkan field-field** yang diperlukan:
   - Nama field
   - Tipe data (string, text, integer, boolean, password, foreignId)
   - Status (Required/Optional)
   - Opsi tambahan (Unique, Index)
   - Relasi (jika ada)
3. **Pilih opsi Soft Deletes** (opsional)
4. **Klik Generate** untuk menghasilkan kode
5. **Copy kode** yang dihasilkan dari tab yang diinginkan

## Kontribusi

Silakan buat pull request untuk fitur baru atau perbaikan bug.

## Lisensi

MIT License
