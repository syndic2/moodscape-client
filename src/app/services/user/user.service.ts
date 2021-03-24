import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import StringifyObject from '../../../../node_modules/stringify-object';

import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpHeaders: HttpHeaders;
  private httpOptions: any= {
    responseType: 'json'
  };

  constructor(private http: HttpClient, storage: Storage, private authService: AuthenticationService) { }

  defaultHeaders() {
    return new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  }

  getProfile(): Observable<User> {
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
            email
          }
        }
      }
    `;

    this.httpHeaders= new HttpHeaders().set('Authorization', `bearer ${this.authService.getUser()}`);
    this.httpOptions.headers= this.httpHeaders;

    return this.http.get(`${environment.api_url}?query=${query}`, this.httpOptions).pipe(
      map((res: any) => <User>res.data.userProfile)
    );
  }

  createUser(data): Observable<any> {
    const args= StringifyObject(data, {
      singleQuotes: false,
      transform: (object, property, originalResult) => {
        if (property === 'age') return object[property] === '' ? 0 : originalResult;
        else return originalResult;
      }
    });
    let query= `
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

    return this.http.post(environment.api_url, { query: query }, this.httpOptions).pipe(
      map((res: any) => res.data.createUser)
    );
  }

  updateUser(data): Observable<any> {
    this.httpHeaders= this.defaultHeaders().set('Authorization', `bearer ${this.authService.getUser()}`);
    this.httpOptions.headers= this.httpHeaders;

    const args= StringifyObject(data, {
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

    return this.http.post(environment.api_url, { query: query }, this.httpOptions).pipe(
      map((res: any) => res.data.updateUser)
    );
  }
}
