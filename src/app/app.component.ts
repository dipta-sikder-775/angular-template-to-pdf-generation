import { Component, ViewChild } from '@angular/core';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InvoiceCreateOrderV2PDF } from './experimental-pages/invoice-create-order-v2-pdf';
import generateHtmlToPDF, { generatePDFFooter } from '../utils/generate-html-to-pdf';
import { TransactionInvoiceCreateOrderPDF } from "./components/transection-invoice-create-order-pdf/transaction-invoice-create-order-pdf.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InvoiceComponent, InvoiceCreateOrderV2PDF, TransactionInvoiceCreateOrderPDF],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(InvoiceCreateOrderV2PDF, { static: false })
  invoiceComponent?: InvoiceCreateOrderV2PDF;
  isLoading = false;

  // constructor(private pdfService: PdfExportService) {}

  async download() {
    this.isLoading = true;
    try {
      const invoiceElement = this.invoiceComponent?.invoiceElement;

      if (!invoiceElement) {
        throw new Error('Invoice element is not available for PDF export.');
      }

      await generateHtmlToPDF({
        src: invoiceElement,
        fileName: 'MyInvoice.pdf',
        configureHtmlOption: {
          y: -20,
          callback: (pdf) => {
            generatePDFFooter(pdf, [
              {
                text: 'All items are revertible until full paid',
                align: 'left',
                showOn: 'last',
                fontSize: 8,
                fontStyle: 'italic',
                colorRGB: [153, 153, 153],
              },
              {
                text: (currentPage, totalPages) =>
                  `Page ${currentPage} of ${totalPages}`,
                align: 'right',
                showOn: 'all',
                fontSize: 7,
                colorRGB: [51, 51, 51],
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
