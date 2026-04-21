import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IInvoiceData } from './transaction-pdf-invoice-summary.model';

@Component({
    selector: 'transaction-pdf-invoice-summary',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './transaction-pdf-invoice-summary.component.html',
    styleUrl: "./transaction-pdf-invoice-summary.component.scss",
})
export class TransactionPDFInvoiceSummary {
    @Input({ required: true }) invoiceData!: IInvoiceData;
}
