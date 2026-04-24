import { useState, useRef, useEffect, useCallback } from "react";
import { toast } from "sonner";
import StarsField from "@/components/StarsField";
import IslamicPattern from "@/components/IslamicPattern";
import PDFPreview from "@/components/PDFPreview";
import { PRODUCT_TYPES, PRICE_SUGGESTIONS } from "@/lib/constants";
import type { ProductTypeId } from "@/lib/constants";
import { exportPDF } from "@/lib/exportPDF";
import { streamGenerate } from "@/lib/streamGenerate";

type Step = "home" | "select" | "form" | "generating" | "result";

/** Strip markdown symbols for display */
function cleanDisplayLine(line: string): string {
  let cleaned = line.replace(/^#{1,6}\s*/, '');
  cleaned = cleaned.replace(/\*\*/g, '');
  cleaned = cleaned.replace(/(?<!\*)\*(?!\*)/g, '');
  return cleaned;
}

const Index = () => {
  const [step, setStep] = useState<Step>("home");
  const [selectedType, setSelectedType] = useState<ProductTypeId | null>(null);
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [lang, setLang] = useState("id");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [streamText, setStreamText] = useState("");
  const [showPDF, setShowPDF] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const selectedProduct = PRODUCT_TYPES.find(p => p.id === selectedType);

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 92) { clearInterval(interval); return p; }
          return p + Math.random() * 4;
        });
      }, 300);
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isGenerating]);

  const handleGenerate = async () => {
    if (!topic.trim() || !selectedType) return;
    setStep("generating");
    setIsGenerating(true);
    setGeneratedContent("");
    setStreamText("");

    let accumulated = "";

    try {
      await streamGenerate({
        topic,
        productType: selectedType,
        audience,
        lang,
        onDelta: (chunk) => {
          accumulated += chunk;
          setStreamText(accumulated);
        },
        onDone: () => {
          setGeneratedContent(accumulated);
          setProgress(100);
          setTimeout(() => {
            setIsGenerating(false);
            setStep("result");
          }, 400);
        },
        onError: (error) => {
          toast.error(error);
          setIsGenerating(false);
          setStep("form");
        },
      });
    } catch (e) {
      console.error(e);
      toast.error("Terjadi kesalahan saat generate konten.");
      setIsGenerating(false);
      setStep("form");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = async () => {
    setShowPDF(true);
    setTimeout(async () => {
      try {
        setIsExporting(true);
        const filename = `${topic.replace(/\s+/g, "-").toLowerCase()}-ramadhan.pdf`;
        await exportPDF(filename);
        toast.success("PDF berhasil diunduh!");
      } catch (e) {
        console.error(e);
        toast.error("Gagal mengexport PDF. Coba lagi.");
      } finally {
        setIsExporting(false);
      }
    }, 800);
  };

  const handleExportText = () => {
    const blob = new Blob([generatedContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.replace(/\s+/g, "-").toLowerCase()}-ramadhan.txt`;
    a.click();
  };

  const handleShareWhatsApp = () => {
    const productName = selectedProduct?.label || "Produk Digital";
    const promoText = `🌙 *${topic}* — ${productName} Islami\n\nProduk digital berkualitas tinggi untuk Ramadhan 1447H.\nDibuat dengan AI, siap digunakan!\n\n✨ Cek di sini: ${window.location.origin}\n\n#Ramadhan #ProdukDigital #RAIA`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(promoText)}`;
    window.open(waUrl, "_blank");
  };

  const handleUploadLynk = async () => {
    const productName = selectedProduct?.label || "Produk Digital";
    const description = `${topic} — ${productName} Islami\n\nProduk digital berkualitas tinggi untuk Ramadhan 1447H. Dibuat dengan AI RAIA.\n\n--- ISI PRODUK ---\n\n${generatedContent}`;

    try {
      // 1. Copy konten lengkap (judul + deskripsi + isi) ke clipboard
      await navigator.clipboard.writeText(description);

      // 2. Download .txt sebagai file produk siap upload
      const blob = new Blob([generatedContent], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${topic.replace(/\s+/g, "-").toLowerCase()}-ramadhan.txt`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success("Konten tersalin & file diunduh! Membuka Lynk.id...");

      // 3. Buka dashboard Lynk.id di tab baru (login dulu lalu klik "Tambah Produk")
      setTimeout(() => {
        window.open("https://app.lynk.id/", "_blank");
      }, 600);
    } catch (e: any) {
      console.error(e);
      toast.error("Gagal menyiapkan konten Lynk.id: " + (e?.message || "Unknown error"));
    }
  };

  const handleReset = () => {
    setStep("home");
    setSelectedType(null);
    setTopic("");
    setAudience("");
    setGeneratedContent("");
    setStreamText("");
    setShowPDF(false);
  };

  // ── HOME ──
  if (step === "home") return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-5 py-10" style={{ background: "linear-gradient(160deg, hsl(150 40% 3%) 0%, hsl(150 35% 8%) 40%, hsl(150 40% 3%) 100%)" }}>
      <StarsField />
      <IslamicPattern />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className="animate-float mb-8">
          <div className="w-[90px] h-[90px] rounded-[20px] flex items-center justify-center text-[42px] border-2 border-primary/50" style={{ background: "linear-gradient(135deg, hsl(var(--emerald-dark)), hsl(var(--emerald)))", boxShadow: "0 0 40px hsl(var(--gold) / 0.2), 0 20px 60px rgba(0,0,0,0.4)" }}>
            🌙
          </div>
        </div>

        {/* Badge */}
        <div className="animate-fade-up bg-primary/10 border border-primary/30 rounded-full px-5 py-1.5 mb-6 text-primary text-[11px] tracking-[3px] uppercase font-semibold">
          ✦ AI-Powered Islamic Content ✦
        </div>

        {/* Title */}
        <h1 className="font-display text-center leading-none mb-3 animate-fade-up font-bold" style={{ fontSize: "clamp(32px, 7vw, 64px)", animationDelay: "0.1s" }}>
          <span className="gold-shimmer">RAIA</span>
        </h1>

        <p className="text-muted-foreground text-center max-w-[500px] leading-relaxed mb-12 font-body animate-fade-up font-light" style={{ fontSize: "clamp(14px, 2.5vw, 17px)", animationDelay: "0.2s" }}>
          Buat produk digital Islami siap jual dalam hitungan detik.<br />
          AI generate, Export PDF, langsung berjualan 🚀
        </p>

        {/* Feature pills */}
        <div className="flex gap-2.5 flex-wrap justify-center mb-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          {["🤖 AI-Powered", "📄 Export PDF", "⚡ 30 Detik Jadi", "🌙 Tema Ramadhan"].map(f => (
            <span key={f} className="bg-foreground/5 border border-foreground/10 rounded-full px-3.5 py-1.5 text-foreground/55 text-xs">
              {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button onClick={() => setStep("select")} className="btn-glow px-12 py-4 border-none rounded-[14px] cursor-pointer text-foreground text-[17px] font-bold font-display tracking-wide animate-fade-up" style={{ background: "linear-gradient(135deg, hsl(var(--emerald)) 0%, hsl(var(--emerald-light)) 50%, hsl(var(--gold)) 100%)", boxShadow: "0 8px 40px hsl(var(--emerald) / 0.4)", animationDelay: "0.4s" }}>
          ✨ Mulai Buat Produk
        </button>

        <p className="text-foreground/20 text-[11px] mt-4 animate-fade-up" style={{ animationDelay: "0.5s" }}>
          Gratis • Tanpa simpan data
        </p>
      </div>

      {/* Bottom stats */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8 text-foreground/20 text-xs text-center">
        {["6 Jenis Produk", "AI Powered", "PDF Instant"].map(s => (
          <div key={s}>
            <div className="text-primary text-lg font-bold font-display">{s.split(' ')[0]}</div>
            <div>{s.split(' ').slice(1).join(' ')}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── SELECT ──
  if (step === "select") return (
    <div className="min-h-screen relative z-10 px-5 py-10" style={{ background: "linear-gradient(160deg, hsl(150 40% 3%) 0%, hsl(150 35% 8%) 40%, hsl(150 40% 3%) 100%)" }}>
      <StarsField />
      <IslamicPattern />
      <div className="max-w-[800px] mx-auto relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <button onClick={() => setStep("home")} className="bg-foreground/5 border border-foreground/10 rounded-lg px-3.5 py-2 cursor-pointer text-muted-foreground text-[13px]">
            ← Kembali
          </button>
          <div>
            <div className="text-muted-foreground text-[11px] tracking-[2px] uppercase font-medium">Langkah 1 dari 2</div>
            <h2 className="font-display text-[22px] text-foreground font-bold">Pilih Jenis Produk Digital</h2>
          </div>
        </div>

        <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
          {PRODUCT_TYPES.map((p, i) => (
            <div
              key={p.id}
              className="card-hover rounded-2xl p-6 cursor-pointer animate-fade-up"
              onClick={() => setSelectedType(p.id as ProductTypeId)}
              style={{
                background: selectedType === p.id ? `linear-gradient(135deg, ${p.color}20, rgba(0,0,0,0.3))` : "rgba(255,255,255,0.04)",
                border: `1.5px solid ${selectedType === p.id ? p.color : "hsl(var(--border))"}`,
                boxShadow: selectedType === p.id ? `0 0 30px ${p.color}25` : "none",
                animationDelay: `${i * 0.07}s`,
              }}
            >
              <div className="text-[32px] mb-3">{p.icon}</div>
              <div className="text-foreground font-display text-[15px] mb-1 font-bold">{p.label}</div>
              <div className="text-[11px] tracking-wide uppercase mb-2.5 font-semibold" style={{ color: p.color }}>{p.sublabel}</div>
              <div className="text-muted-foreground text-xs leading-relaxed">{p.desc}</div>
              <div className="mt-3 px-2.5 py-1.5 bg-foreground/5 rounded-md text-foreground/30 text-[11px] italic">
                Contoh: &ldquo;{p.example}&rdquo;
              </div>
            </div>
          ))}
        </div>

        {selectedType && (
          <div className="text-center animate-fade-up">
            <button onClick={() => setStep("form")} className="btn-glow px-12 py-4 border-none rounded-xl cursor-pointer text-foreground text-base font-bold font-display" style={{ background: `linear-gradient(135deg, hsl(var(--emerald)), ${selectedProduct?.color})`, boxShadow: `0 8px 30px ${selectedProduct?.color}25` }}>
              {selectedProduct?.icon} Lanjut: Isi Detail →
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // ── FORM ──
  if (step === "form") return (
    <div className="min-h-screen relative z-10 px-5 py-10 flex items-center" style={{ background: "linear-gradient(160deg, hsl(150 40% 3%) 0%, hsl(150 35% 8%) 40%, hsl(150 40% 3%) 100%)" }}>
      <StarsField />
      <IslamicPattern />
      <div className="max-w-[580px] mx-auto w-full relative z-10">
        <div className="flex items-center gap-4 mb-9">
          <button onClick={() => setStep("select")} className="bg-foreground/5 border border-foreground/10 rounded-lg px-3.5 py-2 cursor-pointer text-muted-foreground text-[13px]">
            ← Kembali
          </button>
          <div>
            <div className="text-muted-foreground text-[11px] tracking-[2px] uppercase font-medium">Langkah 2 dari 2</div>
            <h2 className="font-display text-[22px] text-foreground font-bold">{selectedProduct?.icon} Isi Detail Produk</h2>
          </div>
        </div>

        {/* Selected badge */}
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7" style={{ background: `${selectedProduct?.color}15`, border: `1px solid ${selectedProduct?.color}40` }}>
          <span>{selectedProduct?.icon}</span>
          <span className="text-xs font-semibold" style={{ color: selectedProduct?.color }}>
            {selectedProduct?.label} — {selectedProduct?.sublabel}
          </span>
        </div>

        {/* Form */}
        <div className="bg-foreground/[0.04] backdrop-blur-xl border border-foreground/10 rounded-[20px] p-8">
          {/* Topic */}
          <div className="mb-6">
            <label className="block text-primary text-[11px] tracking-[2px] uppercase mb-2.5 font-semibold">Topik / Judul Produk *</label>
            <input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder={`Contoh: "${selectedProduct?.example}"`}
              className="w-full px-4 py-3.5 bg-foreground/[0.06] border-[1.5px] border-foreground/10 rounded-lg text-foreground text-[15px] font-body transition-colors focus:border-primary/60 focus:outline-none"
            />
          </div>

          {/* Audience */}
          <div className="mb-6">
            <label className="block text-primary text-[11px] tracking-[2px] uppercase mb-2.5 font-semibold">Target Pembaca</label>
            <input
              value={audience}
              onChange={e => setAudience(e.target.value)}
              placeholder="Contoh: Ibu rumah tangga, Mahasiswa, Profesional Muslim..."
              className="w-full px-4 py-3.5 bg-foreground/[0.06] border-[1.5px] border-foreground/10 rounded-lg text-foreground text-[15px] font-body transition-colors focus:border-primary/60 focus:outline-none"
            />
          </div>

          {/* Language */}
          <div className="mb-7">
            <label className="block text-primary text-[11px] tracking-[2px] uppercase mb-2.5 font-semibold">Bahasa</label>
            <div className="flex gap-2.5">
              {([["id", "🇮🇩 Indonesia"], ["bilingual", "🇸🇦 + Indonesia"]] as const).map(([v, l]) => (
                <button
                  key={v}
                  onClick={() => setLang(v)}
                  className="flex-1 py-2.5 rounded-lg text-[13px] transition-all cursor-pointer font-medium"
                  style={{
                    background: lang === v ? "hsl(var(--gold) / 0.2)" : "rgba(255,255,255,0.04)",
                    border: `1.5px solid ${lang === v ? "hsl(var(--gold))" : "hsl(var(--border))"}`,
                    color: lang === v ? "hsl(var(--gold))" : "hsl(var(--muted-foreground))",
                  }}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Price suggestion */}
          {selectedType && (
            <div className="bg-primary/[0.08] border border-primary/20 rounded-lg p-3.5 mb-7">
              <div className="text-primary text-[11px] tracking-wide mb-2 font-semibold">💰 SARAN HARGA JUAL</div>
              <div className="flex gap-2">
                {PRICE_SUGGESTIONS[selectedType]?.map(p => (
                  <span key={p} className="bg-primary/15 rounded-md px-2.5 py-1 text-foreground text-xs font-semibold">{p}</span>
                ))}
              </div>
            </div>
          )}

          {/* Generate */}
          <button
            onClick={handleGenerate}
            disabled={!topic.trim()}
            className="btn-glow w-full py-4 border-none rounded-xl text-base font-bold font-display tracking-wide transition-all"
            style={{
              background: topic.trim()
                ? "linear-gradient(135deg, hsl(var(--emerald)) 0%, hsl(var(--emerald-light)) 40%, hsl(var(--gold)) 100%)"
                : "hsl(var(--muted))",
              color: topic.trim() ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
              cursor: topic.trim() ? "pointer" : "not-allowed",
              boxShadow: topic.trim() ? "0 8px 35px hsl(var(--emerald) / 0.4)" : "none",
            }}
          >
            🤖 Generate dengan AI →
          </button>
        </div>
      </div>
    </div>
  );

  // ── GENERATING ──
  if (step === "generating") return (
    <div className="min-h-screen relative z-10 flex flex-col items-center justify-center px-5 py-10" style={{ background: "linear-gradient(160deg, hsl(150 40% 3%) 0%, hsl(150 35% 8%) 40%, hsl(150 40% 3%) 100%)" }}>
      <StarsField />
      <IslamicPattern />
      <div className="max-w-[600px] w-full text-center relative z-10">
        {/* Spinner */}
        <div className="relative w-[120px] h-[120px] mx-auto mb-10">
          <div className="absolute inset-0 rounded-full border-[3px] border-primary/15 border-t-primary animate-spin-slow" />
          <div className="absolute inset-3 rounded-full border-2 border-secondary/20 border-b-secondary animate-spin-slow-reverse" />
          <div className="absolute inset-0 flex items-center justify-center text-[40px]">🤖</div>
        </div>

        <h2 className="font-display text-[26px] mb-2 font-bold">
          <span className="gold-shimmer">AI Sedang Menulis...</span>
        </h2>
        <p className="text-muted-foreground mb-8 font-body text-[15px]">
          Membuat &ldquo;{topic}&rdquo; — {selectedProduct?.label}
        </p>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[0, 0.2, 0.4].map((d, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-primary animate-pulse-ring" style={{ animationDelay: `${d}s` }} />
          ))}
        </div>

        {/* Progress */}
        <div className="bg-foreground/[0.06] rounded-lg h-1.5 overflow-hidden mb-3">
          <div className="h-full rounded-lg transition-all duration-300" style={{ width: `${progress}%`, background: "linear-gradient(90deg, hsl(var(--emerald)), hsl(var(--gold)))", boxShadow: "0 0 10px hsl(var(--gold) / 0.5)" }} />
        </div>
        <div className="text-foreground/30 text-xs mb-8">{Math.round(progress)}% selesai</div>

        {/* Stream preview */}
        {streamText && (
          <div className="bg-foreground/[0.04] border border-foreground/[0.08] rounded-xl p-5 text-left max-h-[200px] overflow-hidden relative">
            <div className="absolute bottom-0 left-0 right-0 h-[60px]" style={{ background: "linear-gradient(transparent, hsl(150 40% 3% / 0.9))" }} />
            <p className="text-foreground/50 text-xs font-body leading-relaxed whitespace-pre-wrap break-words">
              {cleanDisplayLine(streamText.slice(-400))}
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // ── RESULT ──
  if (step === "result") return (
    <>
      {showPDF && (
        <div className="fixed inset-0 z-[100] overflow-auto px-5 py-10" style={{ background: "rgba(0,0,0,0.85)" }}>
          <div className="text-center mb-5">
            <button onClick={() => { setShowPDF(false); }} className="bg-foreground/10 border border-foreground/20 rounded-lg px-5 py-2 cursor-pointer text-foreground text-[13px] mr-3">
              ✕ Tutup Preview
            </button>
            <button
              disabled={isExporting}
              onClick={async () => {
                try {
                  setIsExporting(true);
                  const filename = `${topic.replace(/\s+/g, "-").toLowerCase()}-ramadhan.pdf`;
                  await exportPDF(filename);
                  toast.success("PDF berhasil diunduh!");
                } catch (e) {
                  console.error(e);
                  toast.error("Gagal mengexport PDF.");
                } finally {
                  setIsExporting(false);
                }
              }}
              className="border-none rounded-lg px-5 py-2 cursor-pointer text-foreground text-[13px] font-bold"
              style={{ background: "linear-gradient(135deg, hsl(var(--emerald)), hsl(var(--gold)))" }}
            >
              {isExporting ? "⏳ Mengexport..." : "📄 Download PDF"}
            </button>
          </div>
          {selectedType && <PDFPreview content={generatedContent} productType={selectedType} topic={topic} />}
        </div>
      )}

      <div className="min-h-screen relative z-10 px-5 py-8 pb-16" style={{ background: "linear-gradient(160deg, hsl(150 40% 3%) 0%, hsl(150 35% 8%) 40%, hsl(150 40% 3%) 100%)" }}>
        {!showPDF && <StarsField />}
        {!showPDF && <IslamicPattern />}

        <div className="max-w-[900px] mx-auto relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-3 mb-7">
            <div className="flex items-center gap-3">
              <div className="rounded-lg w-10 h-10 flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg, hsl(var(--emerald)), hsl(var(--emerald-light)))" }}>✅</div>
              <div>
                <div className="text-emerald-light text-xs tracking-wide font-semibold">KONTEN BERHASIL DIBUAT</div>
                <div className="text-foreground font-display text-base font-bold">{selectedProduct?.icon} {topic}</div>
              </div>
            </div>
            <button onClick={handleReset} className="bg-foreground/5 border border-foreground/10 rounded-lg px-4 py-2 cursor-pointer text-muted-foreground text-[13px]">
              🔄 Buat Lagi
            </button>
          </div>

          {/* Actions */}
          <div className="grid gap-2.5 mb-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
            {[
              { icon: "📄", label: "Preview & Print PDF", action: handlePrint, primary: true },
              { icon: "🚀", label: "Upload ke Lynk.id", action: handleUploadLynk, primary: false },
              { icon: "📱", label: "Share ke WhatsApp", action: handleShareWhatsApp, primary: false },
              { icon: "📋", label: copied ? "✅ Tersalin!" : "Salin Konten", action: handleCopy, primary: false },
              { icon: "💾", label: "Download .txt", action: handleExportText, primary: false },
            ].map(btn => (
              <button
                key={btn.label}
                onClick={btn.action}
                disabled={false}
                className="btn-glow py-3 px-4 rounded-lg cursor-pointer text-[13px] font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: btn.primary ? "linear-gradient(135deg, hsl(var(--emerald)), hsl(var(--emerald-light)), hsl(var(--gold)))" : "hsl(var(--muted))",
                  border: btn.primary ? "none" : "1px solid hsl(var(--border))",
                  color: "hsl(var(--foreground))",
                  boxShadow: btn.primary ? "0 6px 25px hsl(var(--emerald) / 0.4)" : "none",
                }}
              >
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>

          {/* Content preview */}
          <div ref={contentRef} className="bg-foreground/[0.03] border border-foreground/[0.08] rounded-2xl overflow-hidden">
            <div className="bg-foreground/[0.03] border-b border-foreground/[0.06] px-5 py-3.5 flex items-center gap-2.5">
              <div className="flex gap-1.5">
                {["#ff5f57", "#febc2e", "#28c840"].map(c => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                ))}
              </div>
              <span className="text-foreground/30 text-xs">
                Preview Konten — {generatedContent.length.toLocaleString()} karakter
              </span>
            </div>
            <div className="p-7 max-h-[550px] overflow-auto font-body leading-relaxed">
              {generatedContent.split('\n').map((line, i) => {
                const text = cleanDisplayLine(line);
                if (line.startsWith('# ')) return <h1 key={i} className="font-display text-[22px] text-foreground mb-2 font-bold">{text}</h1>;
                if (line.startsWith('## ')) return <h2 key={i} className="font-display text-base text-primary mb-4 font-semibold">{text}</h2>;
                if (line.startsWith('### ')) return <h3 key={i} className="font-display text-[13px] text-emerald-light mt-5 mb-2 tracking-widest uppercase font-bold">{text}</h3>;
                if (line.startsWith('---')) return <hr key={i} className="border-foreground/[0.08] my-4" />;
                if (line.trim() === '') return <div key={i} className="h-2" />;
                return <p key={i} className="text-foreground/65 text-sm mb-1">{text}</p>;
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-8">
            <p className="text-foreground/25 text-xs mb-3">Buat produk berbeda? Kembali dan generate lagi!</p>
            <button
              onClick={() => setStep("select")}
              className="bg-transparent border border-primary/30 rounded-lg px-7 py-2.5 cursor-pointer text-primary text-[13px] transition-all hover:bg-primary/[0.08]"
            >
              ✨ Buat Produk Baru
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return null;
};

export default Index;
