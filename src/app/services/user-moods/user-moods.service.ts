import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import StringifyObject from 'stringify-object';

import { singleLineString } from 'src/app/utilities/helpers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserMoodsService {

  constructor(private http: HttpClient, @Inject('skipLoading') @Optional() private skipLoading: string) { }

  getMoods(fields= {}): Observable<any> {
    const query= singleLineString`
      
    `;

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`, {
      ...this.skipLoading && {
        headers: { skipLoading: this.skipLoading }
      }
    }).pipe(
      map((res: any) => console.log('res moods', res))
    );
  }

  getMood(): Observable<any> {
    const query= singleLineString`

    `;

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`, {
      ...this.skipLoading && {
        headers: { skipLoading: this.skipLoading }
      }
    }).pipe(
      map((res: any) => console.log('res mood', res))
    );
  }

  createMood(): Observable<any> {
    const query= singleLineString`

    `;

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query });
  }

  updateMood(): Observable<any> {
    const query= singleLineString`

    `;

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query });
  }

  removeMood(): Observable<any> {
    const query= singleLineString`

    `;

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query });
  }
}
