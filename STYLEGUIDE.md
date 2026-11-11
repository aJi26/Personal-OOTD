# Design System: Outfit Archive

## Design Personality
*   **Minimalist:** Mengedepankan konten foto OOTD tanpa elemen dekoratif yang berlebihan.
*   **Editorial:** Mengambil inspirasi dari majalah mode modern.
*   **Clean & Structured:** Garis tipis, pemisahan kontras yang jelas, dan hierarki teks yang rapi.
*   **Modern Interactive:** Responsif terhadap gerakan kursor dan *drag action*.

## Colors

### Canvas & Surface
*   **Canvas Background (Kiri):** `#F4F4F5` (Zinc 100 / Off-white) - Latar belakang netral agar pakaian model menonjol.
*   **Panel & Card Surface (Kanan):** `#FFFFFF` (Pure White) - Untuk panel detail item dan kartu navigasi.
*   **Overlay & Modal:** `#000000` dengan opasitas 40% (*backdrop blur*).

### Text & Typography
*   **Primary Text:** `#09090B` (Zinc 950 / Near Black)
*   **Secondary Text:** `#71717A` (Zinc 500 / Muted Gray)
*   **Caption/Details:** `#A1A1AA` (Zinc 400)

### Marketplace Brand Accents (Opsional pada Tombol Badge)
*   **Shopee Accent:** `#EE4D2D`
*   **Tokopedia Accent:** `#03AC0E`
*   **TikTok Shop Accent:** `#000000`

## Typography

### Font Family
*   **Primary Font:** Inter / System Sans-serif (Clean, modern, highly readable).

### Type Scale
*   **Display Header (Main Title):** 56px - 64px / Bold (misal: "My Outfit Archive.")
*   **Page Title:** 36px - 44px / Semi-bold (misal: "Archive.", "About.")
*   **Look Title / Subheader:** 20px - 24px / Bold (misal: "Urban Mood")
*   **Item Name:** 14px - 16px / Medium
*   **Details & Price:** 13px - 14px / Regular
*   **Labels & Tags:** 11px - 12px / Uppercase (Letter-spacing: +0.05em)

## Component Style

### Marketplace Link Buttons
*   **Style A (Badges):** Tombol pill kecil dengan logo *marketplace* (Shopee, Tokopedia, TikTok Shop).
*   **Style B (Primary CTA):** Tombol "View on Marketplace" full-width, sudut membulat 8px (`rounded-lg`), background hitam `#000000` dengan border 1px solid `#E4E4E7` dan ikon external link (`↗`).

### Interactive Drag Cursor
*   **Visual:** Lingkaran melayang (`fixed position`) berdiameter ~70px.
*   **Fill:** Solid White / Dark Gray dengan efek pencahayaan transparan.
*   **Label:** Teks kapital seragam `"DRAG"` atau `"VIEW"` di bagian tengah.

### Category Filter Tabs (Halaman Archive)
*   **Default State:** Background bening, teks `#71717A`.
*   **Active State:** Background hitam `#000000`, teks putih `#FFFFFF`, sudut `rounded-full`.