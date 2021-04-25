import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import StringifyObject from 'stringify-object';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private httpHeaders: HttpHeaders;
  private httpOptions: any= {
    responseType: 'json'
  };

  constructor(private http: HttpClient) { }

  defaultHeaders() {
    return new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  }

  getOneByUrlName(urlName: string): Observable<any> {
    const query= `
      query {
        articleByUrlName(urlName: "${urlName}") {
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
    `;

    return this.http.get(`${environment.api_url}/graphql?query=${query}`, this.httpOptions).pipe(
      map((res: any) => res.data.articleByUrlName)
    );
  }

  getAll(fields= {}, offset: number= 0, limit: number= 0): Observable<any> {
    const args= StringifyObject(fields, { singleQuotes: false });
    const query= `
      query {
        allArticle(fields: ${args}, offset: ${offset}, limit: ${limit}) {
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
    `;

    return this.http.get(`${environment.api_url}/graphql?query=${query}`, this.httpOptions).pipe(
      map((res: any) => res.data.allArticle)
    );
  }
}
