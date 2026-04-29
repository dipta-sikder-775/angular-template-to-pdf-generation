import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IBusinessLogoData } from './invoice-business-logo.model';

@Component({
  selector: 'invoice-business-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invoice-business-logo.component.html',
  styleUrl: './invoice-business-logo.component.scss',
})
export class InvoiceBusinessLogoComponent {
  // config = inject(Config);
  @Input({ required: true }) businessLogoData!: IBusinessLogoData;
  private readonly logoTimestamp = Date.now();

  get businessLogoUrl() {
    // original url ref: `https://cdn.yoicons.com/8832SVdev/business/10/images/icon/10.png?t=1775659733109`
    return `${'https://www.valt.one/assets/img/devices'}${this.businessLogoData.businessName}/${this.businessLogoData.businessId}/images/icon/${this.businessLogoData.businessId}.png?t=${this.logoTimestamp}`;
  }
}
