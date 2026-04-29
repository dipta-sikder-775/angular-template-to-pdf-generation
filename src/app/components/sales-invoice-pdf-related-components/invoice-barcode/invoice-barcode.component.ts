import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'invoice-barcode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-barcode.component.html',
  styleUrl: './invoice-barcode.component.scss',
})
export class InvoiceBarcode {
  @Input({ required: true }) barcodeUrl!: string;
}
