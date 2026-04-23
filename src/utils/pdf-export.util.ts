declare global {
  interface Window {
    html2canvas: typeof import('html2canvas').default;
  }
}

export async function generateHtmlToPDF(
  element: HTMLElement,
  fileName: string = 'generated_portable_document_format.pdf',
): Promise<void> {
  const html2canvas = (await import('html2canvas')).default;
  const jsPDF = (await import('jspdf')).default;
  window.html2canvas = html2canvas;

  // PDF Configuration
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true,
    floatPrecision: 16, // High precision for text alignment,
    compress: true, // Enable compression for smaller file size
  });

  await doc.html(element, {
    callback: (pdf) => {
      pdf.save(fileName);
    },
    width: 210, // Target width to scale content
    windowWidth: element?.offsetWidth, // Use original element width for calculation
    autoPaging: 'text', // Smart paging to avoid clipping text lines
    html2canvas: {
      scale: 0.2645833333, // Convert px to mm (roughly)
      useCORS: true,
      logging: false,
      letterRendering: true,
      allowTaint: true,
    },
    margin: [10, 0, 10, 0],
    y: -7,
  });
}
