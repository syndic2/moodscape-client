import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

//import { JwtHelperService } from '@auth0/angular-jwt';

import { from, BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { environment } from 'src/environments/environment.dev';

//const jwt_helper= new JwtHelperService();
const TOKEN_KEY= 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public authenticated: Observable<any>;
  private userData= new BehaviorSubject(null);
  private withGoogle: boolean= false;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private platform: Platform) {
    this.loadStoredToken();
  }

  getUser() {
    return this.userData.getValue();
  }

  loadStoredToken() {
    let platformObs= from(this.platform.ready());

    this.authenticated= platformObs.pipe(
      switchMap(() => from(this.storage.get(TOKEN_KEY))),
      map(token => {
        console.log('Token from storage', token);

        //if (this.withGoogle) return true;
        if (!token) return false;

        this.userData.next(token);

        //let decoded= jwt_helper.decodeToken(token);
//
        //console.log('decoded token', decoded);
        //this.userData.next(decoded);

        return true;
      })
    );
  }

  login(data, withGoogle:boolean= false): Observable<any> {
    let query= `
      mutation {
        login(emailOrUsername: "${data.emailOrUsername}", password: "${data.password}") {
          accessToken,
          response {
            text,
            status
          }
        }
      }
    `;
    const fetchAuth= () => this.http.post(environment.api_url, { query: query }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      responseType: 'json'
    }).pipe(
      map((res: any) => res.data.login),
      switchMap(async res => {
        await this.storage.set(TOKEN_KEY, res.accessToken);

        return res.response;
      })
    );

    //if (withGoogle) {
    //  this.withGoogle= true;
    //  this.userData.next(data);
//
    //  return fetchAuth();
    //}

    return fetchAuth();
  }

  logout() {
    this.userData.next(null);
    this.withGoogle= false;

    return from(this.storage.remove(TOKEN_KEY));
  }
}
