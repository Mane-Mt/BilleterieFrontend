import { Component, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../admin-service';
import { Concert } from '../../../models/concert';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
  standalone: false,
})
export class AdminDashboard implements OnInit {
  private adminService = inject(AdminService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  totalConcerts = signal<number>(0);
  totalUsers = signal<number>(0);
  totalOrganizers = signal<number>(0);
  totalTickets = signal<number>(0);
  totalArtists = signal<number>(0);
  recentConcerts = signal<Concert[]>([]);
  loading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading.set(true);

    this.adminService.getStats().subscribe((stats) => {
      this.totalConcerts.set(stats.totalConcerts);
      this.totalUsers.set(stats.totalUsers);
      this.totalOrganizers.set(stats.totalOrganizers);
      this.totalTickets.set(stats.totalTickets);
      this.totalArtists.set(stats.totalArtists);
      this.loading.set(false);
      this.cdr.detectChanges();
    });

    this.adminService.getConcerts().subscribe((concerts: Concert[]) => {
      this.recentConcerts.set(concerts);
      this.cdr.detectChanges();
    });
  }

  validateConcert(id: number): void {
    this.adminService.validateConcert(id).subscribe(() => {
      this.loadData();
    });
  }

  deleteConcert(id: number): void {
    this.adminService.deleteConcert(id).subscribe(() => {
      this.recentConcerts.update(c => c.filter(concert => concert.id !== id));
      this.cdr.detectChanges();
    });
  }
}