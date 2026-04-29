import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'invoice-qr-code',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-qr-code.component.html',
  styleUrl: './invoice-qr-code.component.scss',
})
export class InvoiceQrCodeComponent {
  @Input({ required: true }) qrCodeUrl!: string;
}
