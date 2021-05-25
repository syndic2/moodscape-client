import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { singleLineString } from 'src/app/utilities/helpers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserArticlesService {

  constructor(private http: HttpClient) { }

  archiveArticles(article_ids: number[]): Observable<any> {
    const query= singleLineString`
      mutation {
        archiveArticles(articleIds: [${article_ids}]) {
          archivedArticles {
            __typename
            ... on AuthInfoField {
              message
            },
            ... on ArchivedArticleIds {
              articleIds
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
      map((res: any) => res.data.archiveArticles)
    )
  }

  getArchivedArticles(): Observable<any> {
    const query= singleLineString`
      query {
        archivedArticles {
          __typename
          ... on AuthInfoField {
            message
          },
          ... on UserArticles {
            articles {
              Id,
              title,
              headerImg,
              author,
              urlName,
              url
            },
            response {
              text,
              status
            }
          }
        }
      }
    `;

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`).pipe(
      map((res: any) => res.data.archivedArticles)
    )
  }

  removeArchivedArticles(article_ids: number[]) {
    const query= singleLineString`
      mutation {
        removeArchivedArticles(articleIds: [${article_ids}]) {
          removedArticles {
            __typename
            ... on AuthInfoField {
              message
            },
            ... on ArchivedArticleIds {
              articleIds
            }
          },
          response {
            text,
            status
          }
        }
      }
    `;

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query });
  }
}
