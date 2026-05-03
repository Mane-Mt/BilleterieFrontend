import { Component, inject, Inject, signal } from '@angular/core';
import { ConcertService } from '../../concert-service';
import { Concert } from '../../models/concert';

@Component({
  selector: 'app-concert-list',
  standalone: false,
  templateUrl: './concert-list.html',
  styleUrl: './concert-list.css',
})
export class ConcertList {
  private readonly concertService = inject(ConcertService)
  protected readonly concerts = signal<Concert[]>([]);
 
  ngOnInit(){
    this.concertService.getConcerts().subscribe({
    next: (concerts) => {
      console.log("concerts received:", concerts);
      this.concerts.set(concerts);
    },
    error: (err) => {
      console.error("error fetching concerts:", err); 
    }
  })

   console.log(this.concerts());
  }


}
