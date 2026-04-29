import { ITransactionInvoiceTaxDetailsRow } from '../../../pages/transection-invoice-create-order-pdf/transaction-invoice-create-order-pdf.model';
import {
  ICustomDynamicTableColumn,
  TSimpleStyle,
} from '../dynamic-custom-table/dynamic-custom-table.component.model';

const tableHeaderStyle: NonNullable<
  ICustomDynamicTableColumn<ITransactionInvoiceTaxDetailsRow>['header']
>['style'] = {
  padding: '8px 5px',
  fontWeight: '700',
};

export const TAX_DETAILS_TABLE_STYLES: {
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

export const TAX_DETAILS_TABLE_COLUMNS: ICustomDynamicTableColumn<ITransactionInvoiceTaxDetailsRow>[] =
  [
    {
      header: {
        headerCellContent: 'Tax Rate',
        style: tableHeaderStyle,
        key: crypto.randomUUID(),
      },
      body: {
        bodyCellContent: ({ row }) => row?.rate,
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
        bodyCellContent: ({ row }) => `£${row?.goods}`,
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
        bodyCellContent: ({ row }) => `£${row?.vatAmount}`,
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
        bodyCellContent: ({ row }) => `£${row?.net}`,
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
        bodyCellContent: ({ row }) => `£${row?.total}`,
        style: { padding: '8px 5px' },
        key: crypto.randomUUID(),
      },
    },
  ];
