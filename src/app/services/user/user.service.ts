import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Storage } from '@ionic/storage';

import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import StringifyObject from 'stringify-object';

import { filterObjectProps } from 'src/app/utilities/helpers';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private http: HttpClient, private storage: Storage) { }

	getProfile(): Observable<any> {
		const query = `
			query {
				userProfile {
					__typename
					... on AuthInfoField {
						message
					},
					... on User {
						firstName,
						lastName,
						gender,
						age,
						email,
						imgUrl
					}
				}
			}
		`;

		return this.http.get(`${environment.apiUrl}/graphql?query=${query}`).pipe(
			switchMap((res: any) => {
				return from(this.storage.set('user-profile', res.data.userProfile)).pipe(
					switchMap(() => {
						return from(this.storage.get('user-profile'));
					})
				);
			})
		);
	}

	createUser(data): Observable<any> {
		delete data['confirmPassword'];

		const args = StringifyObject(data, {
			singleQuotes: false,
			transform: (object, property, originalResult) => {
				if (property === 'age') return object[property] === '' ? 0 : originalResult;
				else return originalResult;
			}
		});
		const query = `
			mutation {
				createUser(fields: ${args}) {
					createdUser {
						Id
					},
					response {
						text,
						status
					}
				}
			}
		`;

		return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
			map((res: any) => res.data.createUser)
		);
	}

	updateUser(data): Observable<any> {
		const args = StringifyObject(filterObjectProps(data), {
			singleQuotes: false,
			transform: (object, property, originalResult) => {
				if (property === 'age') return object[property] === '' ? 0 : originalResult;
				else return originalResult;
			}
		});
		const query = `
			mutation {
				updateUser(fields: ${args}) {
					updatedUser {
						__typename
						... on AuthInfoField {
							message
						}
					},
					response {
						text,
						status
					}
				}
			}
    `;

		return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
			map((res: any) => res.data.updateUser)
		);
	}

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const query= `
      mutation {
        changePassword(oldPassword: "${oldPassword}", newPassword: "${newPassword}") {
          userWithNewPassword {
            __typename
            ... on AuthInfoField {
              message
            },
            ... on User {
              Id,
              password
            }
          },
          response {
            text,
            status
          }
        }
      }
    `;

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
      map((res: any) => res.data.changePassword)
    );
  }
}
