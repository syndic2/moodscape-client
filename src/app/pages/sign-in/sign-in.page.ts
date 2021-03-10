import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Plugins } from '@capacitor/core';
import '@codetrix-studio/capacitor-google-auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.router.navigate(['/main']);
  }

  async onGoogleSignIn() {
    //const user= await Plugins.GoogleAuth.signIn();
    this.router.navigate(['/main']);
  }
}
