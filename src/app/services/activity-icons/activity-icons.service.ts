import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { singleLineString } from 'src/app/utilities/helpers';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityIconsService {

  constructor(private http: HttpClient) { }

  getActivityIcons(name: string= ''): Observable<any> {
    const query= singleLineString`
      query {
        activityIcons(name: "${name}") {
          Id,
          name
        }
      }
    `;

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`).pipe(
      map((res: any) => res.data.activityIcons)
    );
  }
}
