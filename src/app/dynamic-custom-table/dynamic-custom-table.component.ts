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
  resolveHeaderCellContent(
    props: ICustomDynamicTableColumn<T>['header'] | undefined | null,
    currentData: T[] | null | undefined,
    loopData: ILoopData,
  ): TRenderableValue {
    // Early return if props?.headerCellContent is not defined, to avoid unnecessary processing and potential errors
    if (
      typeof props?.headerCellContent === 'undefined' ||
      props?.headerCellContent === null
    ) {
      return null;
    }

    if (typeof props?.headerCellContent === 'function') {
      return props.headerCellContent?.(currentData, loopData);
    }

    return props?.headerCellContent;
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
  resolveStyle(
    style: TStyle<T>,
    row: T | null | undefined,
    loopData: ILoopData,
  ): TStyle<T> {
    console.log('style compute');
    return typeof style === 'function' ? style(row, loopData) : style;
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

  private isComponentClass(type: any): boolean {
    // Simple check to see if it's a constructor (Class) vs a plain function
    return typeof type === 'function' && /^\s*class\s+/.test(type.toString());
  }

  getComponent(componentProp: any, row: T): Type<any> | null {
    if (!componentProp) return null;

    // If it's a function but NOT a class (arrow function/callback)
    if (
      typeof componentProp === 'function' &&
      !this.isComponentClass(componentProp)
    ) {
      return componentProp(row, this.data);
    }

    // It's a direct Component Class
    return componentProp;
  }

  resolveBodyCellContent(
    props: ICellProps<T>['bodyCellContent'],
    row: T | null | undefined,
    data: T[] | null | undefined,
    loopData: ILoopData,
  ) {
    if (typeof props === 'function') {
      return props(row, data, loopData);
    }
    return props;
  }
}
