import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import StringifyObject from '../../../../node_modules/stringify-object';

import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpOptions: Object= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }),
    responseType: 'json'
  };

  constructor(private http: HttpClient) { }

  getProfile(id) {

  }

  createUser(data) {
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

    return this.http.post(`${environment.api_url}`, { query: query }, this.httpOptions).pipe(
      map((res: any) => res.data.createUser)
    );
  }

  updateUser() {

  }
}
