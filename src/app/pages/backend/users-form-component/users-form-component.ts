import { Component } from '@angular/core';
import { LoaderService } from '../../../services/loader-service';

@Component({
  selector: 'app-users-form-component',
  imports: [],
  templateUrl: './users-form-component.html',
  styleUrl: './users-form-component.scss',
})
export class UsersFormComponent {

  constructor(
    private loader: LoaderService
  ) {}

}
