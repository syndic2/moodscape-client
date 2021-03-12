import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public auth: Object;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.auth= this.authService.getAuth();
  }

  onUpdate() {
    alert('update');
  }
}
