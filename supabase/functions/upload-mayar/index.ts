import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const MAYAR_API_KEY = Deno.env.get("MAYAR_API_KEY");
    if (!MAYAR_API_KEY) {
      return new Response(
        JSON.stringify({ error: "API key Mayar belum dikonfigurasi." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { topic, productType, content, productLabel } = await req.json();

    if (!topic || !content) {
      return new Response(
        JSON.stringify({ error: "Topic dan content wajib diisi." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const mayarBaseUrl = "https://api.mayar.id/hl/v1";

    // Step 1: Upload the file to Mayar
    const fileName = `${topic.replace(/\s+/g, "-").toLowerCase()}-ramadhan.txt`;
    const fileBlob = new Blob([content], { type: "text/plain" });

    const uploadForm = new FormData();
    uploadForm.append("file", fileBlob, fileName);

    const uploadRes = await fetch(`${mayarBaseUrl}/file`, {
      method: "POST",
      headers: { Authorization: `Bearer ${MAYAR_API_KEY}` },
      body: uploadForm,
    });

    const uploadJson = await uploadRes.json();
    if (!uploadRes.ok) {
      console.error("Mayar upload error:", uploadRes.status, JSON.stringify(uploadJson));
      return new Response(
        JSON.stringify({ error: uploadJson?.messages || "Gagal upload file ke Mayar." }),
        { status: uploadRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const fileId = uploadJson?.data?.id || uploadJson?.id;
    const fileUrl = uploadJson?.data?.url || uploadJson?.url;

    // Step 2: Create the digital product
    const productPayload = {
      name: `${topic} — ${productLabel || "Produk Digital Islami"}`,
      type: "digital_product",
      description: `Produk digital Islami bertema Ramadhan: ${topic}. Dibuat dengan RAIA.`,
      amount: 0,
      multipleFiles: fileId
        ? [{ id: fileId, url: fileUrl, name: fileName }]
        : undefined,
    };

    const createRes = await fetch(`${mayarBaseUrl}/product`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MAYAR_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productPayload),
    });

    const createJson = await createRes.json();
    if (!createRes.ok) {
      console.error("Mayar create product error:", createRes.status, JSON.stringify(createJson));
      return new Response(
        JSON.stringify({ error: createJson?.messages || "Gagal membuat produk di Mayar." }),
        { status: createRes.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        link: createJson?.data?.link || createJson?.link || null,
        productId: createJson?.data?.id || createJson?.id || null,
        message: "Produk berhasil dibuat di Mayar!",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("upload-mayar error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
