import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-invoice-supplier-notes-pdf',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #docRoot
      style="width: 210mm; min-height: 100mm; padding: 40px; margin: 20px auto; background: white; font-size: 11px; color: #333; box-sizing: border-box; line-height: 1.4; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"
    >
      <table
        style="width: 100%; border-collapse: collapse; margin-bottom: 15px; table-layout: fixed;"
      >
        <tr>
          <td style="vertical-align: top; width: 45%;">
            <h1
              style="font-size: 20px; margin: 0 0 10px 0; color: #000; font-weight: 700;"
            >
              Invoice - Supplier Note
            </h1>
            <p style="margin: 2px 0; font-size: 12px; display:flex; gap:10px;">
              <strong style="width:80px">INV No:</strong>
              <span style="color: #333;">{{ invoiceData.invNo }}</span>
            </p>
            <p style="margin: 2px 0; font-size: 12px; display:flex; gap:10px;">
              <strong style=" width:80px"> Issue Date</strong>
              {{ invoiceData.issueDate }}
            </p>
            <p style="margin: 2px 0; font-size: 12px; display:flex; gap:10px;">
              <strong style="width:80px">Delivery Date</strong>
              {{ invoiceData.deliveryDate }}
            </p>
          </td>

          <td style="vertical-align: top; width: 20%;">
            <img
              [src]="invoiceData.qrCodeUrl"
              alt="QR"
              style="width: 70px; height: 70px;"
            />
          </td>

          <td style="vertical-align: top; width: 25%;">
            <img
              [src]="invoiceData.barcodeUrl"
              alt="Barcode"
              style="width: 140px; height: 35px;  "
            />
          </td>

          <td style="vertical-align: top; width: 10%; text-align: right;">
            <img
              src="https://cdn.yoicons.com/8832SVdev/business/10/images/icon/10.png?t=1775659733109"
              alt="VALT Logo"
              style="width: 80px;"
            />
          </td>
        </tr>
      </table>

      <!-- SUPPLIER / BILL TO / DELIVER TO -->
      <table
        style="width: 100%; border-collapse: collapse; margin-bottom: 20px; table-layout: fixed;"
      >
        <tr>
          <td style="vertical-align: top; width: 34%; padding-right:20px">
            <p style="margin: 0 0 4px 0; font-size: 13px;">
              <strong>{{ invoiceData.supplier.name }}</strong>
            </p>
            <p
              *ngFor="let line of invoiceData.supplier.address"
              style="margin: 0; color: #555; font-size: 13px;"
            >
              {{ line }}
            </p>
          </td>
          <td style="vertical-align: top; width: 33%;padding-right:20px">
            <p style="margin: 0 0 4px 0; font-size: 13px;">
              <strong>Bill To</strong>
            </p>
            <p style="margin: 0; font-weight: 600; font-size: 13px;">
              {{ invoiceData.billTo.name }}
            </p>
            <p
              *ngFor="let line of invoiceData.billTo.address"
              style="margin: 0; color: #555; font-size: 13px;"
            >
              {{ line }}
            </p>
          </td>
          <td style="vertical-align: top; width: 33%;">
            <p style="margin: 0 0 4px 0; font-size: 13px;">
              <strong>Deliver To</strong>
            </p>
            <p style="margin: 0; font-weight: 600; font-size: 13px;">
              {{ invoiceData.deliverTo.name }}
            </p>
            <p
              *ngFor="let line of invoiceData.deliverTo.address"
              style="margin: 0; color: #555; font-size: 13px;"
            >
              {{ line }}
            </p>
          </td>
        </tr>
      </table>

      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 1px solid #ddd; text-align: left; ">
            <th style="padding: 10px 5px; font-weight: 700; font-size: 12px;">
              Description
            </th>
            <th
              style="padding: 10px 5px; text-align: center; width: 80px; font-weight: 700; font-size: 12px;"
            >
              Quantity
            </th>
            <th
              style="padding: 10px 5px; text-align: center; width: 80px; font-weight: 700; font-size: 12px;"
            >
              Check
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3" style="padding: 10px 5px 5px 5px;">
              <strong style=" font-size: 12px;"> Groceries :</strong>
            </td>
          </tr>
          <tr
            *ngFor="let item of invoiceData.items"
            style="border-bottom: 1px solid #f9f9f9;"
          >
            <td style="padding: 12px 5px; font-size: 13px;">
              <div
                style="font-size: 13px; display:flex; gap:8px; align-items:center"
              >
                <img
                  *ngIf="item?.img"
                  style="height:30px; border-radius:4px"
                  [src]="item?.img"
                  alt=""
                />
                {{ item.description }}
              </div>
            </td>
            <td style="padding: 12px 5px; text-align: center; font-size: 13px;">
              {{ item.quantity }}
            </td>
            <td style="padding: 12px 5px; text-align: center; font-size: 13px;">
              <div
                style="width: 15px; height: 15px; border: 1px solid #ddd; margin: 0 auto;"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>

      <div style="font-size: 11px; color: #999; margin-top: 50px;">
        {{ invoiceData.footerNote }}
      </div>
    </div>
  `,
})
export class InvoiceSupplierNotesPDF {
  @ViewChild('docRoot', { static: false })
  private docRootRef?: ElementRef<HTMLElement>;

  get docRootNativeElement(): HTMLElement | undefined {
    return this.docRootRef?.nativeElement;
  }

  invoiceData = {
    invNo: 'INV-00086525316-7172-034',
    issueDate: '14-10-2025',
    deliveryDate: '14-10-2025',
    orderType: 'Delivery',
    amountStatus: 'Tax Exclusive',
    totalAmount: '5.99',
    qrCodeUrl: 'assets/img/logo/dummyQR.png',
    barcodeUrl: 'assets/img/logo/dummyBARCODE.jpg',
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
    billTo: {
      name: 'YO TASTE',
      address: [
        'Ponting',
        'First Floor Flat, 23 Francis Street,',
        'Stornoway, Isle of Lewis',
        'Stornoway',
        'hs12nf',
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
        description: 'American honey (2 box X 15 bottle) (case)',
        quantity: 10,
      },
      {
        img: 'https://cdn.yoicons.com/81t7ME5NU5kt88/business/1101/images/6803e98ae8366.jpeg',
        description: 'American honey (3 box X 15 bottle) (case)',
        quantity: 100,
      },
      {
        img: 'https://cdn.yoicons.com/81t7ME5NU5kt88/business/1101/images/6803e98ae8366.jpeg',
        description: 'American honey (4 box X 15 bottle) (case)',
        quantity: 50,
      },
      {
        img: 'https://cdn.yoicons.com/81t7ME5NU5kt88/business/1101/images/6803e98ae8366.jpeg',
        description: 'American honey (5 box X 15 bottle) (case)',
        quantity: 500,
      },
      {
        img: 'https://cdn.yoicons.com/81t7ME5NU5kt88/business/1101/images/6803e98ae8366.jpeg',
        description: 'American honey (100 box X 15 bottle) (case)',
        quantity: 8000,
      },
    ],
    footerNote:
      'Company Registration No: 56766666520. Registered Office: London Road, IsleofLewis, United Kingdom',
  };
}
