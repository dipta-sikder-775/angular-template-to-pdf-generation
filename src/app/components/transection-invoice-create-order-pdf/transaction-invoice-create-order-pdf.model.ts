import { IBusinessLogoData } from './transaction-pdf-invoice-business-logo/transaction-pdf-invoice-business-logo.model';

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
  invNo: string;
  accountNo: string;
  issueDate: string;
  deliveryDate: string;
  vatNumber: string;
  qrCodeUrl: string;
  barcodeUrl: string;
  orderType: string;
  businessLogoData: IBusinessLogoData;
  stockType: string;
  supplier: TransactionInvoiceAddressDetails;
  billTo: TransactionInvoiceAddressDetails;
  deliverTo: TransactionInvoiceAddressDetails;
  items: TransactionInvoiceLineItem[];
  taxSummary: TransactionInvoiceTaxSummaryRow[];
  subtotal: string;
  totalVat: string;
  totalAmount: string;
  installments: TransactionInvoiceInstalment[];
  bank: TransactionInvoiceBankDetails;
  footerNote: string;
}
