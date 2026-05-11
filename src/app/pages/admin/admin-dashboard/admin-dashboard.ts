import { Component, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../admin-service';

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

  ngOnInit(): void {
    this.adminService.getConcerts().subscribe(concerts => {
      this.totalConcerts.set(concerts.length);
      this.cdr.detectChanges();
    });

    this.adminService.getUsers().subscribe(users => {
      this.totalUsers.set(users.length);
      this.cdr.detectChanges();
    });

    this.adminService.getOrganizers().subscribe(organizers => {
      this.totalOrganizers.set(organizers.length);
      this.cdr.detectChanges();
    });

    this.adminService.getTickets().subscribe((tickets: any[]) => {
      this.totalTickets.set(tickets.length);
      this.cdr.detectChanges();
    });
  }

  goToConcerts(): void {
    this.router.navigate(['/admin/concerts']);
  }
}