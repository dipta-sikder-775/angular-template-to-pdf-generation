import { Component, ElementRef, ViewChild } from '@angular/core';
import { PdfExportService } from '../pdf-export.service';
const items: { description: string; price: number }[] = [
  { description: 'Item 1', price: 10 },
  { description: 'Item 2', price: 20 },
  { description: 'Item 3', price: 30 },
];

@Component({
  selector: 'app-invoice',
  standalone: true,
  template: `
    <button (click)="download()">Download PDF</button>

    <div #invoiceContent class="invoice-container">
      <h1>Invoice #12345</h1>
      <table class="table">
        @for (item of items; track $index) {
          <tr>
            <td>{{ item.description }}</td>
            <td>{{ item.price }}</td>
          </tr>
        }
      </table>
      <img
        src="https://images.unsplash.com/photo-1776088066852-33ac3d31dffd?q=80&w=1026&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        style="width: 100px;"
      />
    </div>
  `,
})
export class InvoiceComponent {
  @ViewChild('invoiceContent', { static: false }) invoiceElement!: ElementRef;
  items = items;

  constructor(private pdfService: PdfExportService) {}

  download() {
    this.pdfService.generateInvoice(
      this.invoiceElement.nativeElement,
      'MyInvoice.pdf',
    );
  }
}
