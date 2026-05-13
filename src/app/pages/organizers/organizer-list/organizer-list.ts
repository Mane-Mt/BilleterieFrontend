import { Component, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { OrganizerService, Organizer } from '../../../organizer-service';

@Component({
  selector: 'app-organizer-list',
  templateUrl: './organizer-list.html',
  styleUrl: './organizer-list.css',
  standalone: false,
})
export class OrganizerList implements OnInit {
  organizers = signal<Organizer[]>([]);
  private organizerService = inject(OrganizerService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.organizerService.getOrganizers().subscribe((organizers: Organizer[]) => {
      this.organizers.set(organizers);
      this.cdr.detectChanges();
    });
  }

  deleteOrganizer(id: number): void {
    this.organizerService.deleteOrganizer(id).subscribe(() => {
      this.organizers.update(o => o.filter(org => org.id !== id));
      this.cdr.detectChanges();
    });
  }
}