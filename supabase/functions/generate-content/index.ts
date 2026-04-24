import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PRODUCT_PROMPTS: Record<string, string> = {
  ebook:
    "Buat e-book digital profesional yang siap dijual. Sertakan daftar isi, pendahuluan, BAB-BAB terstruktur dengan sub-bagian, contoh nyata/case study, actionable tips di setiap bab, dan penutup yang inspiratif. Gunakan format markdown (#, ##, ###).",
  checklist:
    "Buat checklist actionable yang detail dan siap pakai. Bagi menjadi beberapa kategori/fase logis, sertakan deskripsi singkat untuk setiap item, prioritas, dan tips praktis. Format markdown dengan checkbox-style list.",
  planner:
    "Buat planner/perencana yang detail dan terstruktur (mingguan atau bulanan). Sertakan goal-setting framework, breakdown harian, target measurable, ruang refleksi, dan tips konsistensi. Format markdown rapi.",
  template:
    "Buat kumpulan template siap pakai yang berkualitas. Sertakan minimal 5-10 variasi template dengan placeholder yang jelas, instruksi penggunaan, contoh hasil akhir, dan best practices. Format markdown.",
  guide:
    "Buat panduan step-by-step yang lengkap dan mudah diikuti. Mulai dari basics hingga advanced, sertakan contoh nyata, common mistakes to avoid, troubleshooting tips, dan resource tambahan. Format markdown.",
  course:
    "Buat outline dan materi mini course/kelas online yang profesional. Sertakan learning objectives, modul-modul terstruktur, materi inti per sesi, latihan/tugas praktis, dan rubrik refleksi. Format markdown.",
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
      lang === "en"
        ? "Write the content fully in clear, professional English."
        : "Tulis konten sepenuhnya dalam bahasa Indonesia yang jelas dan profesional.";
    const audienceInstruction = audience
      ? `Target pembaca / audiens: ${audience}.`
      : "";

    const systemPrompt = `Kamu adalah copywriter & content strategist profesional yang ahli membuat produk digital siap jual (e-book, planner, template, course, dll).
Tugasmu: ${productPrompt}

Aturan penting:
- ${langInstruction}
- ${audienceInstruction}
- Gunakan format Markdown: # untuk judul utama, ## untuk sub-judul, ### untuk bagian, --- untuk pemisah.
- Konten harus berkualitas tinggi, actionable, dan benar-benar bernilai sebagai produk digital berbayar.
- Sertakan contoh nyata, framework, atau tips praktis yang langsung bisa diterapkan.
- Minimal 1500 kata, konten harus substansial.
- Akhiri dengan ringkasan dan call-to-action yang memotivasi.`;

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
