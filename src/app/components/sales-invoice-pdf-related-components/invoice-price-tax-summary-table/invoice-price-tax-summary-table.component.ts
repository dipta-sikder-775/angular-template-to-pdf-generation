import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IPriceTaxSummaryRow } from '../../../pages/invoice-create-order-pdf/invoice-create-order-pdf.model';
import { DynamicCustomTableComponent } from '../dynamic-custom-table/dynamic-custom-table.component';
import {
  TAX_SUMMARY_TABLE_COLUMNS,
  TAX_SUMMARY_TABLE_STYLES,
} from './invoice-price-tax-summary-table.component.model';

@Component({
  selector: 'invoice-price-tax-summary-table',
  standalone: true,
  imports: [CommonModule, DynamicCustomTableComponent],
  templateUrl: './invoice-price-tax-summary-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicePriceTaxSummaryTableComponent {
  @Input({ required: false })
  taxSummary!: readonly IPriceTaxSummaryRow[] | null | undefined;

  get taxDetailsTableColumns() {
    return TAX_SUMMARY_TABLE_COLUMNS;
  }

  get taxDetailsTableStyles() {
    return TAX_SUMMARY_TABLE_STYLES;
  }
}
