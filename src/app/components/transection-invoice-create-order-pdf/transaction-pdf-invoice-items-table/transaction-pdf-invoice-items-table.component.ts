import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicCustomTableComponent } from '../../../dynamic-custom-table/dynamic-custom-table.component';
import { ITransactionInvoiceLineItem } from '../transaction-invoice-create-order-pdf.model';
import { ITEMS_TABLE_COLUMNS } from './transaction-pdf-invoice-items-table.component.model';

@Component({
  selector: 'transaction-pdf-invoice-items-table',
  standalone: true,
  imports: [CommonModule, DynamicCustomTableComponent],
  templateUrl: './transaction-pdf-invoice-items-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionPDFInvoiceItemsTable {
  @Input({ required: true }) items!: readonly ITransactionInvoiceLineItem[];
  @Input({ required: true }) stockType!: string;

  tableHeaderData: {
    style: Partial<CSSStyleDeclaration>;
    label: string | number;
  } | null = null;

  get itemsTableColumn() {
    return ITEMS_TABLE_COLUMNS;
  }

  get itemsTableData() {
    return this.items;
  }
}
