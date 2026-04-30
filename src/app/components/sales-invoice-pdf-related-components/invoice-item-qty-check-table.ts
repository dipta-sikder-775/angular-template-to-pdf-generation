import { Component, Input } from '@angular/core';

interface IInvoiceItemQtyCheckRow {
  id?: string | number;
  _id?: string | number;
  description: string | number | null | undefined;
  quantity: number | string;
  img: string | null | undefined;
  isChecked: boolean | null | undefined;
}
type TInvoiceItemQtyCheckData = IInvoiceItemQtyCheckRow[] | null | undefined;
type TInvoiceItemQtyCheckLabel = string | number | null | undefined;

@Component({
  selector: 'invoice-item-qty-check-table',
  standalone: true,
  imports: [],
  template: `
    <table style="width: 100%; border-collapse: collapse;">
      <thead>
        <tr style="border-bottom: 1px solid #ddd; text-align: left;  ">
          <th style="padding: 10px 5px; font-weight: 600; font-size:12px;">
            Description
          </th>
          <th
            style="padding: 10px 5px; text-align: center; width: 80px; font-weight: 600; font-size:12px;"
          >
            Quantity
          </th>
          <th
            style="padding: 10px 5px; text-align: center; width: 80px; font-weight: 600; font-size:12px;"
          >
            Check
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td colspan="3" style="padding: 10px 5px 5px 5px; font-size:13px;">
            <strong>{{ label }}</strong>
          </td>
        </tr>

        <!-- *ngFor="let item of invoiceData.items; let i = index" -->
        @for (item of data; track resolveTrackLoopKey(item)) {
          <tr style="border-bottom: 1px solid #f9f9f9;">
            <td style="padding: 12px 5px; font-size:13px;">
              <div
                style="font-size: 13px; display:flex; gap:8px; align-items:center"
              >
                @if (item?.img) {
                  <img
                    style="height:30px;  border-radius:4px"
                    [src]="item?.img"
                    alt=""
                  />
                }
                {{ item.description }}
              </div>
            </td>

            <td style="padding: 12px 5px; text-align: center; font-size:13px;">
              {{ item.quantity }}
            </td>

            <td style="padding: 12px 5px; text-align: center; font-size:13px;">
              @if (!item?.isChecked) {
                <!-- unchecked -->
                <div
                  style="width: 15px; height: 15px; border: 1px solid #ddd; margin: 0 auto;"
                ></div>
              } @else {
                <!-- checked -->
                <div
                  style="width: 15px; height: 15px; border: 1px solid #0075ff; background-color: #0075ff; margin: 0 auto; display: flex; align-items: center; justify-content: center;"
                >
                  <div
                    style="width: 8px; height: 4px; border-left: 2px solid white; border-bottom: 2px solid white; transform: rotate(-45deg); margin-top: -2px;"
                  ></div>
                </div>
              }
            </td>
          </tr>
        }
      </tbody>
    </table>
  `,
})
export class InvoiceItemQtyCheckTableComponent {
  @Input() label: TInvoiceItemQtyCheckLabel = 'Groceries :';
  @Input({ required: true }) data: TInvoiceItemQtyCheckData;

  get ensureDataIsArray(): NonNullable<TInvoiceItemQtyCheckData> {
    if (!Array.isArray(this.data)) {
      return [];
    }
    return this.data;
  }

  resolveTrackLoopKey(row: IInvoiceItemQtyCheckRow | null | undefined): string {
    if (!row) {
      return crypto.randomUUID();
    }
    return String(row.id ?? row._id ?? crypto.randomUUID());
  }
}
