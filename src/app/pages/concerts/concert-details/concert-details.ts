// import { Component } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ConcertService } from '../../../concert-service';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Concert } from '../../../models/concert';

// @Component({
//   selector: 'app-concert-details',
//   standalone: false,
//   templateUrl: './concert-details.html',
//   styleUrl: './concert-details.css',
// })
// export class ConcertDetails {
//   concert?: Concert;
//   quantity = 1;
//   isLoading = true;
//   isBuying = false;
 
//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private concertService: ConcertService,
//     private snackBar: MatSnackBar
//   ) {}
 
//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//     this.concertService.getConcertById(id).subscribe(c => {
//       this.concert = c;
//       this.isLoading = false;
//     });
//   }
 
//   get totalPrice(): number {
//     return this.concert ? this.concert.price * this.quantity : 0;
//   }
 
//   get occupancyPercent(): number {
//     if (!this.concert) return 0;
//     // return Math.round(((this.concert.totalTickets - this.concert.availableTickets) / this.concert.totalTickets) * 100);
//   }
 
//   // increment(): void { if (this.concert && this.quantity < Math.min(8, this.concert.availableTickets)) this.quantity++; }
//   decrement(): void { if (this.quantity > 1) this.quantity--; }
 
//   buy(): void {
//     if (!this.concert) return;
//     this.isBuying = true;
//     this.concertService.buyTicket(this.concert.id, this.quantity).subscribe(() => {
//       this.isBuying = false;
//       this.snackBar.open(`✅ ${this.quantity} ticket(s) acheté(s) !`, 'Voir mes tickets', { duration: 4000 })
//         .onAction().subscribe(() => this.router.navigate(['/tickets']));
//     });
//   }
// }
