import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user-service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
  standalone: false,
})
export class UserDetails implements OnInit {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  user: User | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUser(+id).subscribe((user: User) => {
        this.user = user;
        this.cdr.detectChanges();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }

  goEdit(): void {
    this.router.navigate(['/users', this.user?.id, 'edit']);
  }
}