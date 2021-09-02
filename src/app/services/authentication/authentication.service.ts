import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

//import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import StringifyObject from 'stringify-object';
import gqlCompress from 'graphql-query-compress';

import { environment } from 'src/environments/environment';

//const jwt_helper= new JwtHelperService();
const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'auth-refresh-token';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	public authenticate: Observable<any>;
	public userData: BehaviorSubject<string> = new BehaviorSubject(null);

	constructor(private http: HttpClient, private storage: Storage, private platform: Platform) {
		this.checkStoredToken();
	}

	checkStoredToken() {
		let platformObs = from(this.platform.ready());

		this.authenticate = platformObs.pipe(
			switchMap(() => from(this.storage.get(TOKEN_KEY))),
			map(token => {
				if (!token) {
					return false;
				} else {
					return true;
				}
			})
		);
	}

	login(credentials, withGoogle: boolean = false): Observable<any> {
		const args = StringifyObject(credentials, {
			singleQuotes: false,
			transform: (object, property, originalResult) => {
				if (property === 'age') return object[property] === '' ? 0 : originalResult;
				else return originalResult;
			}
		});
		const query = gqlCompress(`
			mutation {
				login(
					emailOrUsername: "${withGoogle ? credentials.email : credentials.emailOrUsername}",
					password: "${credentials.password}",
					withGoogle: ${withGoogle ? args : "{}"}
				) {
          authenticatedUser {
            firstName,
						lastName,
						gender,
						age,
						email,
						imgUrl
          },
					accessToken,
					refreshToken,
					response {
						text,
						status
					}
				}
			}
    `);

		return this.http.post(`${environment.apiUrl}/auth`, { query: query }).pipe(
			map((res: any) => {
				this.userData.next(res.data.login.accessToken);
				
				return res.data.login;
			}),
			switchMap((res: any) => {
				return from(Promise.all([
					res,
					this.storage.set(TOKEN_KEY, res.accessToken),
					this.storage.set(REFRESH_TOKEN_KEY, res.refreshToken)
				]));
			})
		);
	}

	refreshToken(): Observable<any> {
		return from(this.storage.get(REFRESH_TOKEN_KEY)).pipe(
			switchMap(refreshToken => {
				const query = gqlCompress(`
					mutation {
						refreshAuth(refreshToken: "${refreshToken}") {
							newToken
						}
					}
				`);

				return this.http.post(`${environment.apiUrl}/auth`, { query: query }).pipe(
					map((res: any) => {
            console.log('res', res);
						this.userData.next(res.data.refreshAuth.newToken);

						return res.data.refreshAuth.newToken;
					}),
					switchMap(newToken => {
						return from(this.storage.set(TOKEN_KEY, newToken));
					})
				);
			})
		);
	}

	requestResetPassword(email: string): Observable<any> {
		const query= gqlCompress(`
			mutation {
				requestResetPassword(email: "${email}") {
					resetUrl,
					response {
						text,
						status
					}
				}
			}
		`);

		return this.http.post(`${environment.apiUrl}/auth`, { query: query }).pipe(
			map((res: any) => res.data.requestResetPassword)
		);
	}

  resetPassword(resetToken: string, newPassword: string): Observable<any> {
    const query= gqlCompress(`
      mutation {
        resetPassword(resetToken: "${resetToken}", newPassword: "${newPassword}") {
          userWithNewPassword {
            password
          },
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(`${environment.apiUrl}/auth`, { query: query }).pipe(
      map((res: any) => res.data.resetPassword)
    );
  }

	logout(): Observable<any> {
		return from(Promise.all([
      this.userData.next(null),
			this.storage.remove(TOKEN_KEY),
			this.storage.remove(REFRESH_TOKEN_KEY),
		]));
	}
}
