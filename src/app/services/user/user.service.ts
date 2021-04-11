import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import StringifyObject from 'stringify-object';

import { filterObjectProps } from 'src/app/utilities/helpers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpHeaders: HttpHeaders;
  private httpOptions: any= {
    responseType: 'json'
  };

  constructor(private http: HttpClient, storage: Storage) { }

  defaultHeaders() {
    return new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  }

  getProfile(): Observable<any> {
    const query= `
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

    return this.http.get(`${environment.api_url}/graphql?query=${query}`, this.httpOptions).pipe(
      map((res: any) => ({
        firstName: res.data.userProfile.firstName,
        lastName: res.data.userProfile.lastName,
        gender: res.data.userProfile.gender,
        age: res.data.userProfile.age,
        email: res.data.userProfile.email,
        imgUrl: res.data.userProfile.imgUrl
      }))
    );
  }

  createUser(data): Observable<any> {
    delete data['confirmPassword'];

    const args= StringifyObject(data, {
      singleQuotes: false,
      transform: (object, property, originalResult) => {
        if (property === 'age') return object[property] === '' ? 0 : originalResult;
        else return originalResult;
      }
    });
    const query= `
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

    this.httpHeaders= this.defaultHeaders();
    this.httpOptions.headers= this.httpHeaders;

    return this.http.post(`${environment.api_url}/graphql`, { query: query }, this.httpOptions).pipe(
      map((res: any) => res.data.createUser)
    );
  }

  updateUser(data): Observable<any> {
    const args= StringifyObject(filterObjectProps(data), {
      singleQuotes: false,
      transform: (object, property, originalResult) => {
        if (property === 'age') return object[property] === '' ? 0 : originalResult;
        else return originalResult;
      }
    });
    const query= `
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

    return this.http.post(`${environment.api_url}/graphql`, { query: query }, this.httpOptions).pipe(
      map((res: any) => res.data.updateUser)
    );
  }
}
