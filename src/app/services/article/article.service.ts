import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import StringifyObject from 'stringify-object';
import gqlCompress from 'graphql-query-compress';

import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ArticleService {
  private skipLoading: string= 'true';

	constructor(private http: HttpClient) { }

	getArticles(offset: number = 0, limit: number = 10): Observable<any> {
		const query = gqlCompress(`
			query {
				getArticlePagination(offset: ${offset}, limit: ${limit}) {
          offset,
          limit,
          maxPage,
          articles {
            Id,
            title,
            shortSummary,
            author,
            postedAt,
            reviewedBy,
            content,
            headerImg,
            urlName,
            url
          }
				}
			}
		`);

		return this.http.get(`${environment.apiUrl}/graphql?query=${query}`, {
      headers: { skipLoading: this.skipLoading }
    }).pipe(
			map((res: any) => res.data.getArticlePagination)
		);
	}

  getArchivedArticles(): Observable<any> {
    const query= gqlCompress(`
      query {
        getArchivedArticles {
          __typename
          ... on AuthInfoField {
            message
          },
          ... on UserArticles {
            articles {
              Id,
              title,
              shortSummary,
              author,
              postedAt,
              reviewedBy,
              headerImg,
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
    `);

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`).pipe(
      map((res: any) => res.data.getArchivedArticles)
    )
  }

  getArticleByUrlName(urlName: string): Observable<any> {
		const query = gqlCompress(`
			query {
				getArticleByUrlName(urlName: "${urlName}") {
          Id,
          title,
          shortSummary,
          author,
          postedAt,
          reviewedBy,
          content,
          headerImg,
          urlName,
          url
				}
			}
		`);

		return this.http.get(`${environment.apiUrl}/graphql?query=${query}`).pipe(
			map((res: any) => res.data.getArticleByUrlName)
		);
	}

  searchArticle(fields: {}): Observable<any> {
    const args= StringifyObject(fields, { singleQuotes: false });
    const query= gqlCompress(`
      query {
        getFilteredArticles(fields: ${args}) {
          Id,
          title,
          shortSummary,
          author,
          postedAt,
          reviewedBy,
          headerImg,
          urlName,
          url
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`).pipe(
      map((res: any) => res.data.getFilteredArticles)
    );
  }

  searchArchivedArticles(fields: {}): Observable<any> {
    const args= StringifyObject(fields, { singleQuotes: false });
    const query= gqlCompress(`
      query {
        getFilteredArchivedArticles(fields: ${args}) {
          Id,
          title,
          shortSummary,
          author,
          postedAt,
          reviewedBy,
          headerImg,
          urlName,
          url
        }
      }
    `);
    
    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`).pipe(
      map((res: any) => res.data.getFilteredArchivedArticles)
    );
  }

  archiveArticles(articleIds: number[]): Observable<any> {
    const query= gqlCompress(`
      mutation {
        archiveArticles(articleIds: [${articleIds}]) {
          archivedArticles {
            Id,
            title,
            shortSummary,
            author,
            postedAt,
            reviewedBy,
            headerImg,
            urlName,
            url
          },
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
      map((res: any) => res.data.archiveArticles)
    )
  }

  removeArchivedArticles(articleIds: number[]) {
    const query= gqlCompress(`
      mutation {
        removeArchivedArticles(articleIds: [${articleIds}]) {
          removedArticles,
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
      map((res: any) => res.data.removeArchivedArticles)
    );
  }
}
