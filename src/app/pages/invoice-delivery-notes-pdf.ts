import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { InvoiceAddressColumnComponent } from '../components/sales-invoice-pdf-related-components/invoice-address-column/invoice-address-column.component';
import { InvoiceBarcodeComponent } from '../components/sales-invoice-pdf-related-components/invoice-barcode/invoice-barcode.component';
import { InvoiceBusinessLogoComponent } from '../components/sales-invoice-pdf-related-components/invoice-business-logo/invoice-business-logo.component';
import { InvoiceItemQtyCheckTableComponent } from '../components/sales-invoice-pdf-related-components/invoice-item-qty-check-table';
import { InvoiceOrderDetailsComponent } from '../components/sales-invoice-pdf-related-components/invoice-order-details/invoice-order-details.component';
import { InvoiceQrCodeComponent } from '../components/sales-invoice-pdf-related-components/invoice-qr-code/invoice-qr-code.component';
import { InvoiceSummaryComponent } from '../components/sales-invoice-pdf-related-components/invoice-summary/invoice-summary.component';

@Component({
  selector: 'app-invoice-delivery-notes-pdf',
  standalone: true,
  imports: [
    CommonModule,
    InvoiceSummaryComponent,
    InvoiceQrCodeComponent,
    InvoiceBarcodeComponent,
    InvoiceBusinessLogoComponent,
    InvoiceAddressColumnComponent,
    InvoiceOrderDetailsComponent,
    InvoiceItemQtyCheckTableComponent,
  ],
  template: `
    <div
      #docRoot
      style="width: 210mm; min-height: 100mm; padding: 40px; margin: 20px auto; background: white; font-size: 11px; color: #333; box-sizing: border-box; line-height: 1.4; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"
    >
      <!-- HEADER ROW: Invoice title/details | QR | Barcode | Logo -->
      <table
        style="width: 100%; border-collapse: collapse; margin-bottom: 15px; table-layout: fixed;"
      >
        <tr>
          <invoice-summary
            [invoiceSummaryData]="invoiceData.invoiceSummaryData"
          />

          <invoice-qr-code [qrCodeUrl]="invoiceData.qrCodeUrl" />

          <invoice-barcode [barcodeUrl]="invoiceData.barcodeUrl" />

          <invoice-business-logo
            [businessLogoData]="invoiceData.businessLogoData"
          />
        </tr>
      </table>

      <!-- SUPPLIER / BILL TO / DELIVER TO -->
      <table
        style="width: 100%; border-collapse: collapse; margin-bottom: 20px; table-layout: fixed;"
      >
        <tr>
          <invoice-address-column
            [title]="invoiceData.supplier.name"
            [description]="invoiceData.supplier.address"
            [isFirstItem]="true"
            [isLastItem]="false"
            width="34%"
          />

          <invoice-address-column
            title="Deliver To"
            [name]="invoiceData.deliverTo.name"
            [description]="invoiceData.deliverTo.address"
            [isFirstItem]="false"
            [isLastItem]="true"
            width="35%"
          />
        </tr>
      </table>

      <!-- ORDER TYPE & AMOUNT DUE -->
      <invoice-order-details [orderDetails]="invoiceData.orderDetails" />

      <invoice-item-qty-check-table [data]="invoiceData.items" />

      <div style="font-size: 11px; color: #999; margin-top: 50px;">
        {{ invoiceData.footerNote }}
      </div>
    </div>
  `,
})
export class InvoiceDeliveryNotesPDFComponent {
  @ViewChild('docRoot', { static: false })
  private docRootRef?: ElementRef<HTMLElement>;

  get docRootNativeElement(): HTMLElement | undefined {
    return this.docRootRef?.nativeElement;
  }

  invoiceData = {
    invoiceSummaryData: {
      title: 'Invoice - Delivery Note',
      data: [
        { label: 'INV No:', value: 'INV-00086525316-7172-034' },
        { label: 'Issue Date', value: '14-10-2025' },
        { label: 'Issue Date', value: '14-10-2025' },
      ],
    },

    qrCodeUrl:
      'https://images.unsplash.com/photo-1776088066852-33ac3d31dffd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8',
    barcodeUrl:
      'https://images.unsplash.com/photo-1776088066852-33ac3d31dffd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8',

    businessLogoData: {
      businessName: 'business',
      businessId: 10,
    },

    orderDetails: [
      {
        label: 'Order Type',
        value: 'Delivery',
        size: 'medium',
      },
      {
        label: 'Amounts are',
        value: 'Tax Exclusive',
        size: 'small',
      },
      {
        label: '£5.99',
        value: 'Due',
        size: 'large',
      },
    ],

    supplier: {
      name: 'YO SUPPLIER 2',
      address: [
        'E-Spoll, Francis Street',
        'IsleofLewis',
        'London Road',
        'e412ef',
        'United Kingdom',
      ],
    },
    deliverTo: {
      name: 'TASTE OF SUBCONTINENT',
      address: [
        'Mr Hales',
        '25 Francis Street',
        'IsleOfLewis',
        'Stornoway',
        'HS1 2NF',
        'United Kingdom',
      ],
    },

    items: [
      {
        img: 'https://cdn.yoicons.com/81t7ME5NU5kt88/business/1101/images/6803e98ae8366.jpeg',
        description: 'American honey (1 box X 15 bottle) (case)',
        quantity: 1,
      },
      {
        img: 'https://cdn.yoicons.com/81t7ME5NU5kt88/business/1101/images/6803e98ae8366.jpeg',
        description: 'American honey (1 box X 15 bottle) (case)',
        quantity: 1,
      },
      {
        img: 'https://cdn.yoicons.com/81t7ME5NU5kt88/business/1101/images/6803e98ae8366.jpeg',
        description: 'American honey (1 box X 15 bottle) (case)',
        quantity: 1,
      },
      {
        img: 'https://cdn.yoicons.com/81t7ME5NU5kt88/business/1101/images/6803e98ae8366.jpeg',
        description: 'American honey (1 box X 15 bottle) (case)',
        quantity: 1,
      },
    ],

    footerNote:
      'Company Registration No: 56766666520. Registered Office: London Road, IsleofLewis, United Kingdom',
  };
}
