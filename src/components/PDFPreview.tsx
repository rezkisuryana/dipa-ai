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

  const renderLine = (line: string, idx: number) => {
    if (line.startsWith('# ')) return (
      <h1 key={idx} className="font-display text-[22px] mb-2 leading-tight" style={{ color: "#1a3a2a" }}>
        {line.replace('# ', '')}
      </h1>
    );
    if (line.startsWith('## ')) return (
      <h2 key={idx} className="font-body text-base mb-4 italic" style={{ color: "#2d5a3d" }}>
        {line.replace('## ', '')}
      </h2>
    );
    if (line.startsWith('### ')) return (
      <h3 key={idx} className="font-display text-[13px] mt-5 mb-2 tracking-widest pb-1" style={{ color: "#1a3a2a", borderBottom: "1px solid hsl(var(--gold))" }}>
        {line.replace('### ', '')}
      </h3>
    );
    if (line.startsWith('**') && line.endsWith('**')) return (
      <p key={idx} className="font-bold text-[13px] my-1" style={{ color: "#1a3a2a" }}>
        {line.replace(/\*\*/g, '')}
      </p>
    );
    if (line.startsWith('---')) return (
      <hr key={idx} className="my-4" style={{ border: "none", borderTop: "1px solid #e8d5a0" }} />
    );
    if (line.trim() === '') return <div key={idx} className="h-2" />;
    return (
      <p key={idx} className="font-body text-xs leading-relaxed mb-1" style={{ color: "#2a3a30" }}>
        {line}
      </p>
    );
  };

  return (
    <div id="pdf-preview" className="max-w-[700px] mx-auto rounded overflow-hidden" style={{ background: "#fffdf5", boxShadow: "0 0 60px rgba(0,0,0,0.3)" }}>
      {/* Header */}
      <div className="relative overflow-hidden px-10 py-8" style={{ background: "linear-gradient(135deg, hsl(var(--emerald-dark)) 0%, hsl(var(--emerald)) 50%, hsl(var(--emerald-dark)) 100%)" }}>
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[28px]">{type?.icon}</span>
            <div>
              <div className="text-primary text-[10px] tracking-[3px] uppercase mb-0.5">
                {type?.sublabel} • Ramadhan 1447H
              </div>
              <div className="text-foreground/40 text-[10px]">
                Dibuat dengan RamadhanAI Studio × Mayar.id
              </div>
            </div>
          </div>
          <div className="font-arabic text-primary text-sm">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-10">
        {lines.map((line, idx) => renderLine(line, idx))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-10 py-5" style={{ background: "linear-gradient(135deg, hsl(var(--emerald-dark)), hsl(var(--emerald)))" }}>
        <div>
          <div className="text-primary text-xs font-semibold">RamadhanAI Studio</div>
          <div className="text-foreground/30 text-[10px]">Powered by Mayar.id</div>
        </div>
        <div className="text-foreground/20 text-[10px] text-right">
          © Ramadhan 1447H<br />
          {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;
