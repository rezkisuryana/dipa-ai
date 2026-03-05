import { PRODUCT_TYPES } from "@/lib/constants";
import type { ProductTypeId } from "@/lib/constants";

interface PDFPreviewProps {
  content: string;
  productType: ProductTypeId;
  topic: string;
}

const PDFPreview = ({ content, productType, topic }: PDFPreviewProps) => {
  const type = PRODUCT_TYPES.find(p => p.id === productType);
  const lines = content.split('\n');

  // Group lines into logical sections (split on headings and hr)
  const sections: string[][] = [];
  let current: string[] = [];
  for (const line of lines) {
    if ((line.startsWith('# ') || line.startsWith('## ') || line.startsWith('### ') || line.startsWith('---')) && current.length > 0) {
      sections.push(current);
      current = [];
    }
    current.push(line);
  }
  if (current.length > 0) sections.push(current);

  const renderLine = (line: string, idx: number) => {
    if (line.startsWith('# ')) return (
      <h1 key={idx} style={{ fontFamily: "'Cinzel', serif", fontSize: 22, marginBottom: 8, lineHeight: 1.3, color: "#1a3a2a" }}>
        {line.replace('# ', '')}
      </h1>
    );
    if (line.startsWith('## ')) return (
      <h2 key={idx} style={{ fontFamily: "'Crimson Pro', serif", fontSize: 16, marginBottom: 16, fontStyle: "italic", color: "#2d5a3d" }}>
        {line.replace('## ', '')}
      </h2>
    );
    if (line.startsWith('### ')) return (
      <h3 key={idx} style={{ fontFamily: "'Cinzel', serif", fontSize: 13, marginTop: 20, marginBottom: 8, letterSpacing: 3, paddingBottom: 4, color: "#1a3a2a", borderBottom: "1px solid #c9a84c", textTransform: "uppercase" as const }}>
        {line.replace('### ', '')}
      </h3>
    );
    if (line.startsWith('**') && line.endsWith('**')) return (
      <p key={idx} style={{ fontWeight: "bold", fontSize: 13, margin: "4px 0", color: "#1a3a2a" }}>
        {line.replace(/\*\*/g, '')}
      </p>
    );
    if (line.startsWith('---')) return (
      <hr key={idx} style={{ border: "none", borderTop: "1px solid #e8d5a0", margin: "16px 0" }} />
    );
    if (line.trim() === '') return <div key={idx} style={{ height: 8 }} />;
    return (
      <p key={idx} style={{ fontFamily: "'Crimson Pro', serif", fontSize: 12, lineHeight: 1.7, marginBottom: 4, color: "#2a3a30" }}>
        {line}
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
              <div style={{ color: "#4ade80", fontSize: 10, letterSpacing: 3, textTransform: "uppercase" as const, marginBottom: 2 }}>
                {type?.sublabel} • Ramadhan 1447H
              </div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10 }}>
                Dibuat dengan RamadhanAI Studio × Mayar.id
              </div>
            </div>
          </div>
          <div style={{ fontFamily: "'Noto Naskh Arabic', serif", color: "#4ade80", fontSize: 14 }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </div>
        </div>
      </div>

      {/* Content - each section is a data-pdf-section */}
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
          <div style={{ color: "#4ade80", fontSize: 12, fontWeight: 600 }}>RamadhanAI Studio</div>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>Powered by Mayar.id</div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, textAlign: "right" as const }}>
          © Ramadhan 1447H<br />
          {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;
