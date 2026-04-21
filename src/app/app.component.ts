import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { TransactionInvoiceCreateOrderPDF } from "./components/transection-invoice-create-order-pdf/transaction-invoice-create-order-pdf.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InvoiceComponent, TransactionInvoiceCreateOrderPDF],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
