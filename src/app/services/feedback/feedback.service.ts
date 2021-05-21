import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import StringifyObject from 'stringify-object';

import { filterObjectProps } from 'src/app/utilities/helpers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  sendAppFeedback(data): Observable<any> {
    const query= `
      mutation {
        createAppFeedback(fields: ${StringifyObject(filterObjectProps(data), { singleQuotes: false })}) {
          createdFeedback {
            __typename
            ... on AuthInfoField {
							message
						},
            ... on AppFeedback {
              Id,
              userId
              createdAt
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
      map((res: any)  => res.data.createAppFeedback)
    );
  }
}
