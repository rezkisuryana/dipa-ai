import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export async function exportPDF(filename: string) {
  const contentElement = document.getElementById("pdf-preview");
  if (!contentElement) throw new Error("PDF preview not found");

  const A4_WIDTH_MM = 210;
  const A4_HEIGHT_MM = 297;
  const MARGIN_MM = 10;
  const CONTENT_WIDTH_MM = A4_WIDTH_MM - MARGIN_MM * 2;
  const SECTION_GAP_MM = 2;

  const sections = Array.from(
    contentElement.querySelectorAll("[data-pdf-section]")
  ) as HTMLElement[];

  if (sections.length === 0) {
    // Fallback: render entire element
    sections.push(contentElement);
  }

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  let currentY = MARGIN_MM;

  for (const section of sections) {
    const canvas = await html2canvas(section, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });

    const scaleFactor = CONTENT_WIDTH_MM / (canvas.width / 2);
    const heightMM = (canvas.height / 2) * scaleFactor;
    const remaining = A4_HEIGHT_MM - MARGIN_MM - currentY;

    if (heightMM > remaining && currentY > MARGIN_MM) {
      pdf.addPage();
      currentY = MARGIN_MM;
    }

    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", MARGIN_MM, currentY, CONTENT_WIDTH_MM, heightMM);
    currentY += heightMM + SECTION_GAP_MM;
  }

  pdf.save(filename);
}
