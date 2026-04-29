import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicCustomTableComponent } from '../../../../components/sales-invoice-pdf-related-components/dynamic-custom-table/dynamic-custom-table.component';
import { ITaxSummaryRow } from '../../transaction-invoice-create-order-pdf.model';
import {
  TAX_SUMMARY_TABLE_COLUMNS,
  TAX_SUMMARY_TABLE_STYLES,
} from './tax-summary-table.component.model';

@Component({
  selector: 'tax-summary-table',
  standalone: true,
  imports: [CommonModule, DynamicCustomTableComponent],
  templateUrl: './tax-summary-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxSummaryTableComponent {
  @Input({ required: false })
  taxSummary!: readonly ITaxSummaryRow[] | null | undefined;

  get taxDetailsTableColumns() {
    return TAX_SUMMARY_TABLE_COLUMNS;
  }

  get taxDetailsTableStyles() {
    return TAX_SUMMARY_TABLE_STYLES;
  }
}
