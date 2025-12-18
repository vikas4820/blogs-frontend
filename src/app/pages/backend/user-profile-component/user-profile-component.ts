import { Component } from '@angular/core';
import { LoaderService } from '../../../services/loader-service';

@Component({
  selector: 'app-user-profile-component',
  imports: [],
  templateUrl: './user-profile-component.html',
  styleUrl: './user-profile-component.scss',
})
export class UserProfileComponent {

  constructor(
    private loader: LoaderService
  ) {}
}
