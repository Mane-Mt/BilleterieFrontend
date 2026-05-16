import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-transfer-dialog-component',
  standalone: false,
  templateUrl: './transfer-dialog-component.html',
  styleUrl: './transfer-dialog-component.css',
})
export class TransferDialogComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
 
  constructor(private dialogRef: MatDialogRef<TransferDialogComponent>) {}
 
  confirm(): void {
    if (this.emailControl.valid) {
      this.dialogRef.close(this.emailControl.value);
    } else {
      this.emailControl.markAsTouched();
    }
  }
 
  cancel(): void {
    this.dialogRef.close(null);
  }
}
 
