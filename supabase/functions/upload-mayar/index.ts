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

    // Create a text file blob from the content
    const fileName = `${topic.replace(/\s+/g, "-").toLowerCase()}-ramadhan.txt`;
    
    // Use Mayar API to create a digital product
    // First, create the product using multipart form data
    const formData = new FormData();
    formData.append("name", `${topic} — ${productLabel || "Produk Digital Islami"}`);
    formData.append("description", `Produk digital Islami bertema Ramadhan: ${topic}. Dibuat dengan RAIA.`);
    formData.append("amount", "0"); // Free by default, user can change on Mayar dashboard
    formData.append("paymentType", "free");
    
    // Upload the content as a file
    const fileBlob = new Blob([content], { type: "text/plain" });
    formData.append("file", fileBlob, fileName);

    const mayarBaseUrl = "https://api.mayar.id/hl/v1";

    const response = await fetch(`${mayarBaseUrl}/product/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MAYAR_API_KEY}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Mayar API error:", response.status, JSON.stringify(result));
      return new Response(
        JSON.stringify({ error: result?.messages || "Gagal membuat produk di Mayar." }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        link: result?.data?.link || null,
        productId: result?.data?.id || null,
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
