import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IInvoiceSummaryData } from './invoice-summary.model';

@Component({
  selector: 'invoice-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-summary.component.html',
  styleUrl: './invoice-summary.component.scss',
})
export class InvoiceSummaryComponent {
  @Input({ required: true }) invoiceSummaryData!: IInvoiceSummaryData;
}
