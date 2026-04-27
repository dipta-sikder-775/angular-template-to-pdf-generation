import { NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  imports: [NgTemplateOutlet],
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

  /**
   * Resolves the key (handles key as a property name or a transformation function)
   */
  resolveKey(
    props: ICustomDynamicTableColumn<T>['body'] | undefined | null,
    row: T,
  ): TRenderableValue {
    // Early return if key is not defined, to avoid unnecessary processing and potential errors
    if (
      typeof props?.key !== 'string' &&
      typeof props?.key !== 'number' &&
      typeof props?.key !== 'symbol' &&
      typeof props?.key !== 'function'
    ) {
      return null;
    }

    if (typeof props?.key === 'function') {
      return props?.key?.(row);
    }

    if (
      typeof row === 'boolean' ||
      typeof row === 'string' ||
      typeof row === 'number'
    ) {
      return row;
    }

    switch (typeof row?.[props?.key]) {
      case 'string':
      case 'number':
      case 'symbol':
        return row?.[props?.key] as TRenderableValue;

      default:
        return null;
    }
  }

  /**
   * Handles TStyle (string vs Object) for [class] and [style]
   */
  resolveStyle(
    style: TStyle<T>,
    row: T | null | undefined,
    loopData: ILoopData,
  ): TStyle<T> {
    return typeof style === 'function' ? style(row, loopData) : style;
  }

  resolveBodyTemplate(
    props: ICellProps<T>['customTemplate'],
    row: T | null | undefined,
    data: T[] | null | undefined,
  ) {
    if (typeof props === 'function') {
      return props(row, data);
    }
    return props;
  }

  resolveBodyCellContent(
    props: ICellProps<T>['bodyCellContent'],
    row: T | null | undefined,
    data: T[] | null | undefined,
  ) {
    if (typeof props === 'function') {
      return props(row, data);
    }
    return props;
  }
}
