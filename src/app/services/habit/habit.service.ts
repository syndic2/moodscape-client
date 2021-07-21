import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { singleLineString } from 'src/app/utilities/helpers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabitService {

  constructor(private http: HttpClient, @Inject('skipLoading') @Optional() private skipLoading: string) { }

  getHabits(fields= {}): Observable<any> {
    const query= singleLineString`

    `;

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`, {
      ...this.skipLoading && {
        headers: { skipLoading: this.skipLoading }
      }
    }).pipe(
      map((res: any) => console.log('res habits', res))
    );
  }

  getHabit(habitId: number): Observable<any> {
    const query= singleLineString`

    `;

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`, {
      ...this.skipLoading && {
        headers: { skipLoading: this.skipLoading }
      }
    }).pipe(
      map((res: any) => console.log('res habit', res))
    );
  }

  createHabit(): Observable<any> {
    const query= singleLineString`

    `;

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query });
  }

  updateHabit(): Observable<any> {
    const query= singleLineString`

    `;

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query });
  }

  removeHabit(): Observable<any> {
    const query= singleLineString`

    `;

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query });
  }
}
