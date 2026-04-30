import { Component, ElementRef, ViewChild } from '@angular/core';
import { InvoiceAddressColumnComponent } from '../../components/sales-invoice-pdf-related-components/invoice-address-column/invoice-address-column.component';
import { InvoiceBarcodeComponent } from '../../components/sales-invoice-pdf-related-components/invoice-barcode/invoice-barcode.component';
import { InvoiceBusinessLogoComponent } from '../../components/sales-invoice-pdf-related-components/invoice-business-logo/invoice-business-logo.component';
import { InvoiceOrderDetailsComponent } from '../../components/sales-invoice-pdf-related-components/invoice-order-details/invoice-order-details.component';
import { InvoiceQrCodeComponent } from '../../components/sales-invoice-pdf-related-components/invoice-qr-code/invoice-qr-code.component';
import { InvoiceSummaryComponent } from '../../components/sales-invoice-pdf-related-components/invoice-summary/invoice-summary.component';
import { TransactionInvoiceCreateOrderPdfData } from './invoice-create-order-pdf.model';
import { InvoiceInstalmentBreakdownComponent } from './invoice-instalment-breakdown/invoice-instalment-breakdown.component';
import { InvoiceItemsTableComponent } from './invoice-items-table/invoice-items-table.component';
import { InvoicePaymentDetailsComponent } from './invoice-payment-details/invoice-payment-details.component';
import { InvoiceTaxAndTotalsComponent } from './invoice-tax-and-totals/invoice-tax-and-totals.component';

@Component({
  selector: 'invoice-create-order-pdf',
  standalone: true,
  imports: [
    InvoiceSummaryComponent,
    InvoiceQrCodeComponent,
    InvoiceBarcodeComponent,
    InvoiceBusinessLogoComponent,
    InvoiceAddressColumnComponent,
    InvoiceOrderDetailsComponent,
    InvoiceItemsTableComponent,
    InvoiceTaxAndTotalsComponent,
    InvoiceInstalmentBreakdownComponent,
    InvoicePaymentDetailsComponent,
  ],
  templateUrl: './invoice-create-order-pdf.component.html',
})
export class InvoiceCreateOrderPDFComponent {
  @ViewChild('docRoot', { static: false })
  private docRootRef?: ElementRef<HTMLElement>;

  get docRootNativeElement(): HTMLElement | undefined {
    return this.docRootRef?.nativeElement;
  }

  // isLoading = false;

  // // constructor(private pdfService: PdfExportService) {}

  // async download() {
  //   try {
  //     this.isLoading = true;
  //     await generateHtmlToPDF({
  //       src: this.invoiceElement.nativeElement,
  //       fileName: 'MyInvoice.pdf',
  //       configureHtmlOption: {
  //         // y: -20,
  //         callback: (pdf) => {
  //           generatePDFFooter(pdf, [
  //             {
  //               text: 'All items are revertible until full paid',
  //               align: 'left',
  //               showOn: 'last',
  //               fontSize: 8,
  //               fontStyle: 'italic',
  //               colorRGB: { r: 153, g: 153, b: 153 },
  //             },
  //             {
  //               text: (currentPage, totalPages) =>
  //                 `Page ${currentPage} of ${totalPages}`,
  //               align: 'right',
  //               showOn: 'all',
  //               fontSize: 7,
  //               colorRGB: { r: 51, g: 51, b: 51 },
  //             },
  //           ]);

  //           pdf.save('MyInvoice.pdf');
  //         },
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Error generating PDF:', error);
  //   } finally {
  //     this.isLoading = false;
  //   }
  // }

