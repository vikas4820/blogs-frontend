import { ChangeDetectorRef, Component } from '@angular/core';
import { UsersService } from './../../../services/users-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-component',
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './users-component.html',
  styleUrl: './users-component.scss',
})
export class UsersComponent {

  users: any[] = [];
  constructor(
    private cdr: ChangeDetectorRef,
    private usersService: UsersService,
  ) {}

  async ngOnInit() {
    try {
      await this.loadUsers();
      this.cdr.detectChanges();
    } catch (error) {
      
    }
  }

  async loadUsers() {
    try {
      const users = await this.usersService.findAll().toPromise();
      this.users = users?? [];
    } catch (error) {
      
    }
  }

  async deleteUser(id: number) {
    try {
      
    } catch (error) {
      
    }
  }

}
