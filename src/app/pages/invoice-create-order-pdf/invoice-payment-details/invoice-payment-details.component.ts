import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITransactionInvoiceBankDetails } from '../invoice-create-order-pdf.model';

@Component({
  selector: 'invoice-payment-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-payment-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicePaymentDetailsComponent {
  @Input({ required: true }) bank!: ITransactionInvoiceBankDetails;
  @Input() footerNote = '';
}
