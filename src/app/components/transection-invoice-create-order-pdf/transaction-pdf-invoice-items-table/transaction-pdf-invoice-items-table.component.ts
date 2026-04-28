import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITransactionInvoiceLineItem } from '../transaction-invoice-create-order-pdf.model';

@Component({
  selector: 'transaction-pdf-invoice-items-table',
  standalone: true,
  imports: [CommonModule],
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
}
