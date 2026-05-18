import { Component, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../../../services/admin-service';
import { Concert } from '../../../models/concert';

// Les onglets possibles dans la section du bas
type ActiveTab = 'concerts' | 'users' | 'artists' | 'organizers' | 'tickets';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
  standalone: false,
})
export class AdminDashboard implements OnInit {

  private adminService = inject(AdminService);
  private cdr          = inject(ChangeDetectorRef);

  // Signaux de stats
  totalConcerts    = signal<number>(0);
  totalUsers       = signal<number>(0);
  totalOrganizers  = signal<number>(0);
  totalTickets     = signal<number>(0);
  totalArtists     = signal<number>(0);
  recentConcerts   = signal<Concert[]>([]);
  loading          = signal<boolean>(true);

  // Onglet actif dans la section du bas — concerts par défaut
  activeTab: ActiveTab = 'concerts';

  // Config des cards — évite de dupliquer dans le HTML
  cards: { tab: ActiveTab; emoji: string; label: string; signal: () => number }[] = [];

  ngOnInit(): void {
    // On initialise les cards ici car les signaux sont prêts
    this.cards = [
      { tab: 'concerts',    emoji: '🎵', label: 'Concerts',      signal: this.totalConcerts },
      { tab: 'users',       emoji: '👤', label: 'Utilisateurs',  signal: this.totalUsers },
      { tab: 'artists',     emoji: '🎤', label: 'Artistes',      signal: this.totalArtists },
      { tab: 'organizers',  emoji: '🎪', label: 'Organisateurs', signal: this.totalOrganizers },
      { tab: 'tickets',     emoji: '🎫', label: 'Tickets',       signal: this.totalTickets },
    ];

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

  }

  // Change l'onglet actif sans naviguer
  setTab(tab: ActiveTab): void {
    this.activeTab = tab;
  }

  // Titre dynamique de la section selon l'onglet actif
  get sectionTitle(): string {
    const map: Record<ActiveTab, string> = {
      concerts:    'Concerts',
      users:       'Utilisateurs',
      artists:     'Artistes',
      organizers:  'Organisateurs',
      tickets:     'Tickets',
    };
    return map[this.activeTab];
  }

  validateConcert(id: number): void {
    this.adminService.validateConcert(id).subscribe(() => this.loadData());
  }

  deleteConcert(id: number): void {
    this.adminService.deleteConcert(id).subscribe(() => {
      this.recentConcerts.update(c => c.filter(concert => concert.id !== id));
      this.cdr.detectChanges();
    });
  }
}