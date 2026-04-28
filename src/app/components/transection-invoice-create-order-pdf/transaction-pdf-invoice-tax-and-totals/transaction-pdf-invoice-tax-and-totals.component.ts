import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicCustomTableComponent } from '../../../dynamic-custom-table/dynamic-custom-table.component';
import { TransactionInvoiceTaxDetailsRow } from '../transaction-invoice-create-order-pdf.model';
import { TaxDetailsTableComponent } from "./tax-details-table/tax-details-table.component";

@Component({
  selector: 'transaction-pdf-invoice-tax-and-totals',
  standalone: true,
  imports: [CommonModule, DynamicCustomTableComponent, TaxDetailsTableComponent],
  templateUrl: './transaction-pdf-invoice-tax-and-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionPDFInvoiceTaxAndTotals {
  @Input({ required: false })
  taxDetails!: readonly TransactionInvoiceTaxDetailsRow[] | null | undefined;
  // @Input({ required: true }) subtotal!: string;
  // @Input({ required: true }) totalVat!: string;
  // @Input({ required: true }) totalAmount!: string;
}
