import { Component, inject, Inject, signal } from '@angular/core';
import { Concert } from '../../../models/concert';
import { ConcertService } from '../../../services/concert-service';
@Component({
  selector: 'app-concert-list',
  standalone: false,
  templateUrl: './concert-list.html',
  styleUrl: './concert-list.css',
})
export class ConcertList {
  private readonly concertService = inject(ConcertService)
  protected readonly concerts = signal<Concert[]>([]);
 isLoading = false;

  ngOnInit(){
     this.isLoading = true;
    this.concertService.getConcerts().subscribe({
    next: (concerts) => {
      console.log("concerts received:", concerts);
      this.concerts.set(concerts);
      this.isLoading = false;
    },
    error: (err) => {
      console.error("error fetching concerts:", err); 
    }
  })

   console.log(this.concerts());
  }


}
