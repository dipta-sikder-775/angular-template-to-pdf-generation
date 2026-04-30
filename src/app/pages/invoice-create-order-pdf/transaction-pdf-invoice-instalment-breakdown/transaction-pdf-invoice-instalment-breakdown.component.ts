import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicCustomTableComponent } from '../../../components/sales-invoice-pdf-related-components/dynamic-custom-table/dynamic-custom-table.component';
import { ITransactionInvoiceInstalment } from '../invoice-create-order-pdf.model';
import { INVOICE_INSTALLMENT_TABLE_COLUMN } from './transaction-pdf-invoice-instalment-breakdown.component.model';

@Component({
  selector: 'transaction-pdf-invoice-instalment-breakdown',
  standalone: true,
  imports: [CommonModule, DynamicCustomTableComponent],
  templateUrl: './transaction-pdf-invoice-instalment-breakdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionPDFInvoiceInstalmentBreakdown {
  @Input({ required: true })
  invoiceInstallmentTableData!:
    | readonly ITransactionInvoiceInstalment[]
    | null
    | undefined;

  get invoiceInstallmentTableColumn() {
    return INVOICE_INSTALLMENT_TABLE_COLUMN;
  }
}
