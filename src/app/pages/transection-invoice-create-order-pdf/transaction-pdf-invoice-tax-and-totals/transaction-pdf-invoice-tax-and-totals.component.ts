import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicCustomTableComponent } from '../../../dynamic-custom-table/dynamic-custom-table.component';
import {
  ITaxSummaryRow,
  ITransactionInvoiceTaxDetailsRow,
} from '../transaction-invoice-create-order-pdf.model';
import { TaxDetailsTableComponent } from './tax-details-table/tax-details-table.component';
import { TaxSummaryTableComponent } from './tax-summary-table/tax-summary-table.component';

@Component({
  selector: 'transaction-pdf-invoice-tax-and-totals',
  standalone: true,
  imports: [
    CommonModule,
    DynamicCustomTableComponent,
    TaxDetailsTableComponent,
    TaxSummaryTableComponent,
  ],
  templateUrl: './transaction-pdf-invoice-tax-and-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionPDFInvoiceTaxAndTotals {
  @Input({ required: false })
  taxDetails!: readonly ITransactionInvoiceTaxDetailsRow[] | null | undefined;
  @Input({ required: false })
  taxSummary!: readonly ITaxSummaryRow[] | null | undefined;
}
