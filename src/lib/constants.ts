export const PRODUCT_TYPES = [
  {
    id: "ebook",
    icon: "📖",
    label: "E-Book",
    sublabel: "Buku Digital",
    desc: "Generate e-book Ramadhan siap jual lengkap dengan BAB & isi",
    color: "hsl(217, 91%, 60%)",
    example: "30 Doa Mustajab Ramadhan",
  },
  {
    id: "checklist",
    icon: "✅",
    label: "Checklist",
    sublabel: "Tracker Amalan",
    desc: "Checklist ibadah & amalan harian selama 30 hari Ramadhan",
    color: "hsl(160, 84%, 39%)",
    example: "Tracker Amalan Harian 30 Hari",
  },
  {
    id: "planner",
    icon: "🗓️",
    label: "Planner",
    sublabel: "Jadwal Ramadhan",
    desc: "Planner lengkap sahur, iftar, tadarus, dan target ibadah",
    color: "hsl(258, 90%, 66%)",
    example: "Planner Produktif Ramadhan 2026",
  },
  {
    id: "resep",
    icon: "🍽️",
    label: "Resep",
    sublabel: "Kuliner Ramadhan",
    desc: "Kumpulan resep sahur & buka puasa yang lezat dan bergizi",
    color: "hsl(38, 92%, 50%)",
    example: "50 Resep Sahur Anti Lemas",
  },
  {
    id: "doa",
    icon: "🤲",
    label: "Panduan Doa",
    sublabel: "Doa & Dzikir",
    desc: "Kumpulan doa, dzikir, dan wirid pilihan bulan Ramadhan",
    color: "hsl(var(--gold))",
    example: "Wirid Pagi & Petang Ramadhan",
  },
  {
    id: "kelas",
    icon: "🎓",
    label: "Mini E-Course",
    sublabel: "Kelas Online",
    desc: "Outline & materi kelas online bertema Ramadhan",
    color: "hsl(330, 81%, 60%)",
    example: "Kelas Produktif di Bulan Puasa",
  },
] as const;

export type ProductTypeId = typeof PRODUCT_TYPES[number]["id"];

export const PRICE_SUGGESTIONS: Record<ProductTypeId, string[]> = {
  ebook: ["Rp 29.000", "Rp 49.000", "Rp 79.000"],
  checklist: ["Rp 15.000", "Rp 25.000", "Rp 45.000"],
  planner: ["Rp 19.000", "Rp 35.000", "Rp 55.000"],
  resep: ["Rp 25.000", "Rp 39.000", "Rp 69.000"],
  doa: ["Rp 19.000", "Rp 29.000", "Rp 49.000"],
  kelas: ["Rp 49.000", "Rp 97.000", "Rp 149.000"],
};

export const getSampleContent = (topic: string) => `# ${topic} — Panduan Ramadhan 1447H
## Panduan Lengkap untuk Muslim Indonesia

---
### 🌙 PENDAHULUAN

Bismillahirrahmanirrahim. Segala puji bagi Allah SWT yang telah memberikan kita kesempatan untuk kembali bertemu dengan bulan Ramadhan yang penuh berkah ini.

Produk digital ini hadir sebagai panduan praktis yang InsyaAllah dapat membantu Anda memaksimalkan ibadah dan produktivitas selama bulan Ramadhan 1447H. Dibuat dengan penuh cinta dan keikhlasan untuk membantu sesama Muslim.

---
### 📚 ISI KONTEN

Konten lengkap tentang "${topic}" akan tersedia setelah Anda memasukkan API key Claude yang valid. Produk ini mencakup:

1. **Panduan Komprehensif** — materi lengkap dan terstruktur
2. **Tips Praktis** — yang langsung bisa diterapkan sehari-hari  
3. **Referensi Islami** — dalil dan hadist yang relevan
4. **Template Siap Pakai** — format yang indah untuk dijual

---
### 💡 CARA MENGGUNAKAN

Untuk menggenerate konten penuh, pastikan:
- Koneksi internet stabil
- API key Claude sudah dikonfigurasi di sistem

---
### 🤲 PENUTUP

Semoga Allah SWT meridhai setiap langkah kita dalam beribadah di bulan Ramadhan ini. Aamiin.

*وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ*
"Dan tidak ada taufik bagiku kecuali dari Allah." — QS. Hud: 88`;
