import { Component, Input } from '@angular/core';
import { ILoopData } from '../../../components/sales-invoice-pdf-related-components/dynamic-custom-table/dynamic-custom-table.component.model';
import { TTransactionInvoiceLineItem } from '../invoice-create-order-pdf.model';

@Component({
  selector: 'item-description-cell',
  template: `
    <div style="font-size: 13px; display: flex; gap: 8px">
      @if (typeDataMode?.img) {
        <img style="width: 40px" [src]="typeDataMode?.img" alt="" />
      }
      <div>
        {{ typeDataMode?.description }}
        @if (typeDataMode?.sku) {
          <div style="font-size: 11px; color: #777">
            Sku: {{ typeDataMode?.sku }}
          </div>
        }
      </div>
    </div>
  `,
})
export class ItemDescriptionCellComponent {
  @Input() row: TTransactionInvoiceLineItem | null | undefined;
  @Input() data!: TTransactionInvoiceLineItem[] | null | undefined;
  @Input() loop!: ILoopData;

  get typeDataMode() {
    return this.row?.type === 'data' ? this.row : null;
  }
}
