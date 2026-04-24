export const PRODUCT_TYPES = [
  {
    id: "ebook",
    icon: "📖",
    label: "E-Book",
    sublabel: "Buku Digital",
    desc: "Generate e-book profesional siap jual lengkap dengan BAB & isi terstruktur",
    color: "hsl(262, 83%, 65%)",
    example: "Panduan Produktivitas untuk Freelancer",
  },
  {
    id: "checklist",
    icon: "✅",
    label: "Checklist",
    sublabel: "Daftar Periksa",
    desc: "Checklist actionable untuk membantu audiens mencapai target spesifik",
    color: "hsl(190, 95%, 55%)",
    example: "Checklist Launching Produk Digital",
  },
  {
    id: "planner",
    icon: "🗓️",
    label: "Planner",
    sublabel: "Perencana Harian",
    desc: "Template planner mingguan/bulanan dengan struktur yang siap pakai",
    color: "hsl(280, 75%, 65%)",
    example: "Planner 30 Hari Bangun Habit Baru",
  },
  {
    id: "template",
    icon: "📋",
    label: "Template",
    sublabel: "Siap Pakai",
    desc: "Template dokumen, script, atau workflow untuk berbagai kebutuhan bisnis",
    color: "hsl(38, 92%, 60%)",
    example: "Template Cold Email untuk Klien",
  },
  {
    id: "guide",
    icon: "🧭",
    label: "Guide / Panduan",
    sublabel: "Step-by-Step",
    desc: "Panduan lengkap step-by-step untuk menyelesaikan masalah pembaca",
    color: "hsl(320, 85%, 65%)",
    example: "Panduan Mulai Bisnis Online dari Nol",
  },
  {
    id: "course",
    icon: "🎓",
    label: "Mini Course",
    sublabel: "Kelas Online",
    desc: "Outline & materi mini course berisi modul, tugas, dan refleksi",
    color: "hsl(160, 84%, 50%)",
    example: "Mini Course: Personal Branding di LinkedIn",
  },
] as const;

export type ProductTypeId = typeof PRODUCT_TYPES[number]["id"];

export const PRICE_SUGGESTIONS: Record<ProductTypeId, string[]> = {
  ebook: ["Rp 49.000", "Rp 99.000", "Rp 149.000"],
  checklist: ["Rp 19.000", "Rp 35.000", "Rp 59.000"],
  planner: ["Rp 29.000", "Rp 49.000", "Rp 79.000"],
  template: ["Rp 35.000", "Rp 69.000", "Rp 119.000"],
  guide: ["Rp 39.000", "Rp 79.000", "Rp 129.000"],
  course: ["Rp 99.000", "Rp 199.000", "Rp 349.000"],
};
