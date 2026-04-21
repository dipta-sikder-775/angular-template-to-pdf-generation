import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfExportService {
  /**
   * Generates a PDF from an Angular ViewChild reference
   * @param element The ElementRef from the component
   * @param fileName Name of the output file
   */
  public async generateInvoice(
    element: HTMLElement,
    fileName: string = 'invoice.pdf',
  ): Promise<void> {
    // 1. Setup PDF Configuration
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
      putOnlyUsedFonts: true,
      floatPrecision: 16, // High precision for text alignment,
      compress: true, // Enable compression for smaller file size
    });

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();
    const margin = 0; // 10mm margin
    const contentWidth = pdfWidth - margin * 2;

    // 2. Use jsPDF's html method
    // This method is superior for searchable text compared to canvas-only approaches
    await doc.html(element, {
      callback: (pdf) => {
        pdf.save(fileName);
      },
      width: 210, // Target width to scale content
      windowWidth: element?.offsetWidth, // Use original element width for calculation
      autoPaging: 'text', // Smart paging to avoid clipping text lines
      html2canvas: {
        scale: 0.2645, // Convert px to mm (roughly)
        useCORS: true,
        logging: false,
        letterRendering: true,
        allowTaint: true,
      },
      margin: [10, 0, 10, 0],
      y: -7
    });
  }
}
