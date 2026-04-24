export interface IInvoiceInfoItem {
  label: string | number;
  value: string | number;
}

export interface IInvoiceSummaryData {
  title: string | number | null | undefined;
  data: IInvoiceInfoItem[] | null | undefined;
}
