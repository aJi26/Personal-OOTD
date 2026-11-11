# Tech Stack: Outfit Archive Lookbook

> Dokumen ini menjelaskan pilihan teknologi ringan yang dioptimalkan untuk kecepatan muat (*loading performance*), kehalusan animasi visual, dan integrasi tautan marketplace.

## Frontend
*   **Framework:** Next.js (App Router) - Untuk optimasi SEO dan gambar visual tinggi.
*   **Language:** TypeScript (Strict Mode) - Untuk konsistensi tipe data *Outfit Item* dan *Marketplace Links*.
*   **Styling:** Tailwind CSS - Untuk utilitas tata letak minimalis dan *responsive layout*.
*   **Animation Engine:** Framer Motion - Digunakan pada *drag carousel*, efek skala model, *custom cursor*, dan animasi *filter tab*.
*   **State Management:** React Context API / Zustand (Sangat ringan, hanya untuk menyimpan `activeLookIndex` dan `selectedCategoryFilter`).
*   **Iconography:** Lucide React (Ikon navigasi, panah, sosial media) & SVG kustom (Ikon Shopee, Tokopedia, TikTok Shop).

## Content & Data Management
*   **Data Source:** Local JSON / MDX / Headless CMS (Sanity / Supabase Read-Only) - Memudahkan penambahan koleksi OOTD baru tanpa perlu merombak kode UI.
*   **Image Storage & Optimization:** Cloudinary atau Vercel Image Optimization (Penting untuk format `.webp` transparan agar beban situs tetap ringan).

## Hosting & Analytics
*   **Hosting:** Vercel (Free / Hobby tier sudah sangat mencukupi).
*   **Analytics:** PostHog / Vercel Analytics (Untuk memantau item atau tautan *marketplace* mana yang paling sering diklik).

## Struktur Folder Proyek
```
/app
  ├── page.tsx               # Main Lookbook Slider (Interactive Canvas)
  ├── archive/page.tsx       # Grid Katalog Outfit + Filter Kategori
  ├── about/page.tsx         # Personal Bio & Story
  ├── contact/page.tsx       # Media Sosial & Inquiries
/components
  ├── ui/                    # Button, Badge, Modal
  ├── lookbook/              # LookSlider, CustomCursor, ModelCard
  ├── sidebar/               # OutfitBreakdown, MarketplaceButtons
  └── layout/                # Navbar, MobileNav
/data                        # JSON data koleksi outfit & link marketplace
/types                       # Type Definition (Outfit, Item, MarketplaceLink)
/public                      # Aset gambar model cut-out (.webp)
```

## Constraint & Rules
*   **Performa Gambar:** Seluruh gambar model wajib menggunakan background transparan (PNG/WebP) yang dioptimasi di bawah 300KB per gambar.
*   **Tanpa Library Heavy Carousel:** Slider model diketik kustom menggunakan `Framer Motion` untuk menjamin kontrol transisi 3D dan skala visual.