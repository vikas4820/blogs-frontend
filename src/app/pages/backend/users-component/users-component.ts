import { ChangeDetectorRef, Component } from '@angular/core';
import { UsersService } from './../../../services/users-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoaderService } from '../../../services/loader-service';

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
    private loader: LoaderService,
  ) {}

  async ngOnInit() {
    try {
      this.loader.show();
      await this.loadUsers();
      this.cdr.detectChanges();
    } catch (error) {
      
    } finally {
      this.loader.hide();
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
