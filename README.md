# ⚡ DIPA — Digital Product AI Assistant

> **Buat Produk Digital Siap Jual — E-Book, Planner, Template, Course — dalam Hitungan Detik dengan AI**

[![Live Demo](https://img.shields.io/badge/Live-Demo-8b5cf6?style=for-the-badge&logo=vercel)](https://dipa-ai.lovable.app)
[![Built with Lovable](https://img.shields.io/badge/Built%20with-Lovable-ec4899?style=for-the-badge)](https://lovable.dev)
[![Powered by AI](https://img.shields.io/badge/Powered%20by-Gemini%20AI-22d3ee?style=for-the-badge&logo=google)](https://ai.google.dev)

---

## 📖 Deskripsi Project

**DIPA (Digital Product AI Assistant)** adalah aplikasi web yang membantu kreator, freelancer, dan solopreneur Indonesia membuat produk digital berkualitas tinggi secara instan menggunakan kecerdasan buatan. Pasar produk digital — e-book, planner, template, mini course — sedang tumbuh pesat seiring booming creator economy, namun banyak calon kreator terhenti karena kesulitan menulis, menyusun struktur konten, dan mendesain output yang profesional. DIPA hadir sebagai *sidekick* AI yang mengubah ide menjadi produk siap jual hanya dalam beberapa klik. Pengguna cukup memilih jenis produk, memasukkan topik dan target audiens, lalu DIPA akan men-generate konten lengkap secara real-time yang bisa langsung di-preview, di-export sebagai PDF, dibagikan ke WhatsApp, atau dipublikasikan ke marketplace digital seperti Lynk.id.

---

## ✨ Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🤖 **AI Content Generation** | Generate konten produk digital otomatis menggunakan Google Gemini 2.5 Flash via streaming SSE |
| 📦 **6 Jenis Produk** | E-Book, Checklist, Planner, Template, Guide, dan Mini Course |
| 📄 **PDF Export** | Preview & export konten ke PDF format A4 multi-halaman siap jual |
| 💬 **Share to WhatsApp** | Template caption otomatis dengan deskripsi produk + hashtag siap broadcast |
| 🛒 **Lynk.id Integration** | Shortcut langsung ke dashboard Lynk.id untuk listing produk |
| ⚡ **Real-time Streaming** | Konten muncul token-by-token saat di-generate (UX seperti ChatGPT) |
| 🎨 **Modern Design** | UI dark theme dengan gradient violet-cyan, ornamen geometris, dan glow effect |
| 📱 **Responsive** | Tampilan optimal di desktop, tablet, maupun mobile |

---

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui (semantic design tokens via HSL)
- **AI Engine:** Google Gemini 2.5 Flash (via Lovable AI Gateway — tanpa API key user)
- **Backend:** Lovable Cloud (Edge Functions + Supabase)
- **PDF Engine:** jsPDF + html2canvas (multi-page pagination)
- **Typography:** Poppins (display) + Plus Jakarta Sans (body) — Google Fonts
- **Deployment:** Lovable Hosting (`dipa-ai.lovable.app`)

---

## 🚀 Quick Start

```bash
# Clone repository
git clone <YOUR_GIT_URL>

# Masuk ke direktori project
cd dipa

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
│   ├── IslamicPattern.tsx   # Ornamen geometris SVG (background decoration)
│   ├── NavLink.tsx          # Komponen navigasi
│   ├── PDFPreview.tsx       # Komponen preview & render PDF
│   └── StarsField.tsx       # Animasi partikel background
├── lib/
│   ├── constants.ts         # Definisi 6 jenis produk + price suggestions
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
┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐
│  Home Page   │───▶│ Pilih Produk │───▶│  Isi Detail  │───▶│  Generating  │───▶│ Preview, Export, │
│  (Landing)   │    │  (6 jenis)   │    │ (topik, dll) │    │  (streaming) │    │  Share & Publish │
└─────────────┘    └──────────────┘    └─────────────┘    └──────────────┘    └──────────────────┘
```

---

## 🎨 Proses Vibecoding

### Bagaimana pembagian tugas dengan AI?

Proses pengembangan DIPA menggunakan pendekatan **vibecoding** — kolaborasi intensif antara developer dan AI (Lovable) melalui iterasi prompt yang cepat dan terarah. Project ini awalnya dibangun sebagai **RAIA (Ramadhan AI Assistant)** untuk pasar produk digital Islami, lalu di-pivot menjadi **DIPA** untuk pasar produk digital general dengan rebranding lengkap (warna, font, copywriting, hingga edge function prompt).

**100% AI-Generated:**
- Seluruh kode komponen React (Index.tsx, PDFPreview.tsx, IslamicPattern.tsx, StarsField.tsx)
- Styling CSS dan konfigurasi Tailwind termasuk design tokens HSL dan animasi
- Edge function untuk integrasi AI content generation dengan streaming SSE
- Logic export PDF multi-halaman dengan pagination otomatis
- Integrasi share-to-WhatsApp dan shortcut ke marketplace Lynk.id
- Konfigurasi project (Vite, TypeScript, ESLint, Supabase)

**Pendekatan Manual (Human Direction):**
- **Arsitektur keputusan:** Memilih streaming SSE dibanding response biasa agar UX lebih engaging seperti ChatGPT
- **Desain & estetika:** Mengarahkan rebranding dari hijau-emas Islami ke palet violet-cyan modern, mengganti font dari Montserrat ke Poppins + Plus Jakarta Sans, dan menyusun ulang layout home page
- **Product thinking:** Menentukan 6 jenis produk digital (e-book, checklist, planner, template, guide, mini course) yang relevan untuk creator economy Indonesia
- **Branding:** Iterasi penamaan brand dari Produkly → DIPA (mengikuti pola akronim seperti RAIA), penyusunan tagline, dan voice produk yang action-oriented
- **Quality control:** Iterasi berulang untuk memperbaiki bug PDF terpotong, error upload Lynk.id, dan memastikan konsistensi brand di seluruh touchpoint (UI, PDF, caption WhatsApp, meta tags)
- **Distribution thinking:** Menambahkan integrasi WhatsApp share dan Lynk.id agar user bisa langsung monetize produk yang di-generate

Secara ringkas, AI menangani **implementasi teknis** sementara manusia bertanggung jawab atas **visi produk, keputusan desain, branding, dan quality assurance**. Setiap fitur dimulai dari prompt manusia yang mendeskripsikan *apa* yang diinginkan, lalu AI mengeksekusi *bagaimana* implementasinya — dengan iterasi koreksi jika hasilnya belum sesuai.

---

## 🌐 Live Demo

🔗 **[https://dipa-ai.lovable.app](https://dipa-ai.lovable.app)**

---

## 📜 Lisensi

MIT License — Silakan gunakan dan modifikasi sesuai kebutuhan.

---

<p align="center">
  <strong>⚡ Dibuat dengan ❤️ untuk creator & solopreneur Indonesia ⚡</strong>
</p>
