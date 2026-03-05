import { PRODUCT_TYPES } from "@/lib/constants";
import type { ProductTypeId } from "@/lib/constants";

interface PDFPreviewProps {
  content: string;
  productType: ProductTypeId;
  topic: string;
}

/** Strip markdown symbols: #, **, *, ---, etc. */
function cleanLine(line: string): string {
  // Remove heading markers
  let cleaned = line.replace(/^#{1,6}\s*/, '');
  // Remove bold markers
  cleaned = cleaned.replace(/\*\*/g, '');
  // Remove italic markers (single *)
  cleaned = cleaned.replace(/(?<!\*)\*(?!\*)/g, '');
  // Remove leading list markers like "1. " or "- "
  // Keep the text after
  cleaned = cleaned.replace(/^\d+\.\s+/, '');
  cleaned = cleaned.replace(/^[-•]\s+/, '');
  return cleaned;
}

function isHeading1(line: string) { return line.startsWith('# '); }
function isHeading2(line: string) { return line.startsWith('## '); }
function isHeading3(line: string) { return line.startsWith('### '); }
function isBold(line: string) { return line.startsWith('**') && line.endsWith('**'); }
function isHR(line: string) { return line.startsWith('---'); }

const PDFPreview = ({ content, productType, topic }: PDFPreviewProps) => {
  const type = PRODUCT_TYPES.find(p => p.id === productType);
  const lines = content.split('\n');

  const sections: string[][] = [];
  let current: string[] = [];
  for (const line of lines) {
    if ((isHeading1(line) || isHeading2(line) || isHeading3(line) || isHR(line)) && current.length > 0) {
      sections.push(current);
      current = [];
    }
    current.push(line);
  }
  if (current.length > 0) sections.push(current);

  const renderLine = (line: string, idx: number) => {
    const text = cleanLine(line);
    if (!text && !isHR(line)) return <div key={idx} style={{ height: 10 }} />;

    if (isHeading1(line)) return (
      <h1 key={idx} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 10, lineHeight: 1.4, color: "#1a3a2a" }}>
        {text}
      </h1>
    );
    if (isHeading2(line)) return (
      <h2 key={idx} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 16, fontWeight: 600, marginBottom: 14, color: "#2d5a3d" }}>
        {text}
      </h2>
    );
    if (isHeading3(line)) return (
      <h3 key={idx} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 13, fontWeight: 700, marginTop: 22, marginBottom: 10, letterSpacing: 2, paddingBottom: 5, color: "#1a3a2a", borderBottom: "1px solid #c9a84c", textTransform: "uppercase" as const }}>
        {text}
      </h3>
    );
    if (isBold(line)) return (
      <p key={idx} style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 13, margin: "6px 0", color: "#1a3a2a" }}>
        {text}
      </p>
    );
    if (isHR(line)) return (
      <hr key={idx} style={{ border: "none", borderTop: "1px solid #e8d5a0", margin: "18px 0" }} />
    );
    return (
      <p key={idx} style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11.5, lineHeight: 1.85, marginBottom: 6, color: "#2a3a30" }}>
        {text}
      </p>
    );
  };

  return (
    <div id="pdf-preview" style={{ maxWidth: 700, margin: "0 auto", background: "#fffdf5", borderRadius: 4, overflow: "hidden", boxShadow: "0 0 60px rgba(0,0,0,0.3)" }}>
      {/* Header */}
      <div data-pdf-section style={{ background: "linear-gradient(135deg, #0a2618 0%, #166534 50%, #0a2618 100%)", padding: "32px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>{type?.icon}</span>
            <div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", color: "#4ade80", fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, marginBottom: 2, fontWeight: 600 }}>
                {type?.sublabel} • Ramadhan 1447H
              </div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,255,255,0.4)", fontSize: 10 }}>
                RamadhanAI Studio
              </div>
            </div>
          </div>
          <div style={{ fontFamily: "'Noto Naskh Arabic', serif", color: "#4ade80", fontSize: 14 }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "40px 40px" }}>
        {sections.map((sectionLines, sIdx) => (
          <div key={sIdx} data-pdf-section>
            {sectionLines.map((line, lIdx) => renderLine(line, sIdx * 1000 + lIdx))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div data-pdf-section style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", background: "linear-gradient(135deg, #0a2618, #166534)" }}>
        <div>
          <div style={{ fontFamily: "'Montserrat', sans-serif", color: "#4ade80", fontSize: 12, fontWeight: 600 }}>RamadhanAI Studio</div>
        </div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", color: "rgba(255,255,255,0.2)", fontSize: 10, textAlign: "right" as const }}>
          © Ramadhan 1447H<br />
          {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;
