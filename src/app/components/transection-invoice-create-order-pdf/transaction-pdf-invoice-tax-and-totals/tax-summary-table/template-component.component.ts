import { Component, Input } from '@angular/core';
import { ILoopData } from '../../../../dynamic-custom-table/dynamic-custom-table.component.model';
import { ITaxSummaryRow } from '../../transaction-invoice-create-order-pdf.model';

@Component({
  standalone: true,
  selector: 'app-template-component',
  template: `
    <div
      style="display: flex; justify-content: space-between; margin: 0; padding: 0"
      [style.border-top]="loop?.isLastItem ? '1px solid #ccc' : 'none'"
    >
      <p
        style="padding: 5px 0; margin: 0; font-size: 13px; width: 50%"
        [style.font-weight]="loop?.isLastItem ? '700' : '400'"
        [style.padding-block]="loop?.isLastItem ? '10px' : ''"
      >
        {{ row?.label }}
      </p>
      <p
        style="padding: 5px 0; margin: 0; text-align: right; font-size: 13px; width: 50%"
        [style.font-weight]="loop?.isLastItem ? '700' : '400'"
        [style.padding-block]="loop?.isLastItem ? '10px' : ''"
      >
        {{ row?.value }}
      </p>
    </div>
  `,
})
export class TemplateComponent {
  // These names MUST match the keys in the 'inputs' object above
  @Input() row: ITaxSummaryRow | undefined;
  @Input() data: ITaxSummaryRow[] | undefined;
  @Input() loop: ILoopData | undefined;

  watchInputs() {
    console.log('Row data:', this.row);
    console.log('Loop data:', this.loop);
  }
}
