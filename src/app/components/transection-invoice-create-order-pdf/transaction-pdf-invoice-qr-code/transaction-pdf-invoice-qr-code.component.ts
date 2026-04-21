import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'transaction-pdf-invoice-qr-code',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './transaction-pdf-invoice-qr-code.component.html',
    styleUrl: './transaction-pdf-invoice-qr-code.component.scss',
})
export class TransactionPDFInvoiceQrCode {
    @Input({ required: true }) qrCodeUrl!: string;
}
