import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizerService, Organizer } from '../../../services/organizer-service';

@Component({
  selector: 'app-organizer-details',
  templateUrl: './organizer-details.html',
  styleUrl: './organizer-details.css',
  standalone: false,
})
export class OrganizerDetails implements OnInit {
  private organizerService = inject(OrganizerService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  organizer: Organizer | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.organizerService.getOrganizer(+id).subscribe((organizer: Organizer) => {
        this.organizer = organizer;
        this.cdr.detectChanges();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/organizers']);
  }

  goEdit(): void {
    this.router.navigate(['/organizers', this.organizer?.id, 'edit']);
  }
}