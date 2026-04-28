import { TemplateRef, Type } from '@angular/core';
export type TRenderableValue = string | number | boolean | null | undefined;
export type TGenericExtends =
  | Record<PropertyKey, any>
  | null
  | undefined
  | string
  | number
  | boolean;
export interface ILoopData {
  index: number;
  count: number;
  isFirstItem: boolean;
  isLastItem: boolean;
  isEven: boolean;
  isOdd: boolean;
}
export type TSimpleStyle = string | Partial<CSSStyleDeclaration> | undefined;
export type TStyle<T> =
  | TSimpleStyle
  | ((
      data: T | null | undefined,
      loopData: ILoopData,
    ) => string | Partial<CSSStyleDeclaration>);

export interface ICellProps<T extends TGenericExtends> {
  headerCellContent:
    | TRenderableValue
    | ((data: T[] | null | undefined, loopData: ILoopData) => TRenderableValue);

  /**
   * The content to be rendered inside the cell. Can be a static value or a function that returns a value based on the row data and loop context. If a function is provided, it will be called with the current row data and the entire dataset, allowing for dynamic content generation based on the specific row or overall data context.
   */
  bodyCellContent:
    | TRenderableValue
    | ((
        row: T | null | undefined,
        data: T[] | null | undefined,
      ) => TRenderableValue);
  /**
   * Allows for a custom template to be used for the cell instead of the default text rendering. Can be a static TemplateRef or a function that returns a TemplateRef based on the row data and loop context.
   */
  customTemplate?:
    | ((
        row: T | null | undefined,
        data: T[] | null | undefined,
      ) => TemplateRef<any>)
    | TemplateRef<any>
    | null
    | undefined;
  component?:
    | Type<any>
    | ((row: T | null | undefined, data: T[] | null | undefined) => Type<any>);
  /**
   * The key to used for tracking unique content
   */
  key: string | number | ((row: T | null | undefined) => TRenderableValue);
  style?: TStyle<T>;
  class?: TStyle<T>;
  colspan?: number;
  rowspan?: number;
}

export interface ICustomDynamicTableColumn<T extends TGenericExtends> {
  header?: Omit<ICellProps<T>, 'bodyCellContent'>;
  body: Omit<ICellProps<T>, 'headerCellContent'>;
}
