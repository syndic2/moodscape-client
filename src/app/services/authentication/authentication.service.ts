import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

//import { JwtHelperService } from '@auth0/angular-jwt';

import { from, BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import StringifyObject from 'stringify-object';

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

        if (!token) return false;

        this.userData.next(token);

        return true;
      })
    );
  }

  login(data, withGoogle:boolean= false): Observable<any> {
    const args= StringifyObject(data, {
      singleQuotes: false,
      transform: (object, property, originalResult) => {
        if (property === 'age') return object[property] === '' ? 0 : originalResult;
        else return originalResult;
      }
    });
    const query= `
      mutation {
        login(
          emailOrUsername: "${withGoogle ? data.email : data.emailOrUsername}",
          password: "${data.password}",
          withGoogle: ${withGoogle ? args : "{}"}
        ) {
          accessToken,
          response {
            text,
            status
          }
        }
      }
    `;

    console.log(query);

    return this.http.post(environment.api_url, { query: query }, {
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
  }

  logout() {
    this.userData.next(null);
    this.withGoogle= false;

    return from(this.storage.remove(TOKEN_KEY));
  }
}
