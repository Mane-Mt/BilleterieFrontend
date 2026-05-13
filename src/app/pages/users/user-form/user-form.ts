import { Component, OnInit, inject, signal, ChangeDetectorRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user-service';


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

 submit(): void {
  if (this.isEditMode && this.userId) {
    const user = new User(this.firstname, this.lastname, this.email, this.phone, this.userId);
    this.userService.updateUser(this.userId, user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  } else {
    const user = new User(this.firstname, this.lastname, this.email, this.phone);
    this.userService.createUser(user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }
}
  cancel(): void {
    this.router.navigate(['/users']);
  }
}
