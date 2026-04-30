import { Component, ViewChild } from '@angular/core';
import generateHtmlToPDF, {
  generatePDFFooter,
} from '../utils/generate-html-to-pdf';
import { InvoiceCreateOrderV2PDF } from './experimental-pages/invoice-create-order-v2-pdf';
import { InvoiceCreateOrderPDFComponent } from './pages/invoice-create-order-pdf/invoice-create-order-pdf.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InvoiceCreateOrderPDFComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(InvoiceCreateOrderV2PDF, { static: false })
  invoiceComponent?: InvoiceCreateOrderV2PDF;
  isLoading = false;

  async download() {
    this.isLoading = true;
    try {
      const invoiceElement = this.invoiceComponent?.docRootNativeElement;

      if (!invoiceElement) {
        throw new Error('Invoice element is not available for PDF export.');
      }

      await generateHtmlToPDF({
        src: invoiceElement,
        fileName: 'MyInvoice.pdf',
        configureHtmlOption: {
          // y: -20,
          callback: (pdf) => {
            generatePDFFooter(pdf, [
              {
                text: 'All items are revertible until full paid',
                align: 'left',
                showOn: 'last',
                fontSize: 8,
                fontStyle: 'italic',
                colorRGB: { r: 153, g: 153, b: 153 },
              },
              {
                text: (currentPage, totalPages) =>
                  `Page ${currentPage} of ${totalPages}`,
                align: 'right',
                showOn: 'all',
                fontSize: 7,
                colorRGB: { r: 51, g: 51, b: 51 },
              },
            ]);

            pdf.save('MyInvoice.pdf');
          },
        },
      });
    } finally {
      this.isLoading = false;
    }
  }
}
