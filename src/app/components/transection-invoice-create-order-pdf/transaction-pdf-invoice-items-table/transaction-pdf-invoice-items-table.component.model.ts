import {
  ICustomDynamicTableColumn,
  TSimpleStyle,
} from '../../../dynamic-custom-table/dynamic-custom-table.component.model';
import { TTransactionInvoiceLineItem } from '../transaction-invoice-create-order-pdf.model';
import { ItemDescriptionCellComponent } from './item-description-cell.component';

export const ITEMS_TABLE_STYLES: {
  // tableStyle: TSimpleStyle;
  // tableHeadRowStyle: TSimpleStyle;
  // tableBodyRowStyle: TSimpleStyle;
  tableBodyRowTdStyle: TSimpleStyle;
} = {
  // tableStyle: {
  //   width: '100%',
  //   borderCollapse: 'collapse',
  //   marginBottom: '25px',
  // },
  // tableHeadRowStyle: {
  //   borderBottom: '1px solid #333',
  //   textAlign: 'left',
  //   color: '#333',
  // },
  // tableBodyRowStyle: {
  //   fontSize: '13px',
  //   borderBottom: '1px solid #eee',
  // },
  tableBodyRowTdStyle: {
    padding: '8px 5px',
    textAlign: 'right',
    fontSize: '12px',
  },
};

export const ITEMS_TABLE_COLUMNS: ICustomDynamicTableColumn<TTransactionInvoiceLineItem>[] =
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
        bodyCellContent: ({ row }) => {
          if (!row) {
            return null;
          }

          if (row.type === 'data') {
            return row.description;
          }

          if (row.type === 'label') {
            return row.label;
          }

          return null;
        },
        component({ row }) {
          console.log("🚀 ~ row?.type === 'label':", row?.type === 'label')
          if (row?.type === 'label') {
            return {
              result: null,
              type: 'doNotRenderComponent',
            };
          }
          // return null;
          return {
            type: 'renderComponent',
            result: ItemDescriptionCellComponent,
          };
        },
        key: crypto.randomUUID(),
        style: ({ data: row }) => {
          if (row?.type === 'label') {
            return {
              padding: '10px 5px 4px 5px',
              fontWeight: '700',
              fontSize: '12px',
            };
          }
          // style="padding: 10px 5px 4px 5px; font-weight: bold; font-size: 12px"
          return {
            padding: '8px 5px',
          };
        },
        colspan({ row }) {
          if (row?.type === 'label') {
            return 5;
          }
          return 1;
        },
        // skipRendering({ row }) {
        //   return row?.type === 'data';
        // },
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
        bodyCellContent: ({ row }) => {
          if (row?.type === 'data') {
            return row.quantity;
          }
          return null;
        },
        // component: TaxSummaryCellTemplateComponent,
        key: crypto.randomUUID(),
        style: ITEMS_TABLE_STYLES.tableBodyRowTdStyle,
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
        bodyCellContent: ({ row }) => {
          if (row?.type === 'data') {
            return row.unitPrice;
          }
          return null;
        },
        // component: TaxSummaryCellTemplateComponent,
        key: crypto.randomUUID(),
        style: ITEMS_TABLE_STYLES.tableBodyRowTdStyle,
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
        bodyCellContent: ({ row }) => {
          if (row?.type === 'data') {
            return row.vat;
          }
          return null;
        },
        // component: TaxSummaryCellTemplateComponent,
        key: crypto.randomUUID(),
        style: ITEMS_TABLE_STYLES.tableBodyRowTdStyle,
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
        bodyCellContent: ({ row }) => {
          if (row?.type === 'data') {
            return row.amount;
          }
          return null;
        },
        // component: TaxSummaryCellTemplateComponent,
        key: crypto.randomUUID(),
        style: ITEMS_TABLE_STYLES.tableBodyRowTdStyle,
      },
    },
  ];

// export const SAMPLE_ITEMS_TABLE_DATA: TTransactionInvoiceLineItem[] = []
