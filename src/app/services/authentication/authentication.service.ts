import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { JwtHelperService } from '@auth0/angular-jwt';

import { from, BehaviorSubject, Observable, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';

const jwt_helper= new JwtHelperService();
const TOKEN_KEY= 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user: Observable<any>;
  private userData= new BehaviorSubject(null);
  private via: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: Storage,
    private platform: Platform) {
    this.loadStoredToken();
  }

  back_endTest() {
    let query= `query {
      user {
        firstName,
        lastName
      }
    }`;

    return this.http.get(`http://localhost:5000/api/graphql?query=${query}`);
  }

  getUser() {
    return this.userData.getValue();
  }

  loadStoredToken() {
    let platformObs= from(this.platform.ready());

    this.user= platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY))
      }),
      map(token => {
        console.log('Token from storage', token);

        if (!token) return false;
        if (this.via === 'google') return true;

        let decoded= jwt_helper.decodeToken(token);

        console.log('decoded token', decoded);
        this.userData.next(decoded);

        return true;
      })
    );
  }

  login(data: { name, email, password, img_url }, via:string= ''): Observable<any> {
    const fetchAPI= () => this.http.get('https://randomuser.me/api').pipe(
      take(1),
      map(res => {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSW5kb21pZSBFbmFrISIsImVtYWlsIjoiaW5kb21pZWVuYWtAZ21haWwuY29tIiwiaW1nX3VybCI6Imh0dHBzOi8vdmlhLnBsYWNlaG9sZGVyLmNvbS8xNTAiLCJpYXQiOjE1MTYyMzkwMjJ9._MhHS2jwlB5eqVELPgCLQeeS9vcwWkXX7nx35jOYGCI'
      }),
      switchMap(token => {
        let storageObs= from(this.storage.set(TOKEN_KEY, token));

        return storageObs;
      })
    );

    if (via && via === 'google') {
      this.via= 'google';
      this.userData.next(data);

      return fetchAPI();
    }

    if (data.email !== 'indomie' || data.password !== 'enak') {
      return of(null);
    }

    return fetchAPI();
  }

  logout() {
    from(this.storage.remove(TOKEN_KEY));
    this.userData.next(null);
    this.via= '';
    this.router.navigate(['/']);
  }
}
