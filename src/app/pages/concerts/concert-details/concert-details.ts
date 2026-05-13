import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Concert } from '../../../models/concert';
import { ConcertService } from '../../../services/concert-service';

@Component({
  selector: 'app-concert-details',
  standalone: false,
  templateUrl: './concert-details.html',
  styleUrl: './concert-details.css',
})
export class ConcertDetails {
  concert?: Concert;
  
  readonly quantity = signal(1);
    readonly isLoading = signal(true);
    readonly isBuying = signal(false);
  private readonly concertService = inject(ConcertService)
    private route = inject(ActivatedRoute)

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.concertService.getConcertById(id).subscribe(c => {
        console.log(c);
      this.concert = c;
      this.isLoading.set(false);
      console.log(this.isLoading())
    });
  }
 
  get totalPrice(): number {
    return this.concert ? this.concert.price * this.quantity() : 0;
  }
 
  get occupancyPercent(): number {
    if (!this.concert) return 0;
    return Math.round(((this.concert.price - this.concert.price) / 1) * 100);
  }
 
  increment(): void { if (this.concert && this.quantity() < Math.min(8, this.concert.availableTickets)) this.quantity.update(q => q + 1);; }
  decrement(): void { if (this.quantity() > 1) this.quantity.update(q => q - 1); }
 
  buy(): void {
    if (!this.concert) return;
    this.isBuying.set(true);
    // this.concertService.buyTicket(this.concert.id, this.quantity()).subscribe(() => {
    //   this.isBuying = false;
    //   this.snackBar.open(`✅ ${this.quantity()} ticket(s) acheté(s) !`, 'Voir mes tickets', { duration: 4000 })
    //     .onAction().subscribe(() => this.router.navigate(['/tickets']));
    // });
  }
}
