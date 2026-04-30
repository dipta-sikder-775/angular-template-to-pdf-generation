import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicCustomTableComponent } from '../../../components/sales-invoice-pdf-related-components/dynamic-custom-table/dynamic-custom-table.component';
import { ITransactionInvoiceInstalment } from '../invoice-create-order-pdf.model';
import { INVOICE_INSTALLMENT_TABLE_COLUMN } from './invoice-instalment-breakdown.component.model';

@Component({
  selector: 'invoice-instalment-breakdown',
  standalone: true,
  imports: [CommonModule, DynamicCustomTableComponent],
  templateUrl: './invoice-instalment-breakdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceInstalmentBreakdownComponent {
  @Input({ required: true })
  invoiceInstallmentTableData!:
    | readonly ITransactionInvoiceInstalment[]
    | null
    | undefined;

  get invoiceInstallmentTableColumn() {
    return INVOICE_INSTALLMENT_TABLE_COLUMN;
  }
}
