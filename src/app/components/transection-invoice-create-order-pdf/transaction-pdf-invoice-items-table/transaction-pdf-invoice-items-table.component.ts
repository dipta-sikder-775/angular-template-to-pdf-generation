import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITransactionInvoiceLineItem } from '../transaction-invoice-create-order-pdf.model';
import { DynamicCustomTableComponent } from "../../../dynamic-custom-table/dynamic-custom-table.component";

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
}
