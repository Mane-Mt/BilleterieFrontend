import { Component, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { TicketService } from '../../../services/ticket-service'; // Adapte le chemin selon ton projet
import { Ticket } from '../../../models/ticket';


@Component({
  selector: 'app-admin-tickets',
  standalone: false,
  templateUrl: './admin-tickets.html',
  styleUrl: './admin-tickets.css',
})




export class AdminTickets implements OnInit {
  tickets = signal<Ticket[]>([]);
  
  private ticketService = inject(TicketService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets().subscribe((data: Ticket[]) => {
      this.tickets.set(data);
      this.cdr.detectChanges();
    });
  }

  // deleteTicket(id: number): void {
  //   this.ticketService.deleteTicket(id).subscribe(() => {
  //     // Met à jour le signal pour retirer le ticket annulé de la liste
  //     this.tickets.update(list => list.filter(ticket => ticket.id !== id));
  //     this.cdr.detectChanges();
  //   });
  // }
}