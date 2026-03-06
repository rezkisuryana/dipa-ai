# 🌙 RAIA — Ramadhan AI Assistant

> **Buat Produk Digital Islami Siap Jual dalam Hitungan Detik dengan AI**

[![Live Demo](https://img.shields.io/badge/Live-Demo-4ade80?style=for-the-badge&logo=vercel)](https://raia-ai.lovable.app)
[![Built with Lovable](https://img.shields.io/badge/Built%20with-Lovable-gold?style=for-the-badge)](https://lovable.dev)
[![Powered by AI](https://img.shields.io/badge/Powered%20by-Gemini%20AI-blue?style=for-the-badge&logo=google)](https://ai.google.dev)

---

## 📖 Deskripsi Project

**RAIA (Ramadhan AI Assistant)** adalah aplikasi web yang membantu umat Muslim Indonesia membuat produk digital Islami berkualitas tinggi secara instan menggunakan kecerdasan buatan. Di era digital saat ini, banyak kreator konten Islami yang ingin membuat produk digital seperti e-book, checklist ibadah, planner Ramadhan, kumpulan resep, panduan doa, hingga mini e-course — namun terkendala waktu, kemampuan menulis, dan desain. RAIA hadir sebagai solusi dengan mengotomatisasi proses pembuatan konten melalui AI, sehingga siapa pun bisa menghasilkan produk digital Islami yang profesional dan siap jual hanya dalam beberapa klik. Pengguna cukup memilih jenis produk, memasukkan topik, dan RAIA akan men-generate konten lengkap yang bisa langsung di-preview dan di-export sebagai PDF siap distribusi.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🤖 **AI Content Generation** | Generate konten Islami otomatis menggunakan Google Gemini AI via streaming |
| 📖 **6 Jenis Produk** | E-Book, Checklist Ibadah, Planner, Resep, Panduan Doa, Mini E-Course |
| 📄 **PDF Export** | Preview dan export konten ke PDF format A4 siap cetak/jual |
| 🎨 **Islamic Design** | UI bertema Islami dengan ornamen, pattern geometri, dan palet hijau-emas |
| ⚡ **Real-time Streaming** | Konten muncul secara real-time token-by-token saat di-generate |
| 📱 **Responsive** | Tampilan optimal di desktop maupun mobile |

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui
- **AI Engine:** Google Gemini 2.5 Flash (via Lovable AI Gateway)
- **Backend:** Lovable Cloud (Edge Functions)
- **PDF:** jsPDF + html2canvas
- **Font:** Montserrat (Google Fonts)

---

## 🚀 Quick Start

```bash
# Clone repository
git clone <YOUR_GIT_URL>

# Masuk ke direktori project
cd raia

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka `http://localhost:5173` di browser.

---

## 📂 Struktur Project

```
src/
├── components/
│   ├── IslamicPattern.tsx   # Ornamen geometri Islami (SVG)
│   ├── NavLink.tsx          # Navigasi link
│   ├── PDFPreview.tsx       # Komponen preview & render PDF
│   └── StarsField.tsx       # Animasi bintang background
├── lib/
│   ├── constants.ts         # Tipe produk, harga, sample content
│   ├── exportPDF.ts         # Logic export multi-page PDF
│   ├── streamGenerate.ts    # SSE streaming dari edge function
│   └── utils.ts             # Utility functions
├── pages/
│   └── Index.tsx            # Halaman utama (multi-step wizard)
└── integrations/
    └── supabase/            # Client & types (auto-generated)

supabase/
└── functions/
    └── generate-content/
        └── index.ts         # Edge function: AI content generation
```

---

## 🔄 Alur Penggunaan

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│  Home Page   │───▶│ Pilih Produk │───▶│  Isi Detail  │───▶│  Generating  │───▶│  Preview &  │
│  (Landing)   │    │  (6 opsi)    │    │ (topik,dsb)  │    │  (streaming) │    │  Export PDF  │
└─────────────┘    └──────────────┘    └─────────────┘    └──────────────┘    └─────────────┘
```

---

## 🎨 Proses Vibecoding

### Bagaimana pembagian tugas dengan AI?

Proses pengembangan RAIA menggunakan pendekatan **vibecoding** — kolaborasi intensif antara developer dan AI (Lovable) melalui iterasi prompt yang cepat dan terarah.

**100% AI-Generated:**
- Seluruh kode komponen React (Index.tsx, PDFPreview.tsx, IslamicPattern.tsx, StarsField.tsx)
- Styling CSS dan konfigurasi Tailwind termasuk design tokens dan animasi
- Edge function untuk integrasi AI content generation dengan streaming SSE
- Logic export PDF multi-halaman dengan pagination otomatis
- Konfigurasi project (Vite, TypeScript, ESLint, Supabase)

**Pendekatan Manual (Human Direction):**
- **Arsitektur keputusan:** Memilih untuk menggunakan streaming SSE dibanding response biasa agar UX lebih engaging
- **Desain & estetika:** Mengarahkan palet warna hijau-emas Islami, memilih font Montserrat, dan meminta penghapusan simbol-simbol markdown mentah dari output AI
- **Product thinking:** Menentukan 6 jenis produk digital yang relevan untuk pasar Muslim Indonesia
- **Quality control:** Iterasi berulang untuk memperbaiki bug PDF terpotong, merapikan UI, dan memastikan branding konsisten
- **Branding:** Penamaan "RAIA", penghapusan referensi kompetisi agar terlihat sebagai produk nyata

Secara ringkas, AI menangani **implementasi teknis** sementara manusia bertanggung jawab atas **visi produk, keputusan desain, dan quality assurance**. Setiap fitur dimulai dari prompt manusia yang mendeskripsikan *apa* yang diinginkan, lalu AI mengeksekusi *bagaimana* implementasinya — dengan iterasi koreksi jika hasilnya belum sesuai.

---

## 📜 Lisensi

MIT License — Silakan gunakan dan modifikasi sesuai kebutuhan.

---

<p align="center">
  <strong>🌙 Dibuat dengan ❤️ untuk umat Muslim Indonesia 🌙</strong>
</p>
