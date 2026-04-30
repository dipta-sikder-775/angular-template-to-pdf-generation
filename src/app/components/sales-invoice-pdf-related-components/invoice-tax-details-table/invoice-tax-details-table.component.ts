import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DynamicCustomTableComponent } from '../dynamic-custom-table/dynamic-custom-table.component';
import {
  TAX_DETAILS_TABLE_COLUMNS,
  TAX_DETAILS_TABLE_STYLES,
} from './invoice-tax-details-table.component.model';
import { ITransactionInvoiceTaxDetailsRow } from '../../../pages/invoice-create-order-pdf/invoice-create-order-pdf.model';

@Component({
  selector: 'invoice-tax-details-table',
  standalone: true,
  imports: [CommonModule, DynamicCustomTableComponent],
  templateUrl: './invoice-tax-details-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceTaxDetailsTableComponent {
  @Input({ required: false })
  taxDetails!: readonly ITransactionInvoiceTaxDetailsRow[] | null | undefined;

  get taxDetailsTableColumns() {
    return TAX_DETAILS_TABLE_COLUMNS;
  }

  get taxDetailsTableStyles() {
    return TAX_DETAILS_TABLE_STYLES;
  }
}
