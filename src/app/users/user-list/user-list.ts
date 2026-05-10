import { Component, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../user-service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
  standalone: false,
})
export class UserList implements OnInit {
  users = signal<User[]>([]);
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users.set(users);
      this.cdr.detectChanges();
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users.update(u => u.filter(user => user.id !== id));
      this.cdr.detectChanges();
    });
  }
}