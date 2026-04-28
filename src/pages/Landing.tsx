import { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCT_TYPES } from "@/lib/constants";
import {
  Sparkles,
  Check,
  ChevronDown,
  ArrowRight,
  Bot,
  Download,
  Share2,
  Wand2,
  Menu,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Produk", href: "#products" },
  { label: "Fitur", href: "#features" },
  { label: "Integrasi", href: "#integrations" },
  { label: "Testimoni", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const FEATURE_TABS = [
  {
    id: "ai",
    label: "AI Generate",
    icon: Bot,
    title: "Tulis 1 Topik, AI Susun Seluruh Produk",
    desc: "DIPA memakai Gemini untuk menulis outline, isi, dan struktur produk digitalmu — siap dipasarkan dalam 30 detik.",
    bullets: ["Streaming real-time", "Bahasa ID & EN", "Saran harga otomatis"],
  },
  {
    id: "pdf",
    label: "Export PDF",
    icon: Download,
    title: "Export PDF Profesional Siap Jual",
    desc: "Hasil generate langsung diformat rapi sebagai PDF dengan tipografi modern — tinggal upload ke marketplace.",
    bullets: ["Layout konsisten", "Branding minimalis", "Satu klik download"],
  },
  {
    id: "share",
    label: "Share & Sell",
    icon: Share2,
    title: "Promosikan via WhatsApp & Lynk.id",
    desc: "Caption promosi otomatis & integrasi cepat ke Lynk.id agar produkmu langsung tampil di etalase digital.",
    bullets: ["Auto-caption WhatsApp", "Copy ke Lynk.id", "Link siap share"],
  },
];

const INTEGRATIONS = [
  { name: "Lynk.id", emoji: "🔗" },
  { name: "WhatsApp", emoji: "💬" },
  { name: "Notion", emoji: "📝" },
  { name: "Gumroad", emoji: "🛒" },
  { name: "Canva", emoji: "🎨" },
  { name: "Google Drive", emoji: "📂" },
];

const TESTIMONIALS = [
  {
    name: "Rina Pratiwi",
    role: "Content Creator",
    quote:
      "DIPA bantu aku launching e-book pertama dalam 1 jam. Outline-nya rapi dan langsung bisa kujual di Lynk.id.",
  },
  {
    name: "Aldo Mahendra",
    role: "Freelance Designer",
    quote:
      "Workflow-nya simpel banget. Aku biasanya stuck di outline, sekarang AI yang nyusun, aku tinggal polish.",
  },
  {
    name: "Sasha Wibowo",
    role: "Founder UMKM",
    quote:
      "Saya bikin 4 mini course dalam seminggu pakai DIPA. Tim saya tinggal review dan posting. Game changer.",
  },
];

const FAQS = [
  {
    q: "Apa itu DIPA?",
    a: "DIPA (Digital Product AI Assistant) adalah platform yang membantu creator dan freelancer membuat produk digital siap jual seperti e-book, planner, template, dan course menggunakan AI.",
  },
  {
    q: "Apakah DIPA gratis digunakan?",
    a: "Ya, kamu bisa generate produk digital secara gratis tanpa perlu sign up. Tidak ada data yang disimpan di server kami.",
  },
  {
    q: "Format file apa yang didukung?",
    a: "Saat ini DIPA mendukung export PDF profesional dan plain text (.txt). Kamu juga bisa copy konten langsung ke Notion, Google Docs, atau marketplace lain.",
  },
  {
    q: "Bagaimana cara menjual produknya?",
    a: "DIPA terintegrasi dengan Lynk.id — tinggal satu klik, konten otomatis disalin ke clipboard dan halaman upload Lynk.id terbuka. Kamu juga bisa share langsung ke WhatsApp.",
  },
];

const Landing = () => {
  const [activeTab, setActiveTab] = useState("ai");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeFeature = FEATURE_TABS.find((t) => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* ───── NAVBAR ───── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-lg shadow-md"
              style={{ background: "var(--gradient-brand)" }}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">DIPA</span>
          </Link>

          <ul className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/app"
              className="hidden sm:inline-flex rounded-full px-4 sm:px-5 py-2 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
              style={{ background: "var(--gradient-brand)" }}
            >
              Mulai Gratis
            </Link>
            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              className="md:hidden w-10 h-10 rounded-xl border border-border bg-white flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <ul className="px-4 py-3 flex flex-col gap-1 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-foreground hover:bg-muted transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/app"
                  onClick={() => setMobileNavOpen(false)}
                  className="block text-center rounded-full px-5 py-2.5 text-white text-sm font-semibold shadow-md"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  Mulai Gratis
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* ───── HERO ───── */}
      <section
        className="relative overflow-hidden px-4 sm:px-6 pt-12 sm:pt-20 pb-20 sm:pb-28"
        style={{ background: "var(--gradient-hero)" }}
      >
        {/* Soft floating orbs */}
        <div className="absolute -top-32 -left-32 w-72 sm:w-96 h-72 sm:h-96 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--violet-light)), transparent 70%)" }} />
        <div className="absolute -top-20 right-0 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, hsl(var(--cyan-light)), transparent 70%)" }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-border rounded-full px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold text-primary mb-5 sm:mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Digital Product Builder
          </div>

          <h1 className="font-display font-bold tracking-tight leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-5"
            style={{ fontSize: "clamp(30px, 6.5vw, 68px)" }}>
            Buat Produk Digital
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-brand)" }}
            >
              Siap Jual dalam Detik
            </span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-7 sm:mb-9 leading-relaxed px-2">
            DIPA bantu creator & freelancer auto-generate e-book, planner, template, dan course
            dengan AI — lalu langsung export PDF dan share ke marketplace.
          </p>

          {/* Email capture */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = "/app";
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 bg-white/90 backdrop-blur p-2 sm:p-1.5 rounded-2xl sm:rounded-full border border-border shadow-soft max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email kamu"
              className="flex-1 bg-transparent px-4 py-2.5 text-sm focus:outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="rounded-full px-5 py-2.5 text-white text-sm font-semibold whitespace-nowrap shadow-md hover:shadow-lg transition-all"
              style={{ background: "var(--gradient-brand)" }}
            >
              Mulai Sekarang
            </button>
          </form>

          <p className="text-xs text-muted-foreground mt-4">
            Gratis • Tanpa kartu kredit • Tanpa simpan data
          </p>
        </div>

        {/* Product Cards Grid */}
        <div id="products" className="relative max-w-6xl mx-auto mt-12 sm:mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {PRODUCT_TYPES.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-border shadow-soft hover:shadow-brand hover:-translate-y-1 transition-all"
            >
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{p.icon}</div>
              <div className="font-display font-bold text-sm mb-1 leading-tight">{p.label}</div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-wide font-semibold mb-2"
                style={{ color: p.color }}>
                {p.sublabel}
              </div>
              <div className="text-xs text-muted-foreground leading-snug line-clamp-3">
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── FEATURES TABS ───── */}
      <section id="features" className="px-6 py-24 bg-background">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <div className="inline-block bg-muted text-muted-foreground rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-4">
            Features
          </div>
          <h2 className="font-display font-bold tracking-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Semua yang Kamu Butuhkan untuk
            <br />
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-brand)" }}>
              Produk Digital Profesional
            </span>
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {FEATURE_TABS.map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  active
                    ? "text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
                style={active ? { background: "var(--gradient-brand)" } : {}}
              >
                <Icon className="w-4 h-4" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Active feature card */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 items-center bg-white rounded-3xl p-8 md:p-10 border border-border shadow-soft">
          <div>
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-4 leading-tight">
              {activeFeature.title}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">{activeFeature.desc}</p>
            <ul className="space-y-3">
              {activeFeature.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                    style={{ background: "var(--gradient-brand)" }}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                  {b}
                </li>
              ))}
            </ul>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 mt-7 rounded-full px-5 py-2.5 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
              style={{ background: "var(--gradient-brand)" }}
            >
              Coba Sekarang <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Visual mock */}
          <div
            className="rounded-2xl p-6 h-72 flex items-center justify-center relative overflow-hidden"
            style={{ background: "var(--gradient-aurora)" }}
          >
            <div className="absolute inset-4 bg-white/80 backdrop-blur rounded-xl border border-white shadow-lg p-5 flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
              </div>
              <div className="h-3 bg-violet/20 rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-full" />
              <div className="h-3 bg-muted rounded w-5/6" />
              <div className="h-3 bg-muted rounded w-2/3" />
              <div className="mt-2 flex gap-2">
                <div className="h-6 w-20 rounded-md" style={{ background: "var(--gradient-brand)" }} />
                <div className="h-6 w-16 rounded-md bg-muted" />
              </div>
              <div className="h-3 bg-muted rounded w-full mt-2" />
              <div className="h-3 bg-muted rounded w-4/6" />
            </div>
          </div>
        </div>
      </section>

      {/* ───── INTEGRATIONS ───── */}
      <section id="integrations" className="px-6 py-20"
        style={{ background: "var(--gradient-aurora)" }}>
        <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur border border-white rounded-3xl p-10 shadow-soft">
          <div className="text-center mb-10">
            <div className="inline-block bg-white text-muted-foreground rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-4 border border-border">
              Integrasi
            </div>
            <h2 className="font-display font-bold tracking-tight"
              style={{ fontSize: "clamp(26px, 3.5vw, 36px)" }}>
              Tools Favoritmu Sudah Terhubung
            </h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {INTEGRATIONS.map((i) => (
              <div
                key={i.name}
                className="bg-white rounded-2xl p-5 flex flex-col items-center gap-2 border border-border shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-3xl">{i.emoji}</div>
                <div className="text-xs font-semibold text-foreground">{i.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section id="testimonials" className="px-6 py-24 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block bg-muted text-muted-foreground rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-4">
              Testimoni
            </div>
            <h2 className="font-display font-bold tracking-tight"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
              Dipakai Ribuan Creator Indonesia
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className={`rounded-3xl p-7 border transition-all ${
                  i === 0
                    ? "text-white border-transparent shadow-brand"
                    : "bg-white border-border shadow-soft"
                }`}
                style={i === 0 ? { background: "var(--gradient-brand)" } : {}}
              >
                <p className={`text-sm leading-relaxed mb-6 ${i === 0 ? "text-white/95" : "text-foreground"}`}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    i === 0 ? "bg-white/20 text-white" : "bg-muted text-foreground"
                  }`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className={`font-semibold text-sm ${i === 0 ? "text-white" : "text-foreground"}`}>
                      {t.name}
                    </div>
                    <div className={`text-xs ${i === 0 ? "text-white/70" : "text-muted-foreground"}`}>
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FAQ ───── */}
      <section id="faq" className="px-6 py-24 bg-muted/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-white text-muted-foreground rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider mb-4 border border-border">
              FAQ
            </div>
            <h2 className="font-display font-bold tracking-tight"
              style={{ fontSize: "clamp(26px, 3.5vw, 38px)" }}>
              Pertanyaan yang Sering Ditanyakan
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 text-left"
                  >
                    <span className="font-semibold text-sm md:text-base">{f.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="px-6 py-24" style={{ background: "var(--gradient-hero)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display font-bold tracking-tight mb-4"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Siap Bangun Produk Digital Pertamamu?
          </h2>
          <p className="text-muted-foreground mb-8">
            Mulai gratis sekarang — tidak perlu sign up, langsung generate.
          </p>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-white font-semibold shadow-md hover:shadow-lg transition-all"
            style={{ background: "var(--gradient-brand)" }}
          >
            <Wand2 className="w-5 h-5" />
            Generate Produk Pertamamu
          </Link>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className="px-6 py-10 border-t border-border bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
              style={{ background: "var(--gradient-brand)" }}
            >
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-display font-bold text-foreground">DIPA</span>
            <span className="text-xs">© 2026 — Digital Product AI Assistant</span>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <a href="#products" className="hover:text-foreground transition">Produk</a>
            <a href="#features" className="hover:text-foreground transition">Fitur</a>
            <a href="#faq" className="hover:text-foreground transition">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
