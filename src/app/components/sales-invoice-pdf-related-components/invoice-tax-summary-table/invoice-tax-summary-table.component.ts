import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITaxSummaryRow } from '../../../pages/transection-invoice-create-order-pdf/transaction-invoice-create-order-pdf.model';
import { DynamicCustomTableComponent } from '../dynamic-custom-table/dynamic-custom-table.component';
import {
  TAX_SUMMARY_TABLE_COLUMNS,
  TAX_SUMMARY_TABLE_STYLES,
} from './invoice-tax-summary-table.component.model';

@Component({
  selector: 'invoice-tax-summary-table',
  standalone: true,
  imports: [CommonModule, DynamicCustomTableComponent],
  templateUrl: './invoice-tax-summary-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceTaxSummaryTableComponent {
  @Input({ required: false })
  taxSummary!: readonly ITaxSummaryRow[] | null | undefined;

  get taxDetailsTableColumns() {
    return TAX_SUMMARY_TABLE_COLUMNS;
  }

  get taxDetailsTableStyles() {
    return TAX_SUMMARY_TABLE_STYLES;
  }
}
