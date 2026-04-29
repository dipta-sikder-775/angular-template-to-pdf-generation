import { ICustomDynamicTableColumn } from '../../../dynamic-custom-table/dynamic-custom-table.component.model';
import { ITransactionInvoiceInstalment } from '../transaction-invoice-create-order-pdf.model';

export const INVOICE_INSTALLMENT_TABLE_COLUMN: ICustomDynamicTableColumn<ITransactionInvoiceInstalment>[] =
  [
    {
      header: {
        headerCellContent: 'Date',
        key: 'date',
        style: { padding: '6px 5px', fontWeight: '700' },
      },
      body: {
        key: 'date',
        style: {
          padding: '6px 5px',
          fontSize: '13px',
        },
        bodyCellContent: ({ row }) => row?.date || 'N/A',
      },
    },
    {
      header: {
        headerCellContent: 'Due',
        key: 'due',
        style: { padding: '6px 5px', fontWeight: '700' },
      },
      body: {
        key: (row) => row?.due ?? 'N/A',
        bodyCellContent: ({ row }) => `£${row?.due ?? 'N/A'}`,
        style: {
          padding: '6px 5px',
          fontSize: '13px',
        },
      },
    },
    {
      header: {
        headerCellContent: 'Status',
        key: 'status',
        style: { padding: '6px 5px', fontWeight: '700' },
      },
      body: {
        key: 'status',
        bodyCellContent: ({ row }) => row?.status,
        style: {
          padding: '6px 5px',
          fontSize: '13px',
        },
      },
    },
  ];
