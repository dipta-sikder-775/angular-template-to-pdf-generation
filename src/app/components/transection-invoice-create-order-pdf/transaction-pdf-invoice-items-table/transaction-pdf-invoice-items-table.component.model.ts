import {
  ICustomDynamicTableColumn,
  TSimpleStyle,
} from '../../../dynamic-custom-table/dynamic-custom-table.component.model';
import { ITransactionInvoiceLineItem } from '../transaction-invoice-create-order-pdf.model';

export const ITEMS_TABLE_STYLES: {
  tableStyle: TSimpleStyle;
  tableHeadRowStyle: TSimpleStyle;
  tableBodyRowStyle: TSimpleStyle;
} = {
  tableStyle: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '25px',
  },
  tableHeadRowStyle: {
    borderBottom: '1px solid #333',
    textAlign: 'left',
    color: '#333',
  },
  tableBodyRowStyle: {
    fontSize: '13px',
    borderBottom: '1px solid #eee',
  },
};

export const ITEMS_TABLE_COLUMNS: ICustomDynamicTableColumn<ITransactionInvoiceLineItem>[] =
  [
    {
      header: {
        headerCellContent: 'Description',
        key: crypto.randomUUID(),
        style: {
          padding: '8px 5px',
          fontWeight: '700',
          fontSize: '12px',
        },
      },
      body: {
        bodyCellContent: (row, data, loopData) =>
          loopData?.isFirstItem ? 'Kiosk' : '',
        // component: TaxSummaryCellTemplateComponent,
        key: crypto.randomUUID(),
        style: {
          padding: '8px 5px',
          textAlign: 'right',
          width: '80px',
          fontWeight: '700',
          fontSize: '12px',
        },
      },
    },
    {
      header: {
        headerCellContent: 'Quantity',
        key: crypto.randomUUID(),
        style: {
          padding: '8px 5px',
          textAlign: 'right',
          width: '80px',
          fontWeight: '700',
          fontSize: '12px',
        },
      },
      body: {
        bodyCellContent: (row) => row?.quantity,
        // component: TaxSummaryCellTemplateComponent,
        key: crypto.randomUUID(),
      },
    },
    {
      header: {
        headerCellContent: 'Unit Price',
        key: crypto.randomUUID(),
        style: {
          padding: '8px 5px',
          textAlign: 'right',
          width: '80px',
          fontWeight: '700',
          fontSize: '12px',
        },
      },
      body: {
        bodyCellContent: (row) => row?.unitPrice,
        // component: TaxSummaryCellTemplateComponent,
        key: crypto.randomUUID(),
      },
    },
    {
      header: {
        headerCellContent: 'VAT',
        key: crypto.randomUUID(),
        style: {
          padding: '8px 5px',
          textAlign: 'right',
          width: '80px',
          fontWeight: '700',
          fontSize: '12px',
        },
      },
      body: {
        bodyCellContent: (row) => row?.vat,
        // component: TaxSummaryCellTemplateComponent,
        key: crypto.randomUUID(),
      },
    },
    {
      header: {
        headerCellContent: 'Amount GBP',
        key: crypto.randomUUID(),
        style: {
          padding: '8px 5px',
          textAlign: 'right',
          width: '80px',
          fontWeight: '700',
          fontSize: '12px',
        },
      },
      body: {
        bodyCellContent: (row) => row?.amount,
        // component: TaxSummaryCellTemplateComponent,
        key: crypto.randomUUID(),
      },
    },
  ];

// export const SAMPLE_ITEMS_TABLE_DATA: ITransactionInvoiceLineItem[] = []
