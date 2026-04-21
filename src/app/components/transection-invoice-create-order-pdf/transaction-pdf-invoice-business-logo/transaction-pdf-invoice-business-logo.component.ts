import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { IBusinessLogoData } from './transaction-pdf-invoice-business-logo.model';

@Component({
    selector: 'transaction-pdf-invoice-business-logo',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './transaction-pdf-invoice-business-logo.component.html',
    styleUrl: './transaction-pdf-invoice-business-logo.component.scss',
})
export class TransactionPDFInvoiceBusinessLogo {
    // config = inject(Config);
    @Input({ required: true }) businessLogoData!: IBusinessLogoData;
    private readonly logoTimestamp = Date.now();

    get businessLogoUrl() {
        // original url ref: `https://cdn.yoicons.com/8832SVdev/business/10/images/icon/10.png?t=1775659733109`
        return `${"https://www.valt.one/assets/img/devices"}${this.businessLogoData.businessName}/${this.businessLogoData.businessId}/images/icon/${this.businessLogoData.businessId}.png?t=${this.logoTimestamp}`;
    }
}
