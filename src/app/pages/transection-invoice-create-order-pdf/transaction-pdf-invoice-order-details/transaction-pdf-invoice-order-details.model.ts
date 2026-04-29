export interface IOrderDetailsItem {
  // orderType?: string | null | undefined;
  // totalAmount?: string | null | undefined;
  // totalAmountTaxInfo?: string | null | undefined;
  label: string | number;
  value: string | number | null | undefined;
  size: 'small' | 'medium' | 'large';
}
