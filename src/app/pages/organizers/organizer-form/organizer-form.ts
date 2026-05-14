import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizerService, Organizer } from '../../../organizer-service';

@Component({
  selector: 'app-organizer-form',
  templateUrl: './organizer-form.html',
  styleUrl: './organizer-form.css',
  standalone: false,
})
export class OrganizerForm implements OnInit {
  private organizerService = inject(OrganizerService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  isEditMode = false;
  organizerId: number | null = null;

  firstname = '';
  lastname = '';
  email = '';
  phone = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.organizerId = +id;
      this.organizerService.getOrganizer(this.organizerId).subscribe((organizer: Organizer) => {
        this.firstname = organizer.firstname;
        this.lastname = organizer.lastname;
        this.email = organizer.email;
        this.phone = organizer.phone;
        this.cdr.detectChanges();
      });
    }
  }

  isValidEmail(): boolean {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return emailRegex.test(this.email);
  }

  isValidPhone(): boolean {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(this.phone);
  }

  submit(): void {
    if (this.email && !this.isValidEmail()) {
      alert('Email invalide !');
      return;
    }
    if (this.phone && !this.isValidPhone()) {
      alert('Téléphone invalide — 10 chiffres requis !');
      return;
    }

    const organizer = new Organizer();
    organizer.firstname = this.firstname;
    organizer.lastname = this.lastname;
    organizer.email = this.email;
    organizer.phone = this.phone;

    if (this.isEditMode && this.organizerId) {
      organizer.id = this.organizerId;
      this.organizerService.updateOrganizer(this.organizerId, organizer).subscribe(() => {
        this.router.navigate(['/organizers']);
      });
    } else {
      this.organizerService.createOrganizer(organizer).subscribe(() => {
        this.router.navigate(['/organizers']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/organizers']);
  }
}