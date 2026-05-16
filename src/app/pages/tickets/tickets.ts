import { Component, inject, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransferDialogComponent } from './transfer-dialog-component/transfer-dialog-component';
import { ConfirmActionDialogComponent } from './confirm-action-dialog-component/confirm-action-dialog-component';
import { Ticket } from '../../models/ticket';
import { TicketService } from '../../services/ticket-service';

@Component({
  selector: 'app-tickets',
  standalone: false,
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets {
  /* --- Services --- */
  private readonly ticketService = inject(TicketService);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  /* --- États (Signals) --- */
  readonly view = signal<'lookup' | 'results'>('lookup');
  readonly isSearching = signal(false);
  readonly tickets = signal<Ticket[]>([]);
  readonly currentEmail = signal('');

  readonly emailControl = new FormControl('', [Validators.required, Validators.email]);

  /* ---------- Email lookup ---------- */
  searchTickets(): void {
    this.emailControl.markAsTouched();
    if (this.emailControl.invalid) return;

    this.isSearching.set(true);
    const emailToSearch = this.emailControl.value!;
    this.currentEmail.set(emailToSearch);

    this.ticketService.getTicketsByEmail(emailToSearch).subscribe(t => {
      console.log()
      this.tickets.set(t);
      this.isSearching.set(false);
      this.view.set('results');
    });
  }

  changeEmail(): void {
    this.view.set('lookup');
    this.tickets.set([]);
    this.currentEmail.set('');
    this.emailControl.reset();
  }

  /* ---------- Transfert ---------- */
  openTransfer(ticket: Ticket): void {
    const ref = this.dialog.open(TransferDialogComponent, {
      width: '460px',
      panelClass: 'stagely-dialog'
    });
    ref.afterClosed().subscribe((toEmail: string | null) => {
      if (!toEmail) return;
      this.ticketService.transferTicket(ticket.id, toEmail).subscribe(() => {
        this.snackBar.open(`✅ Ticket transféré à ${toEmail}`, 'OK', { duration: 4000 });
        this.searchTickets();
      });
    });
  }

  /* ---------- Annulation ---------- */
  openCancel(ticket: Ticket): void {
    const ref = this.dialog.open(ConfirmActionDialogComponent, {
      width: '460px',
      panelClass: 'stagely-dialog',
      data: {
        type: 'cancel',
        concertName: ticket.concert.name,
        ticketRef: ticket.reference,
        amount: ticket.totalPrice
      }
    });
    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;
      this.ticketService.cancelTicket(ticket.id).subscribe(() => {
        this.snackBar.open('Ticket annulé', 'OK', { duration: 3000 });
        this.searchTickets();
      });
    });
  }

  /* ---------- Remboursement ---------- */
  openRefund(ticket: Ticket): void {
    const ref = this.dialog.open(ConfirmActionDialogComponent, {
      width: '460px',
      panelClass: 'stagely-dialog',
      data: {
        type: 'refund',
        concertName: ticket.concert.name,
        ticketRef: ticket.reference,
        amount: ticket.totalPrice
      }
    });
    ref.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;
      this.ticketService.refundTicket(ticket.id).subscribe(() => {
        this.snackBar.open('Demande de remboursement envoyée', 'OK', { duration: 4000 });
        this.searchTickets();
      });
    });
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      confirmed: 'Confirmé',
      pending:   'En attente',
      cancelled: 'Annulé'
    };
    return map[status] || status;
  }
}