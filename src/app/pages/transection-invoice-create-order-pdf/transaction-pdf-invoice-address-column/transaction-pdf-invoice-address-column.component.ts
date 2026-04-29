import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'transaction-pdf-invoice-address-column',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-pdf-invoice-address-column.component.html',
  styleUrl: './transaction-pdf-invoice-address-column.component.scss',
})
export class TransactionPDFInvoiceAddressColumn {
  @Input({ required: true }) title: string | number | null | undefined;
  @Input({ required: false }) name: string | null | undefined;
  @Input({ required: true }) description:
    | (string | number)[]
    | null
    | undefined;
  @Input({ required: true }) isFirstItem: boolean | null | undefined;
  @Input({ required: true }) isLastItem: boolean | null | undefined;
}
