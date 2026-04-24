import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IOrderDetailsItem } from './transaction-pdf-invoice-order-details.model';

@Component({
  selector: 'transaction-pdf-invoice-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-pdf-invoice-order-details.component.html',
  styleUrl: './transaction-pdf-invoice-order-details.component.scss',
})
export class TransactionPDFInvoiceOrderTypeAmount {
  @Input({ required: false }) orderDetails?:
    | IOrderDetailsItem[]
    | null
    | undefined;
}
