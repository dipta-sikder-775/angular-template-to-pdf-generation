import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'transaction-pdf-invoice-order-type-amount',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './transaction-pdf-invoice-order-type-amount.component.html',
    styleUrl: './transaction-pdf-invoice-order-type-amount.component.scss',
})
export class TransactionPDFInvoiceOrderTypeAmount {
    @Input({ required: true }) orderType!: string;
    @Input({ required: true }) totalAmount!: string;
    @Input({ required: false }) status: string = 'Due';
    @Input({ required: false }) currency: string = '£';
}