  invoiceData: TransactionInvoiceCreateOrderPdfData = {
    // row 1: Invoice basic info start
    //  1-1. Invoice Summary
    invoiceSummaryData: {
      title: 'Invoice',
      data: [
        {
          label: 'INV No',
          value: 'INV-00001026733-9336-881',
        },
        {
          label: 'VAT Number',
          value: '2313131',
        },
        {
          label: 'Issue Date',
          value: '03-04-2026',
        },
        {
          label: 'Delivery Date',
          value: '09-04-2026',
        },
        {
          label: 'Vat Number',
          value: '2313131',
        },
      ],
    },
    // 1-2. Invoice qr code
    qrCodeUrl:
      'https://images.unsplash.com/photo-1776088066852-33ac3d31dffd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8',
    // 1-3. Invoice barcode
    barcodeUrl:
      'https://images.unsplash.com/photo-1776088066852-33ac3d31dffd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8',
    // 1-4. Business Logo
    businessLogoData: { businessName: 'business', businessId: 10 },
    // row 1: Invoice basic info end

    /* ----------------------------------------------------- */

    // 2-1. supplier details
    supplier: {
      name: 'VALT TECH LIMITED',
      address: [
        'Lakeview House, Lakeview Park, Bond Avenue',
        'Buckinghamshire',
        'Milton Keynes',
        'MK11FE',
      ],
    },
    // 2-2. bill to details
    billTo: {
      name: 'YO LTD',
      address: [
        'Chowdhury Abd',
        'Ground Floor Flat, 23 Francis Street, S',
        'London',
        'manchester',
        'United Kingdom',
      ],
    },
    // 2-3. delivery to details
    deliverTo: {
      name: 'ABD LTD',
      address: [
        'Chowdhury Mia',
        'Ground Floor Flat, 23 Francis Street, S',
        'London',
        'manchester',
        'United Kingdom',
      ],
    },

    /* ----------------------------------------------------- */

    // 3-1 order details
    orderDetails: [
      {
        label: 'Order Type',
        value: 'Delivery',
        size: 'medium',
      },
      {
        label: 'Due',
        value: '£48.00',
        size: 'large',
      },
    ],

    // 4-1 items breakdown
    stockType: 'kiosk',
    items: [
      { type: 'label', label: 'Items' },
      {
        type: 'data',
        img: 'https://images.unsplash.com/photo-1776088066852-33ac3d31dffd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8',
        description: 'k small (1 pack X 20 unit) (case)',
        sku: '000109343968305',
        quantity: 4,
        unitPrice: '10.00',
        vat: '20%',
        amount: '40.00',
      },
      {
        type: 'data',
        img: 'https://images.unsplash.com/photo-1776088066852-33ac3d31dffd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8',
        description: 'k small (1 pack X 20 unit) (case)',
        sku: '000109343968305',
        quantity: 4,
        unitPrice: '10.00',
        vat: '20%',
        amount: '40.00',
      },
      {
        type: 'data',
        description: 'k small (1 pack X 20 unit) (case)',
        sku: '000109343968305',
        quantity: 4,
        unitPrice: '10.00',
        vat: '20%',
        amount: '40.00',
      },
    ],

    // 5-1 tax details
    taxDetails: [
      {
        rate: 'T1(20%)',
        goods: '40.00',
        vatAmount: '8.00',
        net: '40.00',
        total: '48.00',
      },
      {
        rate: 'T1(20%)',
        goods: '40.00',
        vatAmount: '8.00',
        net: '40.00',
        total: '48.00',
      },
      {
        rate: 'T1(20%)',
        goods: '40.00',
        vatAmount: '8.00',
        net: '40.00',
        total: '48.00',
      },
      {
        rate: 'T1(20%)',
        goods: '40.00',
        vatAmount: '8.00',
        net: '40.00',
        total: '48.00',
      },
    ],

    // 5-2 tax summary
    priceTaxSummary: [
      {
        // subtotal: '40.00',
        // totalVat: '8.00',
        // totalAmount: '48.00',
        label: 'Subtotal',
        value: '£40.00',
      },
      {
        label: 'Total Vat (Excl)',
        value: '£8.00',
      },
      {
        label: 'Total Paid',
        value: '£8.00',
      },
      {
        label: 'Total Amount',
        value: '£48.00',
      },
    ],

    // 6-1 instalment breakdown
    installments: [
      { date: '10-04-2026', due: '33.60', status: 'Pending' },
      { date: '17-04-2026', due: '43.20', status: 'Pending' },
      { date: '24-04-2026', due: '43.20', status: 'Pending' },
      { date: '01-05-2026', due: '43.20', status: 'Pending' },
      { date: '08-05-2026', due: '43.20', status: 'Pending' },
      { date: '15-05-2026', due: '43.20', status: 'Pending' },
      { date: '22-05-2026', due: '43.20', status: 'Pending' },
      { date: '29-05-2026', due: '43.20', status: 'Pending' },
    ],

    bank: {
      accountName: 'Yotech',
      accountNo: '15',
      sortCode: '12-21-22',
      bic: 'BKENGB2LXXX',
      intermediaryBic: 'BKENGB2LXXXfd',
      iban: 'London Bank',
    },
    footerNote: 'All items are revertible untill full paid',
  };
}
