import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'transaction-pdf-invoice-barcode',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './transaction-pdf-invoice-barcode.component.html',
    styleUrl: './transaction-pdf-invoice-barcode.component.scss',
})
export class TransactionPDFInvoiceBarcode {
    @Input({ required: true }) barcodeUrl!: string;
}
