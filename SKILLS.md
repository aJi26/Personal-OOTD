# Skills: Outfit Archive Proyek

> Dokumentasi ini berisi daftar *skill* dan instruksi kerja AI spesifik untuk membangun situs **Outfit Archive (Personal OOTD Lookbook)**. Instruksi ini memastikan AI bekerja secara konsisten mengikuti `STYLEGUIDE.md`, `PRD.md`, dan `TECHSTACK.md`.

---

## Skill Aktif di Proyek Ini

| Skill | Dipakai Saat | Jangan Dipakai Saat |
| :--- | :--- | :--- |
| `lookbook-slider-builder` | Membuat atau mengedit komponen slider model utama (*drag carousel*, *depth of field*, *custom cursor*). | Membuat komponen UI statis biasa (misal tombol/footer). |
| `responsive-adapter` | Memastikan tata letak berpindah dengan mulus antara versi Desktop (70/30 split) dan Mobile (Bottom Sheet/Touch Swipe). | Menulis logika data JSON statis. |
| `ui-component-builder` | Membuat elemen UI pendukung seperti tombol *marketplace*, *tag* kategori, kartu rincian *outfit*, dan modal. | Membuat animasi kompleks di kanvas utama. |
| `marketplace-integrator` | Menyusun struktur data rincian pakaian dan memasang *affiliate link* (Shopee, Tokopedia, TikTok Shop). | Mengkonfigurasi styling Tailwind CSS. |
| `image-optimization-check` | Memeriksa dan mengoptimasi aset foto model *cut-out* transparan (WebP/PNG). | Menulis file skrip API backend. |

---

## Detail Instruksi & Panduan Skill

### 1. `lookbook-slider-builder`
```
---
name: lookbook-slider-builder
description: Digunakan khusus untuk membangun kanvas utama berisi slider model interaktif berbasis Framer Motion.
---

1. Gunakan Framer Motion dengan properti `drag="x"` dan `dragConstraints` untuk kontrol geser horizontal.
2. Terapkan perhitungan posisi indeks (active index):
   - Model aktif (tengah): scale = 1, opacity = 1, z-index = 20.
   - Model samping (kiri/kanan): scale = 0.85, opacity = 0.4, blur = 2px.
3. Buat Custom Cursor ("DRAG" / "VIEW") menggunakan `motion.div` fixed position yang menyadap titik koordinat mouse (`clientX`, `clientY`).
4. Sediakan fallback navigasi tombol panah (kiri & kanan) di bagian bawah kanvas.
5. Sembunyikan Custom Cursor di layar sentuh (mobile/tablet).
```

### 2. `responsive-adapter`
```
---
name: responsive-adapter
description: Digunakan saat mengatur tata letak responsif agar tampilan fleksibel di HP dan Desktop.
---

1. Gunakan breakpoint Tailwind CSS (`md:`) sebagai acuan batas layar desktop (768px+).
2. Di layar Desktop (`md:` ke atas):
   - Gunakan layout `flex-row h-screen overflow-hidden`.
   - Kanvas model mengambil `w-[70%]`, Sidebar detail mengambil `w-[30%]`.
3. Di layar Mobile (`sm:` / HP):
   - Ubah layout menjadi `flex-col h-auto overflow-y-auto`.
   - Kanvas model mengambil `w-full h-[60vh]` dengan gestur swipe jari alami.
   - Ubah sidebar kanan menjadi Bottom Sheet atau accordion vertikal di bawah model.
```

### 3. `ui-component-builder`
```
---
name: ui-component-builder
description: Digunakan untuk membuat komponen UI visual sesuai token di STYLEGUIDE.md.
---

1. Periksa `STYLEGUIDE.md` untuk menentukan warna background (#F4F4F5 / #FFFFFF), radius sudut, dan font.
2. Tombol Pilihan Varian/Ukuran:
   - Gunakan bentuk bulat (`rounded-full`).
   - State aktif: background `#000000` teks `#FFFFFF`.
   - State default: border `#E4E4E7` teks `#09090B`.
3. Pastikan semua elemen interaktif memiliki `transition-all duration-200` agar terasa responsif.
```

### 4. `marketplace-integrator`
```
---
name: marketplace-integrator
description: Digunakan untuk menyusun rincian outfit breakdown dan tautan pembelian marketplace.
---

1. Buat tipe data TypeScript yang jelas (`OutfitItem`, `MarketplaceLink`).
2. Sediakan badge khusus dengan warna brand marketplace:
   - Shopee: `#EE4D2D`
   - Tokopedia: `#03AC0E`
   - TikTok Shop: `#000000`
3. Selalu tambahkan properti `target="_blank" rel="noopener noreferrer"` pada tombol tautan keluar.
```

### 5. `image-optimization-check`
```
---
name: image-optimization-check
description: Digunakan saat menyiapkan aset gambar model agar loading tetap sangat cepat.
---

1. Pastikan gambar model berformat `.webp` dengan background transparan.
2. Gunakan komponen `<Image />` bawaan Next.js dengan properti `priority` hanya pada model aktif pertama (index 0).
3. Tambahkan efek bayangan halus (*ellipse drop-shadow*) di bawah kaki model agar model tampak berpijak secara realistis.
```

---

## Aturan Tambahan
- Jika terjadi bentrok instruksi antara skill dengan `STYLEGUIDE.md` atau `PRD.md`, maka dokumen `STYLEGUIDE.md` dan `PRD.md` yang dijadikan acuan utama.