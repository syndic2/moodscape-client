import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { transformDateTime } from 'src/app/utilities/helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public clock;
  public user: User;
  private clockInterval;
  private getAuthenticatedUser: Subscription;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.clockInterval= setInterval(() => {
      this.clock= transformDateTime(new Date());
    }, 1000);
  }

  ionViewWillEnter() {
    this.getAuthenticatedUser= this.authService.getAuthenticatedUser().subscribe((res: User) => {
      this.user= res;
    });
  }

  ionViewWillLeave() {
    this.getAuthenticatedUser.unsubscribe();
    clearInterval(this.clockInterval);
  }
}
