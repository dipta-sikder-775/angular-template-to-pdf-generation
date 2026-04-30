import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { InvoiceTaxDetailsTableComponent } from '../../../components/sales-invoice-pdf-related-components/invoice-tax-details-table/invoice-tax-details-table.component';
import { InvoicePriceTaxSummaryTableComponent } from '../../../components/sales-invoice-pdf-related-components/invoice-price-tax-summary-table/invoice-price-tax-summary-table.component';
import {
  IPriceTaxSummaryRow,
  ITransactionInvoiceTaxDetailsRow,
} from '../invoice-create-order-pdf.model';

@Component({
  selector: 'invoice-tax-and-totals',
  standalone: true,
  imports: [
    CommonModule,
    InvoiceTaxDetailsTableComponent,
    InvoicePriceTaxSummaryTableComponent,
  ],
  templateUrl: './invoice-tax-and-totals.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceTaxAndTotalsComponent {
  @Input({ required: false })
  taxDetails!: readonly ITransactionInvoiceTaxDetailsRow[] | null | undefined;
  @Input({ required: false })
  priceTaxSummary!: readonly IPriceTaxSummaryRow[] | null | undefined;
}
