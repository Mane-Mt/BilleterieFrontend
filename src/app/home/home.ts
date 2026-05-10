import { Component, inject, signal } from '@angular/core';
import { ConcertService } from '../concert-service';
import { Concert } from '../models/concert';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
   private readonly concertService = inject(ConcertService)
  protected readonly featuredConcerts = signal<Concert[]>([]);
 
  ngOnInit(){
    this.concertService.getConcerts().subscribe({
    next: (concerts) => {
      console.log("concerts received:", concerts);
      this.featuredConcerts.set(concerts);
    },
    error: (err) => {
      console.error("error fetching concerts:", err); 
    }
  })

   console.log(this.featuredConcerts());
  }

}
