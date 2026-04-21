import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TransactionInvoiceBankDetails } from '../transaction-invoice-create-order-pdf.model';

@Component({
    selector: 'transaction-pdf-invoice-payment-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './transaction-pdf-invoice-payment-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionPDFInvoicePaymentDetails {
    @Input({ required: true }) bank!: TransactionInvoiceBankDetails;
    @Input() footerNote = '';
}
