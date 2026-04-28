import { IBusinessLogoData } from './transaction-pdf-invoice-business-logo/transaction-pdf-invoice-business-logo.model';
import { IInvoiceSummaryData } from './transaction-pdf-invoice-summary/transaction-pdf-invoice-summary.model';

export interface ITransactionInvoiceAddressDetails {
  name: string;
  address: string[];
}

export interface ITransactionInvoiceLineItem {
  img?: string;
  description: string;
  sku?: string;
  quantity: number | string;
  unitPrice: string;
  vat: string;
  amount: string;
}

export interface ITransactionInvoiceTaxDetailsRow {
  rate: string | number | null | undefined;
  goods: string | number | null | undefined;
  vatAmount: string | number | null | undefined;
  net: string | number | null | undefined;
  total: string | number | null | undefined;
}

export interface ITransactionInvoiceInstalment {
  date: string;
  due: string;
  status: string;
}

export interface ITransactionInvoiceBankDetails {
  accountName: string;
  accountNo: string;
  sortCode: string;
  bic: string;
  intermediaryBic: string;
  iban: string;
}

export interface ITaxSummaryRow {
  label: string | number;
  value: string | number | null | undefined;
}

// export interface ITaxSummaryRow {
//   subtotal: string | null | undefined;
//   totalVat: string | null | undefined;
//   totalAmount?: string | null | undefined;
// }

export interface TransactionInvoiceCreateOrderPdfData {
  // row 1: Invoice basic info start
  //  1-1. Invoice Summary
  invoiceSummaryData?: IInvoiceSummaryData | null | undefined;
  // 1-2. Invoice qr code
  qrCodeUrl?: string | null | undefined;
  // 1-3. Invoice barcode
  barcodeUrl?: string | null | undefined;
  // 1-4. Business Logo
  businessLogoData?: IBusinessLogoData | null | undefined;
  // row 1: Invoice basic info end

  /* ----------------------------------------------------- */

  // 2-1. supplier details
  supplier?: ITransactionInvoiceAddressDetails | null | undefined;
  // 2-2. bill to details
  billTo?: ITransactionInvoiceAddressDetails | null | undefined;
  // 2-3. delivery to details
  deliverTo?: ITransactionInvoiceAddressDetails | null | undefined;

  /* ----------------------------------------------------- */

  // 3-1 order details
  orderDetails?:
    | {
        // orderType?: string | null | undefined;
        // totalAmount?: string | null | undefined;
        // totalAmountTaxInfo?: string | null | undefined;
        label: string | number;
        value: string | number | null | undefined;
        size: 'small' | 'medium' | 'large';
      }[]
    | null
    | undefined;

  // 5-1 tax details
  taxDetails?: ITransactionInvoiceTaxDetailsRow[] | null | undefined;

  // 5-2. tax summary
  taxSummary?: ITaxSummaryRow[] | null | undefined;
  // subtotal: string | number | null | undefined;
  // totalVat: string | number | null | undefined;
  // totalAmount?: string | number | null | undefined;

  stockType: string;
  items: ITransactionInvoiceLineItem[];
  // taxSummary: ITransactionInvoiceTaxSummaryRow[];
  installments: ITransactionInvoiceInstalment[];
  bank: ITransactionInvoiceBankDetails;
  footerNote: string;
}
