import { Component, ElementRef, ViewChild } from '@angular/core';
import generateHtmlToPDF, {
  generatePDFFooter,
} from '../../../utils/generate-html-to-pdf';
import { DynamicCustomTableComponent } from '../../dynamic-custom-table/dynamic-custom-table.component';
import { TransactionInvoiceCreateOrderPdfData } from './transaction-invoice-create-order-pdf.model';
import { TransactionPDFInvoiceAddressColumn } from './transaction-pdf-invoice-address-column/transaction-pdf-invoice-address-column.component';
import { TransactionPDFInvoiceBarcode } from './transaction-pdf-invoice-barcode/transaction-pdf-invoice-barcode.component';
import { TransactionPDFInvoiceBusinessLogo } from './transaction-pdf-invoice-business-logo/transaction-pdf-invoice-business-logo.component';
import { TransactionPDFInvoiceInstalmentBreakdown } from './transaction-pdf-invoice-instalment-breakdown/transaction-pdf-invoice-instalment-breakdown.component';
import { TransactionPDFInvoiceItemsTable } from './transaction-pdf-invoice-items-table/transaction-pdf-invoice-items-table.component';
import { TransactionPDFInvoiceOrderTypeAmount } from './transaction-pdf-invoice-order-details/transaction-pdf-invoice-order-details.component';
import { TransactionPDFInvoicePaymentDetails } from './transaction-pdf-invoice-payment-details/transaction-pdf-invoice-payment-details.component';
import { TransactionPDFInvoiceQrCode } from './transaction-pdf-invoice-qr-code/transaction-pdf-invoice-qr-code.component';
import { TransactionPDFInvoiceSummary } from './transaction-pdf-invoice-summary/transaction-pdf-invoice-summary.component';
import { TransactionPDFInvoiceTaxAndTotals } from './transaction-pdf-invoice-tax-and-totals/transaction-pdf-invoice-tax-and-totals.component';

@Component({
  selector: 'transaction-invoice-create-order-pdf',
  standalone: true,
  imports: [
    TransactionPDFInvoiceSummary,
    TransactionPDFInvoiceQrCode,
    TransactionPDFInvoiceBarcode,
    TransactionPDFInvoiceBusinessLogo,
    TransactionPDFInvoiceAddressColumn,
    TransactionPDFInvoiceOrderTypeAmount,
    TransactionPDFInvoiceItemsTable,
    TransactionPDFInvoiceTaxAndTotals,
    TransactionPDFInvoiceInstalmentBreakdown,
    TransactionPDFInvoicePaymentDetails,
    DynamicCustomTableComponent,
  ],
  templateUrl: './transaction-invoice-create-order-pdf.component.html',
})
export class TransactionInvoiceCreateOrderPDF {
  @ViewChild('transactionPDFInvoiceContainer', { static: false })
  invoiceElement!: ElementRef;
  isLoading = false;

  // constructor(private pdfService: PdfExportService) {}

  async download() {
    try {
      this.isLoading = true;
      await generateHtmlToPDF({
        src: this.invoiceElement.nativeElement,
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
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      this.isLoading = false;
    }
  }

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

    // accountNo: '56766666520',

    stockType: 'kiosk',

    items: [
      {
        img: 'https://images.unsplash.com/photo-1776088066852-33ac3d31dffd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8',
        description: 'k small (1 pack X 20 unit) (case)',
        sku: '000109343968305',
        quantity: 4,
        unitPrice: '10.00',
        vat: '20%',
        amount: '40.00',
      },
      {
        img: 'https://images.unsplash.com/photo-1776088066852-33ac3d31dffd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8',
        description: 'k small (1 pack X 20 unit) (case)',
        sku: '000109343968305',
        quantity: 4,
        unitPrice: '10.00',
        vat: '20%',
        amount: '40.00',
      },
      {
        description: 'k small (1 pack X 20 unit) (case)',
        sku: '000109343968305',
        quantity: 4,
        unitPrice: '10.00',
        vat: '20%',
        amount: '40.00',
      },
    ],
    taxSummary: [
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
    subtotal: '40.00',
    totalVat: '8.00',
    totalAmount: '48.00',
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
