import {
  ICustomDynamicTableColumn,
  TSimpleStyle,
} from '../../../../dynamic-custom-table/dynamic-custom-table.component.model';
import { TransactionInvoiceTaxDetailsRow } from '../../transaction-invoice-create-order-pdf.model';

const tableHeaderStyle: NonNullable<
  ICustomDynamicTableColumn<TransactionInvoiceTaxDetailsRow>['header']
>['style'] = {
  padding: '8px 5px',
  fontWeight: '700',
};

export const TAX_DETAILS_TABLE_STYLES: {
  tableStyle: TSimpleStyle;
  tableHeadRowStyle: TSimpleStyle;
} = {
  tableStyle: { width: '95%', borderCollapse: 'collapse' },
  tableHeadRowStyle: {
    textAlign: 'left',
    fontSize: '13px',
    color: '#444',
    borderBottom: '1px solid #333',
  },
};

export const TAX_DETAILS_TABLE_COLUMNS: ICustomDynamicTableColumn<TransactionInvoiceTaxDetailsRow>[] =
  [
    {
      header: {
        headerCellContent: 'Tax Rate',
        style: tableHeaderStyle,
        key: crypto.randomUUID(),
      },
      body: {
        bodyCellContent: (data) => data?.rate,
        style: { padding: '8px 5px' },
        key: crypto.randomUUID(),
      },
    },
    {
      header: {
        headerCellContent: 'Goods',
        style: tableHeaderStyle,
        key: crypto.randomUUID(),
      },
      body: {
        bodyCellContent: (data) => data?.rate,
        style: { padding: '8px 5px' },
        key: crypto.randomUUID(),
      },
    },
    {
      header: {
        headerCellContent: 'Vat Amount',
        style: tableHeaderStyle,
        key: crypto.randomUUID(),
      },
      body: {
        bodyCellContent: (data) => data?.rate,
        style: { padding: '8px 5px' },
        key: crypto.randomUUID(),
      },
    },
    {
      header: {
        headerCellContent: 'Net',
        style: tableHeaderStyle,
        key: crypto.randomUUID(),
      },
      body: {
        bodyCellContent: (data) => data?.rate,
        style: { padding: '8px 5px' },
        key: crypto.randomUUID(),
      },
    },
    {
      header: {
        headerCellContent: 'Total',
        style: tableHeaderStyle,
        key: crypto.randomUUID(),
      },
      body: {
        bodyCellContent: (data) => data?.rate,
        style: { padding: '8px 5px' },
        key: crypto.randomUUID(),
      },
    },
  ];
