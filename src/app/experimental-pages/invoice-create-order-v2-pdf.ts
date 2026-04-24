import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-invoice-create-order-v2-pdf',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      #docRoot
      style="width: 210mm; min-height: 290mm; padding: 40px; margin: 0 auto; background: white; font-size: 11px; color: #333; box-sizing: border-box; line-height: 1.4; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"
    >
      <div
        style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px; gap: 15px;"
      >
        <div style="flex: 2;">
          <h1
            style="font-size: 24px; margin: 0 0 10px 0; color: #000; font-weight: 700;"
          >
            Invoice
          </h1>
          <div style="display: flex; margin-bottom: 3px;">
            <b style="width: 90px;">INV No:</b>
            <span>{{ invoiceData.invNo }}</span>
          </div>
          <div style="display: flex; margin-bottom: 3px;">
            <b style="width: 90px;">VAT Number:</b>
            <span>{{ invoiceData.vatNumber }}</span>
          </div>
          <div style="display: flex; margin-bottom: 3px;">
            <b style="width: 90px;">Issue Date:</b>
            <span>{{ invoiceData.issueDate }}</span>
          </div>
          <div style="display: flex; margin-bottom: 3px;">
            <b style="width: 90px;">Delivery Date:</b>
            <span>{{ invoiceData.deliveryDate }}</span>
          </div>
        </div>
        <div style="flex: 0.8; text-align: center;">
          <img
            [src]="invoiceData.qrCodeUrl"
            alt="QR"
            style="width: 75px; height: 75px;"
          />
        </div>
        <div style="flex: 1.2; text-align: center;">
          <img
            [src]="invoiceData.barcodeUrl"
            alt="Barcode"
            style="width: 140px; height: 40px; object-fit: contain;"
          />
        </div>
        <div style="flex: 0.8; text-align: right;">
          <img
            src="https://cdn.yoicons.com/8832SVdev/business/10/images/icon/10.png?t=1775659733109"
            alt="Logo"
            style="width: 80px;"
          />
        </div>
      </div>

      <hr style="border: 0; border-top: 1px solid #eee; margin-bottom: 20px;" />

      <div style="display: flex; gap: 20px; margin-bottom: 30px;">
        <div style="flex: 1;">
          <p style="margin: 0 0 5px 0;"><strong>Supplier</strong></p>
          <p style="margin: 0; font-weight: 600;">
            {{ invoiceData.supplier.name }}
          </p>
          <p
            *ngFor="let line of invoiceData.supplier.address"
            style="margin: 0; color: #555;"
          >
            {{ line }}
          </p>
        </div>
        <div style="flex: 1;">
          <p style="margin: 0 0 5px 0;"><strong>Bill To</strong></p>
          <p style="margin: 0; font-weight: 600;">
            {{ invoiceData.billTo.name }}
          </p>
          <p
            *ngFor="let line of invoiceData.billTo.address"
            style="margin: 0; color: #555;"
          >
            {{ line }}
          </p>
        </div>
        <div style="flex: 1;">
          <p style="margin: 0 0 5px 0;"><strong>Deliver To</strong></p>
          <p style="margin: 0; font-weight: 600;">
            {{ invoiceData.deliverTo.name }}
          </p>
          <p
            *ngFor="let line of invoiceData.deliverTo.address"
            style="margin: 0; color: #555;"
          >
            {{ line }}
          </p>
        </div>
      </div>

      <!-- ORDER TYPE & AMOUNT DUE -->
      <div style="margin-bottom: 15px;">
        <p style="margin: 2px 0; font-size: 15px;">
          <strong>Order Type</strong>
          <span style="margin-left: 10px;"> {{ invoiceData.orderType }}</span>
        </p>
        <p
          style="font-size: 22px; margin: 1px 0 0 0; font-weight: bold; color: #000;"
        >
          £{{ invoiceData.totalAmount }} Due
        </p>
      </div>

      <div style="margin-bottom: 30px;">
        <div
          style="display: flex; border-bottom: 1px solid #ddd; padding: 10px 5px; font-weight: 700; background: #fff;"
        >
          <div style="flex: 5;">Description</div>
          <div style="flex: 1; text-align: right;">Qty</div>
          <div style="flex: 1.5; text-align: right;">Unit Price</div>
          <div style="flex: 1.5; text-align: right;">VAT</div>
          <div style="flex: 1.5; text-align: right;">Amount GBP</div>
        </div>

        <div
          style="padding: 10px 5px; font-weight: bold; background: #fafafa; border-bottom: 1px solid #eee; text-transform: uppercase;"
        >
          {{ invoiceData.stockType }} :
        </div>

        <div
          *ngFor="let item of invoiceData.items"
          style="display: flex; border-bottom: 1px solid #eee; padding: 12px 5px; align-items: center;"
        >
          <div style="flex: 5; display: flex; gap: 10px; align-items: center;">
            <img
              *ngIf="item?.img"
              [src]="item.img"
              style="width: 35px; height: 35px; border-radius: 4px; object-fit: cover; border: 1px solid #eee;"
              alt="Item Image"
            />
            <div>
              <div
                style="font-weight: 600; font-size: 12px; color: #000;"
                *ngIf="item.description"
              >
                {{ item.description }}
              </div>
              <div *ngIf="item.sku" style="font-size: 10px; color: #888;">
                SKU: {{ item.sku }}
              </div>
            </div>
          </div>

          <div style="flex: 1; text-align: right;" *ngIf="item.quantity">
            {{ item.quantity }}
          </div>

          <div style="flex: 1.5; text-align: right;" *ngIf="item.unitPrice">
            £{{ item.unitPrice }}
          </div>

          <div
            style="flex: 1.5; text-align: right; font-weight: 600;"
            *ngIf="item.vat"
          >
            £{{ item.vat }}
          </div>

          <div
            style="flex: 1.5; text-align: right; font-weight: 600;"
            *ngIf="item.amount"
          >
            £{{ item.amount }}
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 40px; margin-bottom: 30px;">
        <div style="flex: 1.5;">
          <div
            style="display: flex; border-bottom: 1px solid #ddd; padding: 5px; font-weight: 700; font-size: 10px;"
          >
            <div style="flex: 1;">Tax Rate</div>
            <div style="flex: 1;">Goods</div>
            <div style="flex: 1;">VAT</div>
            <div style="flex: 1;">Net</div>
            <div style="flex: 1;">Total</div>
          </div>
          <div
            *ngFor="let tax of invoiceData.taxSummary"
            style="display: flex; border-bottom: 1px solid #eee; padding: 8px 5px;"
          >
            <div style="flex: 1;">{{ tax.rate }}</div>
            <div style="flex: 1;">£{{ tax.goods }}</div>
            <div style="flex: 1;">£{{ tax.vatAmount }}</div>
            <div style="flex: 1;">£{{ tax.net }}</div>
            <div style="flex: 1;">£{{ tax.total }}</div>
          </div>
        </div>

        <div style="flex: 1; background: #fefefe;">
          <div
            style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #f0f0f0;"
          >
            <span>Subtotal</span>
            <span>£{{ invoiceData.subtotal }}</span>
          </div>
          <div
            style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #f0f0f0;"
          >
            <span>Total VAT</span>
            <span>£{{ invoiceData.totalVat }}</span>
          </div>
          <div
            style="display: flex; justify-content: space-between; padding: 10px 0; font-size: 14px;"
          >
            <strong>Total Amount</strong>
            <strong>£{{ invoiceData.totalAmount }}</strong>
          </div>
        </div>
      </div>

      <div *ngIf="invoiceData.instalments.length" style="margin-bottom: 30px;">
        <div
          style="background: #eee; padding: 6px 12px; font-weight: 700; border-radius: 4px; margin-bottom: 10px;"
        >
          Instalment Breakdown
        </div>
        <div style="width: 60%;">
          <div
            style="display: flex; border-bottom: 1px solid #ddd; padding: 5px; font-weight: 700;"
          >
            <div style="flex: 1;">Date</div>
            <div style="flex: 1;">Due</div>
            <div style="flex: 1;">Status</div>
          </div>
          <div
            *ngFor="let inst of invoiceData.instalments"
            style="display: flex; border-bottom: 1px solid #f5f5f5; padding: 6px 5px;"
          >
            <div style="flex: 1;">{{ inst.date }}</div>
            <div style="flex: 1;">£{{ inst.due }}</div>
            <div style="flex: 1; color: #666;">{{ inst.status }}</div>
          </div>
        </div>
      </div>

      <div style="border-top: 1px solid #eee; padding-top: 20px;">
        <div style="margin-bottom: 15px;">
          <p style="margin: 0 0 5px 0;"><strong>Bank Details</strong></p>
          <div style="color: #555;">
            {{ invoiceData.bank.accountName }} | Acc:
            {{ invoiceData.bank.accountNo }} | Sort:
            {{ invoiceData.bank.sortCode }}
          </div>
        </div>
        <div style="margin-bottom: 15px;">
          <p style="margin: 0 0 5px 0;"><strong>International</strong></p>
          <div style="color: #555; font-size: 10px;">
            BIC: {{ invoiceData.bank.bic }} | IBAN: {{ invoiceData.bank.iban }}
          </div>
        </div>
        <div style="font-style: italic; color: #999; margin-top: 20px;">
          {{ invoiceData.footerNote }}
        </div>
      </div>
    </div>
  `,
})
export class InvoiceCreateOrderV2PDF {
  @ViewChild('docRoot', { static: false })
  private docRootRef?: ElementRef<HTMLElement>;

  get docRootNativeElement(): HTMLElement | undefined {
    return this.docRootRef?.nativeElement;
  }

  invoiceData = {
    invNo: 'INV-00001026733-9336-881',
    accountNo: '56766666520',
    issueDate: '03-04-2026',
    deliveryDate: '09-04-2026',
    vatNumber: '2313131',
    qrCodeUrl:
      'https://images.unsplash.com/photo-1776088066852-33ac3d31dffd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8',
    barcodeUrl:
      'https://images.unsplash.com/photo-1776088066852-33ac3d31dffd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8',
    orderType: 'Delivery',
    stockType: 'kiosk',
    supplier: {
      name: 'VALT TECH LIMITED',
      address: [
        'Lakeview House, Lakeview Park, Bond Avenue',
        'Buckinghamshire',
        'Milton Keynes',
        'MK11FE',
      ],
    },
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
    instalments: [
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
