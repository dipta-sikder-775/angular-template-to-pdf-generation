import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IOrderDetailsItem } from './invoice-order-details.model';

@Component({
  selector: 'invoice-order-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-order-details.component.html',
  styleUrl: './invoice-order-details.component.scss',
})
export class TransactionPDFInvoiceOrderTypeAmount {
  @Input({ required: false }) orderDetails?:
    | IOrderDetailsItem[]
    | null
    | undefined;
}
