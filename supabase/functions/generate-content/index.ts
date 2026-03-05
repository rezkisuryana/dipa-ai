import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PRODUCT_PROMPTS: Record<string, string> = {
  ebook:
    "Buat e-book digital Islami bertema Ramadhan. Sertakan BAB-BAB yang terstruktur, pendahuluan, isi lengkap per bab, dalil Al-Quran dan Hadits yang relevan, serta penutup. Gunakan format markdown dengan heading (#, ##, ###).",
  checklist:
    "Buat checklist/tracker amalan harian 30 hari Ramadhan. Sertakan amalan wajib dan sunnah, target tilawah, sedekah, dan ibadah lainnya. Format sebagai daftar terstruktur dengan markdown.",
  planner:
    "Buat planner/jadwal Ramadhan yang detail. Sertakan jadwal sahur, iftar, sholat, tadarus, dan aktivitas produktif. Buat per minggu dengan tips dan motivasi. Format markdown.",
  resep:
    "Buat kumpulan resep masakan untuk sahur dan buka puasa Ramadhan. Sertakan bahan, langkah memasak, tips nutrisi, dan variasi menu. Format markdown yang rapi.",
  doa:
    "Buat panduan doa, dzikir, dan wirid untuk bulan Ramadhan. Sertakan teks Arab, transliterasi latin, terjemahan Indonesia, dan keutamaan setiap doa. Format markdown.",
  kelas:
    "Buat outline dan materi mini e-course/kelas online bertema Ramadhan. Sertakan modul-modul, learning objectives, materi per sesi, dan tugas/refleksi. Format markdown.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, productType, audience, lang } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const productPrompt = PRODUCT_PROMPTS[productType] || PRODUCT_PROMPTS.ebook;
    const langInstruction =
      lang === "bilingual"
        ? "Tulis dalam bahasa Indonesia dengan menyertakan teks Arab untuk doa/ayat beserta transliterasi latin."
        : "Tulis sepenuhnya dalam bahasa Indonesia.";
    const audienceInstruction = audience
      ? `Target pembaca: ${audience}.`
      : "";

    const systemPrompt = `Kamu adalah penulis konten Islami profesional yang ahli dalam tema Ramadhan. 
Tugas kamu: ${productPrompt}

Aturan penting:
- ${langInstruction}
- ${audienceInstruction}
- Gunakan format Markdown: # untuk judul utama, ## untuk sub-judul, ### untuk bagian, --- untuk pemisah.
- Konten harus berkualitas tinggi, informatif, dan siap dijual sebagai produk digital.
- Sertakan dalil dari Al-Quran dan Hadits yang relevan.
- Minimal 1500 kata, konten harus substansial dan bernilai.
- Akhiri dengan penutup yang inspiratif dan doa.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Buat produk digital dengan topik: "${topic}"`,
            },
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Terlalu banyak permintaan, coba lagi nanti." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Kredit AI habis, silakan tambah kredit." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "Gagal menghubungi AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("generate-content error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
