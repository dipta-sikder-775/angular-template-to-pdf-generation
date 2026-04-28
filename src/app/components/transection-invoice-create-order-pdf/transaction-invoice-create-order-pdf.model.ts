import { IBusinessLogoData } from './transaction-pdf-invoice-business-logo/transaction-pdf-invoice-business-logo.model';
import { IInvoiceSummaryData } from './transaction-pdf-invoice-summary/transaction-pdf-invoice-summary.model';

export interface TransactionInvoiceAddressDetails {
  name: string;
  address: string[];
}

export interface TransactionInvoiceLineItem {
  img?: string;
  description: string;
  sku?: string;
  quantity: number | string;
  unitPrice: string;
  vat: string;
  amount: string;
}

export interface TransactionInvoiceTaxSummaryRow {
  rate: string;
  goods: string;
  vatAmount: string;
  net: string;
  total: string;
}

export interface TransactionInvoiceInstalment {
  date: string;
  due: string;
  status: string;
}

export interface TransactionInvoiceBankDetails {
  accountName: string;
  accountNo: string;
  sortCode: string;
  bic: string;
  intermediaryBic: string;
  iban: string;
}

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
  supplier?: TransactionInvoiceAddressDetails | null | undefined;
  // 2-2. bill to details
  billTo?: TransactionInvoiceAddressDetails | null | undefined;
  // 2-3. delivery to details
  deliverTo?: TransactionInvoiceAddressDetails | null | undefined;

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

  stockType: string;
  items: TransactionInvoiceLineItem[];
  taxSummary: TransactionInvoiceTaxSummaryRow[];
  subtotal: string;
  totalVat: string;
  installments: TransactionInvoiceInstalment[];
  bank: TransactionInvoiceBankDetails;
  footerNote: string;
  totalAmount?: string | null | undefined;
}
