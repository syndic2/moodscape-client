import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Plugins } from '@capacitor/core';
import '@codetrix-studio/capacitor-google-auth';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigate(['/side-menu']);
  }

  async onGoogleSignIn() {
    const user= await Plugins.GoogleAuth.signIn();

    this.authService.setAuth(user);
    this.router.navigate(['/side-menu']);
  }
}
