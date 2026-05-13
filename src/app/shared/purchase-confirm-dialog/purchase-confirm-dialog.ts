import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ticket } from '../../models/ticket';
 
export interface PurchaseConfirmData {
  ticket: Ticket;
  email: string;
}

@Component({
  selector: 'app-purchase-confirm-dialog',
  standalone: false,
  templateUrl: './purchase-confirm-dialog.html',
  styleUrl: './purchase-confirm-dialog.css',
})
export class PurchaseConfirmDialog {
  constructor(
    private dialogRef: MatDialogRef<PurchaseConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PurchaseConfirmData
  ) {}
 
  goToTickets(): void { this.dialogRef.close('tickets'); }
  close(): void        { this.dialogRef.close('home'); }
}
