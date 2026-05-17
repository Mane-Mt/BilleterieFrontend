import { Component, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../../services/admin-service';
import { Concert } from '../../../models/concert';

@Component({
  selector: 'app-admin-concerts',
  templateUrl: './admin-concerts.html',
  styleUrl: './admin-concerts.css',
  standalone: false,
})
export class AdminConcerts implements OnInit {
  private adminService = inject(AdminService);
  private cdr = inject(ChangeDetectorRef);

  concerts = signal<Concert[]>([]);

  ngOnInit(): void {
    this.loadConcerts();
  }

  loadConcerts(): void {
    this.adminService.getConcerts().subscribe((concerts: Concert[]) => {
      this.concerts.set(concerts);
      this.cdr.detectChanges();
    });
  }

  validateConcert(id: number): void {
    this.adminService.validateConcert(id).subscribe(() => {
      this.loadConcerts();
    });
  }

  deleteConcert(id: number): void {
    this.adminService.deleteConcert(id).subscribe(() => {
      this.concerts.update(c => c.filter(concert => concert.id !== id));
      this.cdr.detectChanges();
    });
  }
}