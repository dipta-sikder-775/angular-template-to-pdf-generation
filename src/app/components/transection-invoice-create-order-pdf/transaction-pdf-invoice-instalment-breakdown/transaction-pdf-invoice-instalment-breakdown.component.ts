import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TransactionInvoiceInstalment } from '../transaction-invoice-create-order-pdf.model';

@Component({
    selector: 'transaction-pdf-invoice-instalment-breakdown',
    standalone: true,
    imports: [CommonModule],
    templateUrl:
        './transaction-pdf-invoice-instalment-breakdown.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionPDFInvoiceInstalmentBreakdown {
    @Input({ required: true })
    installments!: readonly TransactionInvoiceInstalment[];
}
