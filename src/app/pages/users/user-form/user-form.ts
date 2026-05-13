import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user-service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
  standalone: false,
})
export class UserForm implements OnInit {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  isEditMode = false;
  userId: number | null = null;

  firstname = '';
  lastname = '';
  email = '';
  phone = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userId = +id;
      this.userService.getUser(this.userId).subscribe((user: User) => {
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.phone = user.phone;
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

    const user = new User(this.firstname, this.lastname, this.email, this.phone);
    if (this.isEditMode && this.userId) {
      user.id = this.userId;
      this.userService.updateUser(this.userId, user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.createUser(user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}