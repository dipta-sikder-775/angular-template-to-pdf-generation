import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InvoiceTaxDetailsTableComponent } from '../../../components/sales-invoice-pdf-related-components/invoice-tax-details-table/invoice-tax-details-table.component';
import { InvoiceTaxSummaryTableComponent } from '../../../components/sales-invoice-pdf-related-components/invoice-tax-summary-table/invoice-tax-summary-table.component';
import {
  ITaxSummaryRow,
  ITransactionInvoiceTaxDetailsRow,
} from '../invoice-create-order-pdf.model';

@Component({
  selector: 'transaction-pdf-invoice-tax-and-totals',
  standalone: true,
  imports: [
    CommonModule,
    InvoiceTaxDetailsTableComponent,
    InvoiceTaxSummaryTableComponent,
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
