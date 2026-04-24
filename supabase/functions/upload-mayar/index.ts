import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MAYAR_API_KEY = Deno.env.get("MAYAR_API_KEY");
    if (!MAYAR_API_KEY) {
      return json({ success: false, error: "API key Mayar belum dikonfigurasi." });
    }

    const { topic, content, productLabel } = await req.json();
    const safeTopic = typeof topic === "string" ? topic.trim() : "";
    const safeContent = typeof content === "string" ? content.trim() : "";
    const safeLabel = typeof productLabel === "string" && productLabel.trim()
      ? productLabel.trim()
      : "Produk Digital Islami";

    if (!safeTopic || !safeContent) {
      return json({ success: false, error: "Topic dan content wajib diisi." });
    }

    console.warn(
      "upload-mayar disabled: documented Mayar API does not expose create-product or file-upload endpoints for this flow",
      JSON.stringify({ topic: safeTopic, productLabel: safeLabel })
    );

    return json({
      success: false,
      error:
        "Integrasi otomatis ke Mayar dinonaktifkan karena endpoint yang dipakai sebelumnya (`POST /file` dan `POST /product`) tidak tersedia di API Mayar dan selalu mengembalikan 404.",
      details:
        "Dokumentasi publik Mayar saat ini hanya menampilkan endpoint produk untuk baca data, serta endpoint pembayaran/invoice untuk checkout.",
      nextStep:
        "Gunakan pembuatan produk manual di dashboard Mayar, atau ganti ke alur pembayaran lain yang punya endpoint create resmi.",
    });
  } catch (e) {
    console.error("upload-mayar error:", e);
    return json(
      { success: false, error: e instanceof Error ? e.message : "Unknown error" },
      500,
    );
  }
});
