import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private auth: Object;

  constructor() { }

  getAuth() {
    return this.auth;
  }

  setAuth(user) {
    this.auth= {
      id: user.id,
      name: user.name,
      email: user.email,
      img_url: user.imageUrl
    };
  }
}
