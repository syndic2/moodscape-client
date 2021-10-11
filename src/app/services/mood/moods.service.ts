import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import StringifyObject from 'stringify-object';
import gqlCompress from 'graphql-query-compress';

import { environment } from 'src/environments/environment';
import { MoodFilter } from 'src/app/models/mood.model';

@Injectable({
  providedIn: 'root'
})
export class MoodService {

  constructor(private http: HttpClient, @Inject('skipLoading') @Optional() private skipLoading: string) { }

  getMoods(): Observable<any> {
    const query= gqlCompress(`
      query {
        getUserMoods {
          __typename
          ... on AuthInfoField {
            message
          },
          ... on UserMoods {
            Id,
            userId,
            moods {
              Id,
              emoticon {
                name,
                value,
                iconPath,
                color,
              },
              createdAt {
                date,
                time,
              },
              parameters {
                internal,
                external,
              },
              activities {
                Id,
                name,
                icon
              },
              note
            },
            response {
              text,
              status
            }
          }
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`, {
      ...this.skipLoading && {
        headers: { skipLoading: this.skipLoading }
      }
    }).pipe(
      map((res: any) => res.data.getUserMoods)
    );
  }

  getMoodsChart(): Observable<any> {
    const query= gqlCompress(`
      query {
        getUserMoodsChart {
          __typename
          ... on AuthInfoField {
            message
          },
          ... on UserMoodsChart {
            userId,
            moodsChart {
              group,
              moodAverageGroupByYear {
                year,
                moodAverageByRangeDate {
                  startDate,
                  endDate,
                  moods {
                    Id,
                    createdAt {
                      date,
                      time
                    },
                    emoticon {
                      value
                    }
                  },
                  average
                }
              }
            }
          }
        }
      }
    `);
    
    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`, {
      ...this.skipLoading && {
        headers: { skipLoading: this.skipLoading }
      }
    }).pipe(
      map((res: any) => res.data.getUserMoodsChart)
    );
  }
  
  getMood(moodId: number): Observable<any> {
    const query= gqlCompress(`
      query {
        getUserMood(Id: ${moodId}) {
          __typename
          ... on AuthInfoField {
            message
          },
          ... on MoodResponse {
            mood {
              Id,
              emoticon {
                name,
                value,
                iconPath,
                color
              },
              createdAt {
                date,
                time
              },
              parameters {
                internal,
                external
              },
              activities {
                Id,
                name,
                icon
              },
              note
            },
            response {
              text,
              status
            }
          }
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`, {
      ...this.skipLoading && {
        headers: { skipLoading: this.skipLoading }
      }
    }).pipe(
      map((res: any) => res.data.getUserMood)
    );
  }

  searchMood(filters: MoodFilter): Observable<any> {
    const args= StringifyObject({
      searchText: filters.searchText,
      emoticonName: filters.emoticon ? filters.emoticon.name : '',
      parameters: filters.parameters,
      activityIds: filters.activities.length ? filters.activities.map(activity => activity.Id) : [],
      note: filters.note
    }, { singleQuotes: false });
    const query= gqlCompress(`
      query {
        getFilteredUserMood(filters: ${args}) {
          __typename
          ... on AuthInfoField {
            message
          },
          ... on UserMoods {
            Id,
            userId,
            moods {
              Id,
              emoticon {
                name,
                value,
                iconPath,
                color,
              },
              createdAt {
                date,
                time
              },
              parameters {
                internal,
                external,
              },
              activities {
                Id,
                name,
                icon,
              },
              note
            },
            response {
              text,
              status
            }
          }
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`, {
      ...this.skipLoading && {
        headers: { skipLoading: this.skipLoading }
      }
    }).pipe(
      map((res: any) => res.data.getFilteredUserMood)
    );
  }

  createMood(fields: {}): Observable<any> {
    const args= StringifyObject(fields, { singleQuotes: false });
    const query= gqlCompress(`
      mutation {
        createMood(fields: ${args}) {
          createdMood {
            Id,
            emoticon {
              name,
              value,
              iconPath,
              color
            },
            createdAt {
              date,
              time
            },
            parameters {
              internal,
              external
            },
            activities {
              Id,
              name,
              icon
            },
            note
          },
          response {
            text,
            status
          }
        }
      }
    `);
    
    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }, {
      ...this.skipLoading && {
        headers: { skipLoading: this.skipLoading }
      }
    }).pipe(
      map((res: any) => res.data.createMood)
    );
  }

  updateMood(moodId: number, fields: {}): Observable<any> {
    const args= StringifyObject(fields, { singleQuotes: false });
    const query= gqlCompress(`
      mutation {
        updateMood(Id: ${moodId}, fields: ${args}) {
          updatedMood {
            Id,
            emoticon {
              name,
              value,
              iconPath,
              color
            },
            createdAt {
              date,
              time
            },
            parameters {
              internal,
              external
            },
            activities {
              Id,
              name,
              icon
            },
            note
          },
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }, {
      ...this.skipLoading && {
        headers: { skipLoading: this.skipLoading }
      }
    }).pipe(
      map((res: any) => res.data.updateMood)
    );
  }

  removeMoods(moodIds: number[]): Observable<any> {
    const query= gqlCompress(`
      mutation {
        removeMoods(moodIds: [${moodIds}]) {
          removedMoods,
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }, {
      ...this.skipLoading && {
        headers: { skipLoading: this.skipLoading }
      }
    }).pipe(
      map((res: any) => res.data.removeMoods)
    );
  }
}
