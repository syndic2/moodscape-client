import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import StringifyObject from 'stringify-object';
import gqlCompress from 'graphql-query-compress';

import { environment } from 'src/environments/environment';
import { filterObjectProps } from 'src/app/utilities/helpers';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getProfile(skipLoading: boolean = false): Observable<any> {
    const query = gqlCompress(`
			query {
				getUserProfile {
					__typename,
					... on AuthInfoField {
						message
					},
					... on UserResponse {
						user {
              Id,
							firstName,
							lastName,
							gender,
							dateOfBirth,
							email,
							imgUrl
						}
						response {
							text,
							status
						}
					}
				}
			}
		`);

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`, {
      ...skipLoading && {
        headers: {
          skipLoading: 'true'
        }
      }
    }).pipe(
      map((res: any) => res.data.getUserProfile)
    );
  }

  createUser(fields: {}): Observable<any> {
    fields = { ...fields };

    delete fields['confirmPassword'];

    const args = StringifyObject(fields, {
      singleQuotes: false,
      transform: (object, property, originalResult) => {
        if (property === 'age') return object[property] === '' ? 0 : originalResult;
        else return originalResult;
      }
    });
    const query = gqlCompress(`
			mutation {
				createUser(fields: ${args}) {
					response {
						text,
						status
					}
				}
			}
		`);

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
      map((res: any) => res.data.createUser)
    );
  }

  updateProfile(fields: {}): Observable<any> {
    const args = StringifyObject(filterObjectProps(fields), { singleQuotes: false });
    const query = gqlCompress(`
			mutation {
				updateProfile(fields: ${args}) {
					updatedProfile {
            Id,
						firstName,
						lastName,
						gender,
						dateOfBirth,
						email,
						imgUrl
					},
					response {
						text,
						status
					}
				}
			}
    `);

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
      map((res: any) => res.data.updateProfile)
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const query = gqlCompress(`
      mutation {
        changePassword(oldPassword: "${oldPassword}", newPassword: "${newPassword}") {
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
      map((res: any) => res.data.changePassword)
    );
  }
}
