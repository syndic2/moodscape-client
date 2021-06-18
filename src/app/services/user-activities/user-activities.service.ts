import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { singleLineString } from 'src/app/utilities/helpers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserActivitiesService {

  constructor(private http: HttpClient) { }

  getActivity(activiy_id: number): Observable<any> {
    const query= singleLineString`
      
    `;

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`).pipe(
      map((res: any) => console.log(res))
    )
  }

  getActivities(): Observable<any> {
    const query= singleLineString`
      query {
        userActivities {
          __typename
          ... on AuthInfoField {
            message
          },
          ... on UserActivities {
            activityCategories {
              Id,
              category,
              activities {
                Id,
                name,
                icon
              }
            }
          }
        }
      }
    `;

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`).pipe(
      map((res: any) => res.data.userActivities)
    )
  }

  createActivity(): Observable<any> {
    const query= singleLineString`

    `;

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query });
  }

  updateActivity(activity_id: number): Observable<any> {
    const query= singleLineString`

    `;

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query });
  }

  removeActivity(activity_id: number): Observable<any> {
    const query= singleLineString`

    `;

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query });
  }

  createActivityCategory(): Observable<any> {
    const query= singleLineString`

    `;

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query });
  }

  updateActivityCategory(): Observable<any> {
    const query= singleLineString`

    `;

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query });
  }

  removeActivityCategory(): Observable<any> {
    const query= singleLineString`

    `;

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query });
  }
}
