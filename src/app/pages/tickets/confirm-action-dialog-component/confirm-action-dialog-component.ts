import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmActionData {
  type: 'cancel' | 'refund';
  concertName: string;
  ticketRef: string;
  amount: number;
}

@Component({
  selector: 'app-confirm-action-dialog-component',
  standalone: false,
  templateUrl: './confirm-action-dialog-component.html',
  styleUrl: './confirm-action-dialog-component.css',
})


export class ConfirmActionDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmActionData
  ) {}

  get isCancel(): boolean { return this.data.type === 'cancel'; }
  get isRefund(): boolean { return this.data.type === 'refund'; }

  confirm(): void { this.dialogRef.close(true); }
  cancel(): void  { this.dialogRef.close(false); }
}