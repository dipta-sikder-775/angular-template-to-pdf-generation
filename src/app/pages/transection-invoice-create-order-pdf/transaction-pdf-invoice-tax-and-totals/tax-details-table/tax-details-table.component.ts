import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicCustomTableComponent } from '../../../../dynamic-custom-table/dynamic-custom-table.component';
import { ITransactionInvoiceTaxDetailsRow } from '../../transaction-invoice-create-order-pdf.model';
import {
  TAX_DETAILS_TABLE_COLUMNS,
  TAX_DETAILS_TABLE_STYLES,
} from './tax-details-table.component.model';

@Component({
  selector: 'tax-details-table',
  standalone: true,
  imports: [CommonModule, DynamicCustomTableComponent],
  templateUrl: './tax-details-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxDetailsTableComponent {
  @Input({ required: false })
  taxDetails!: readonly ITransactionInvoiceTaxDetailsRow[] | null | undefined;

  get taxDetailsTableColumns() {
    return TAX_DETAILS_TABLE_COLUMNS;
  }

  get taxDetailsTableStyles() {
    return TAX_DETAILS_TABLE_STYLES;
  }
}
