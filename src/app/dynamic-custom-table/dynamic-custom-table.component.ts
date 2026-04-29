import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, Input, Type } from '@angular/core';
import {
  ICellProps,
  ICustomDynamicTableColumn,
  ILoopData,
  TGenericExtends,
  TRenderableValue,
  TSimpleStyle,
  TStyle,
} from './dynamic-custom-table.component.model';

@Component({
  selector: 'dynamic-custom-table',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule],
  templateUrl: './dynamic-custom-table.component.html',
})
export class DynamicCustomTableComponent<T extends TGenericExtends> {
  @Input() data: T[] = [];
  @Input() columns: ICustomDynamicTableColumn<T>[] = [];
  @Input() tableClass: TSimpleStyle;
  @Input() tableStyle: TSimpleStyle;
  @Input() tableHeadClass: TSimpleStyle;
  @Input() tableHeadStyle: TSimpleStyle;
  @Input() tableHeadRowClass: TSimpleStyle;
  @Input() tableHeadRowStyle: TSimpleStyle;
  @Input() tableBodyClass: TSimpleStyle;
  @Input() tableBodyStyle: TSimpleStyle;
  @Input() tableBodyRowClass: TSimpleStyle;
  @Input() tableBodyRowStyle: TSimpleStyle;
  @Input() dataRowKey:
    | ((row: T | null | undefined) => string | number | null | undefined)
    | undefined;

  ensureArray<T>(value: unknown): T[] {
    if (value === null || value === undefined) {
      return [];
    }
    if (!Array.isArray(value)) {
      return [];
    }

    return value as T[];
  }

  get tableData() {
    return this.ensureArray<T>(this.data);
  }

  get tableColumn() {
    return this.ensureArray<ICustomDynamicTableColumn<T>>(this.columns);
  }

  // Resolves the 'content' for headers (handles string or function)
  resolveHeaderCellContent({
    currentData,
    loopData,
    header,
  }: {
    header: ICustomDynamicTableColumn<T>['header'] | undefined | null;
    currentData: T[] | null | undefined;
    loopData: ILoopData;
  }): TRenderableValue {
    // Early return if props?.headerCellContent is not defined, to avoid unnecessary processing and potential errors
    if (
      typeof header?.headerCellContent === 'undefined' ||
      header?.headerCellContent === null
    ) {
      return null;
    }

    if (typeof header?.headerCellContent === 'function') {
      return header.headerCellContent?.({
        data: currentData,
        loopData,
      });
    }

    return header?.headerCellContent;
  }

  resolveRowKey(row: unknown) {
    if (typeof row === 'undefined' || row === null) {
      return crypto.randomUUID();
    }

    if (row && typeof row === 'object') {
      if (typeof this.dataRowKey === 'function') {
        const result = this.dataRowKey(row as unknown as T | null | undefined);
        if (result !== undefined && result !== null) {
          return result;
        }
      } else if ('id' in row) {
        return row.id;
      } else if ('_id' in row) {
        return row._id;
      }

      return crypto.randomUUID();
    }

    if (
      typeof row === 'string' ||
      typeof row === 'number' ||
      typeof row === 'boolean'
    ) {
      return row;
    }

    return crypto.randomUUID();
  }

  /**
   * Handles TStyle (string vs Object) for [class] and [style]
   */
  resolveStyle({
    loopData,
    row,
    style,
  }: {
    style: TStyle<T>;
    row: T | null | undefined;
    loopData: ILoopData;
  }): TStyle<T> {
    return typeof style === 'function'
      ? style({
          data: row,
          loopData,
        })
      : style;
  }

  // resolveBodyTemplate(
  //   props: ICellProps<T>['customTemplate'],
  //   row: T | null | undefined,
  //   data: T[] | null | undefined,
  // ) {
  //   if (typeof props === 'function') {
  //     return props(row, data);
  //   }
  //   return props;
  // }

  // private isComponentClass(type: unknown): boolean {
  //   // Simple check to see if it's a constructor (Class) vs a plain function
  //   return typeof type === 'function' && /^\s*class\s+/.test(type.toString());
  // }

  getComponent(
    componentProp: ICellProps<T>['component'],
    row: T | null | undefined,
  ): Type<any> | null {
    if (!componentProp) {
      return null;
    }

    if (typeof componentProp === 'function') {
      const res: {
        result: Type<any> | null | undefined;
        type: 'renderComponent' | 'doNotRenderComponent';
      } = (componentProp as any)?.({
        row,
        data: this.data,
      });
      if (res?.type === 'renderComponent') {
        return res.result ?? null;
      }
      return null;
    }
    return null;
  }

  resolveBodyCellContent({
    data,
    loopData,
    bodyCellContent,
    row,
  }: {
    bodyCellContent: ICellProps<T>['bodyCellContent'];
    row: T | null | undefined;
    data: T[] | null | undefined;
    loopData: ILoopData;
  }) {
    if (typeof bodyCellContent === 'function') {
      return bodyCellContent({
        data,
        row,
        loopData,
      });
    }
    return bodyCellContent;
  }

  resolveSkipRendering(props: {
    skipRendering: ICellProps<T>['skipRendering'];
    row: T | null | undefined;
    data: T[] | null | undefined;
    rowLoopData: ILoopData;
    colLoopData: ILoopData;
  }): boolean {
    if (typeof props.skipRendering === 'function') {
      return props.skipRendering({
        row: props.row,
        data: props.data,
        rowLoopData: props.rowLoopData,
        columnLoopData: props.colLoopData,
      });
    }
    return !!props.skipRendering;
  }

  resolveRowOrColSpan(props: {
    span: ICellProps<T>['rowspan'] | ICellProps<T>['colspan'];
    row: T | null | undefined;
    data: T[] | null | undefined;
    rowLoopData: ILoopData;
    colLoopData: ILoopData;
  }): number | undefined {
    if (typeof props.span === 'function') {
      return props.span({
        row: props.row,
        data: props.data,
        rowLoopData: props.rowLoopData,
        columnLoopData: props.colLoopData,
      });
    }

    return props.span;
  }
}
