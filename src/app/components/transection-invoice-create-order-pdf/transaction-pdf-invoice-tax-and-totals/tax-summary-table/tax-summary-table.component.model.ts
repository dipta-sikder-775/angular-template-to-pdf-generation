import {
  ICustomDynamicTableColumn,
  TSimpleStyle,
} from '../../../../dynamic-custom-table/dynamic-custom-table.component.model';
import { ITransactionInvoiceTaxDetailsRow } from '../../transaction-invoice-create-order-pdf.model';
import { TemplateComponent } from './template-component.component';

export const TAX_SUMMARY_TABLE_STYLES: {
  tableStyle: TSimpleStyle;
  tableHeadRowStyle: TSimpleStyle;
  tableBodyRowStyle: TSimpleStyle;
} = {
  tableStyle: { width: '95%', borderCollapse: 'collapse' },
  tableHeadRowStyle: {
    textAlign: 'left',
    fontSize: '13px',
    color: '#444',
    borderBottom: '1px solid #333',
  },
  tableBodyRowStyle: {
    fontSize: '13px',
    borderBottom: '1px solid #eee',
  },
};

export const TAX_SUMMARY_TABLE_COLUMNS: ICustomDynamicTableColumn<ITransactionInvoiceTaxDetailsRow>[] =
  [
    {
      body: {
        bodyCellContent: (data) => data?.rate,
        component: TemplateComponent,
        key: crypto.randomUUID(),
      },
    },
  ];
