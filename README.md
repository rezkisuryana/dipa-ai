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

## 🔄 Alur Penggunaan

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐
│  Home Page   │───▶│ Pilih Produk │───▶│  Isi Detail  │───▶│  Generating  │───▶│ Preview, Export, │
│  (Landing)   │    │  (6 jenis)   │    │ (topik, dll) │    │  (streaming) │    │  Share & Publish │
└─────────────┘    └──────────────┘    └─────────────┘    └──────────────┘    └──────────────────┘
```

## 🌐 Live Demo

🔗 **[https://dipa-ai.lovable.app](https://dipa-ai.lovable.app)**

---

## 📜 Lisensi

MIT License — Silakan gunakan dan modifikasi sesuai kebutuhan.

---

<p align="center">
  <strong>⚡ Dibuat dengan ❤️ untuk creator & solopreneur Indonesia ⚡</strong>
</p>
