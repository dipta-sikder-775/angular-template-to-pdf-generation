import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TransactionInvoiceTaxSummaryRow } from '../transaction-invoice-create-order-pdf.model';
import { DynamicCustomTableComponent } from "../../../dynamic-custom-table/dynamic-custom-table.component";

@Component({
    selector: 'transaction-pdf-invoice-tax-and-totals',
    standalone: true,
    imports: [CommonModule, DynamicCustomTableComponent],
    templateUrl: './transaction-pdf-invoice-tax-and-totals.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionPDFInvoiceTaxAndTotals {
    @Input({ required: true })
    taxSummary!: readonly TransactionInvoiceTaxSummaryRow[];
    @Input({ required: true }) subtotal!: string;
    @Input({ required: true }) totalVat!: string;
    @Input({ required: true }) totalAmount!: string;
}
