import { Component, Inject, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from '../../../models/concert';
import { ConcertService } from '../../../services/concert-service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TicketCreate } from '../../../models/ticket';
import { TicketService } from '../../../services/ticket-service';
import { PurchaseConfirmDialog } from '../../../shared/purchase-confirm-dialog/purchase-confirm-dialog';

@Component({
  selector: 'app-concert-details',
  standalone: false,
  templateUrl: './concert-details.html',
  styleUrl: './concert-details.css',
})
export class ConcertDetails {
    protected readonly concert = signal<Concert>(new Concert());

    readonly quantity = signal(1);
    readonly isLoading = signal(true);
    readonly isBuying = signal(false);
    emailControl = new FormControl('', [Validators.required, Validators.email]);

    private readonly concertService = inject(ConcertService)
    private readonly ticketService = inject(TicketService)
    private route = inject(ActivatedRoute)
    private router =  inject(Router)
    private readonly matDialog = inject(MatDialog)
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.concertService.getConcertById(id).subscribe(c => {
        console.log(c);
      this.concert.set(c);
      this.isLoading.set(false);
      console.log(this.isLoading())
    });
  }
 
  get totalPrice(): number {
    return this.concert ? this.concert().price * this.quantity() : 0;
  }
 
  get occupancyPercent(): number {
    if (!this.concert) return 0;
    return Math.round(((this.concert().placeNumber - this.concert().availableTickets) / this.concert().placeNumber) * 100);
  }
 
  increment(): void { if (this.concert && this.quantity() < Math.min(8, this.concert().availableTickets)) this.quantity.update(q => q + 1);; }
  decrement(): void { if (this.quantity() > 1) this.quantity.update(q => q - 1); }
 
  buy(): void {
    this.emailControl.markAsTouched();
    if (!this.concert || this.emailControl.invalid) return;
    
    console.log(this.concert().id)
    console.log(this.quantity())
    console.log(this.emailControl.value!)
    
  
    this.isBuying.set(true);
    const newTicket =  new TicketCreate(this.concert().id ,this.quantity() , this.emailControl.value!)
 
    this.ticketService
      .buyTicket(newTicket)
      .subscribe(ticket => { 
        console.log(ticket);
        this.concert.set(ticket.concert)
        const ref = this.matDialog.open(PurchaseConfirmDialog, {
          data: { ticket, email: this.emailControl.value },
          width: '480px',
          disableClose: true,
          panelClass: 'stagely-dialog'
        });
        ref.afterClosed().subscribe((result: string) => {
          if (result === 'tickets') {
            this.router.navigate(['/tickets']);
          }else{
            this.router.navigate(['']);
          }
          
        });
      });
  }
}
