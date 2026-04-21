import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
    selector: "transaction-pdf-invoice-address-column",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./transaction-pdf-invoice-address-column.component.html",
    styleUrl: "./transaction-pdf-invoice-address-column.component.scss",
})
export class TransactionPDFInvoiceAddressColumn {
    @Input({ required: true }) title!: string | number;
    @Input({ required: false }) name?: string;
    @Input({ required: true }) description!: (string | number)[];
    @Input({ required: true }) isFirstItem!: boolean;
    @Input({ required: true }) isLastItem!: boolean;
}
