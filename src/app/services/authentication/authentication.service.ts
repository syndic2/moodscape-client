import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

//import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import StringifyObject from 'stringify-object';

import { environment } from 'src/environments/environment';

//const jwt_helper= new JwtHelperService();
const TOKEN_KEY= 'auth-token';
const REFRESH_TOKEN_KEY= 'auth-refresh-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public authenticate: Observable<any>;
  public finishRefreshToken: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  private userData: BehaviorSubject<string>= new BehaviorSubject(null);
  private httpOptions: any= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    responseType: 'json'
  };

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

    this.authenticate= platformObs.pipe(
      switchMap(() => from(this.storage.get(TOKEN_KEY))),
      map(token => {
        console.log('token from storage', token);

        if (!token) {
          return false;
        } else {
          this.userData.next(token);
          return true;
        }
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
          refreshToken,
          response {
            text,
            status
          }
        }
      }
    `;

    console.log(query);

    return this.http.post(`${environment.api_url}/auth`, { query: query }, this.httpOptions).pipe(
      map((res: any) => res.data.login),
      switchMap((res: any) => {
        return from(Promise.all([
          res.response,
          this.storage.set(TOKEN_KEY, res.accessToken), 
          this.storage.set(REFRESH_TOKEN_KEY, res.refreshToken)
        ]))
      })
    );
  }

  refreshToken(): Observable<any> {
    return from(this.storage.get(REFRESH_TOKEN_KEY)).pipe(
      switchMap(refreshToken => {
        const query= `
          mutation {
            refreshAuth(refreshToken: "${refreshToken}") {
              newToken
            }
          }
        `;

        return this.http.post(`${environment.api_url}/auth`, { query: query }, this.httpOptions).pipe(
          map((res: any) => res.data.refreshAuth.newToken),
          switchMap(newToken => {
            this.userData.next(newToken);
            return from(this.storage.set(TOKEN_KEY, newToken));
          })
        );
      })
    );
  }

  storeAccessToken(token) {
    this.userData.next(token);
    return from(this.storage.set(TOKEN_KEY, token));
  }

  logout() {
    this.userData.next(null);

    return from(Promise.all([
      this.storage.remove(TOKEN_KEY), 
      this.storage.remove(REFRESH_TOKEN_KEY),
      this.storage.remove('user-profile')
    ]));
  }
}
