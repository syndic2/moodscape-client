import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public user= {};

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user= this.authService.getUser();
  }

  onUpdate(data) {
    alert('update');
  }
}
