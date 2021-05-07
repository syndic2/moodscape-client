import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

//import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable, BehaviorSubject, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import StringifyObject from 'stringify-object';

import { environment } from 'src/environments/environment';

//const jwt_helper= new JwtHelperService();
const AUTHENTICATED_USER= 'authenticated-user';
const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'auth-refresh-token';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	public authenticate: Observable<any>;
	public userData: BehaviorSubject<string> = new BehaviorSubject(null);

	constructor(
		private http: HttpClient,
		private storage: Storage,
		private platform: Platform) {
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

  getAuthenticatedUser(): Observable<any> {
    return from(this.storage.get(AUTHENTICATED_USER));
  }

	login(data, withGoogle: boolean = false): Observable<any> {
		const args = StringifyObject(data, {
			singleQuotes: false,
			transform: (object, property, originalResult) => {
				if (property === 'age') return object[property] === '' ? 0 : originalResult;
				else return originalResult;
			}
		});
		const query = `
			mutation {
				login(
					emailOrUsername: "${withGoogle ? data.email : data.emailOrUsername}",
					password: "${data.password}",
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
    `;

		return this.http.post(`${environment.apiUrl}/auth`, { query: query }).pipe(
			map((res: any) => {
				this.userData.next(res.data.login.accessToken);

				return res.data.login
			}),
			switchMap((res: any) => {
				return from(Promise.all([
					res.response,
          this.storage.set(AUTHENTICATED_USER, res.authenticatedUser),
					this.storage.set(TOKEN_KEY, res.accessToken),
					this.storage.set(REFRESH_TOKEN_KEY, res.refreshToken)
				]));
			})
		);
	}

	refreshToken(): Observable<any> {
		return from(this.storage.get(REFRESH_TOKEN_KEY)).pipe(
			switchMap(refreshToken => {
				const query = `
					mutation {
						refreshAuth(refreshToken: "${refreshToken}") {
							newToken
						}
					}
				`;

				return this.http.post(`${environment.apiUrl}/auth`, { query: query }).pipe(
					map((res: any) => {
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
		const query= `
			mutation {
				requestResetPassword(email: "${email}") {
					resetUrl,
					response {
						text,
						status
					}
				}
			}
		`;

		return this.http.post(`${environment.apiUrl}/auth`, { query: query }).pipe(
			map((res: any) => res.data.requestResetPassword)
		);
	}

  resetPassword(resetToken: string, newPassword: string): Observable<any> {
    const query= `
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
    `;

    return this.http.post(`${environment.apiUrl}/auth`, { query: query }).pipe(
      map((res: any) => res.data.resetPassword)
    );
  }

	logout() {
		this.userData.next(null);

		return from(Promise.all([
			this.storage.remove(TOKEN_KEY),
			this.storage.remove(REFRESH_TOKEN_KEY),
      this.storage.remove(AUTHENTICATED_USER),
			this.storage.remove('user-profile')
		]));
	}
}
