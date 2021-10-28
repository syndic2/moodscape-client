import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import StringifyObject from 'stringify-object';
import gqlCompress from 'graphql-query-compress';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private skipLoading: string= 'skip';

  constructor(private http: HttpClient) { }

  /**
   * Activity
   */
   getActivityIcons(name: string= ''): Observable<any> {
    const query= gqlCompress(`
      query {
        getActivityIcons(name: "${name}") {
          Id,
          name
        }
      }
    `);
    
    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`).pipe(
      map((res: any) => res.data.getActivityIcons)
    );
  }

  getActivity(activityId: number, activityCategoryId: number= 0): Observable<any> {
    const query= gqlCompress(`
      query {
        getActivity(Id: ${activityId}, activityCategoryId: ${activityCategoryId}) {
          __typename
          ... on AuthInfoField {
            message
          },
          ... on ActivityResponse {
            activity {
              Id,
              name,
              icon
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
      map((res: any) => res.data.getActivity)
    )
  }

  createActivity(fields: {}, activityCategoryId: number= 0): Observable<any> {
    const args= StringifyObject(fields, { singleQuotes: false });
    const query= gqlCompress(`
      mutation {
        createActivity(fields: ${args}, activityCategoryId: ${activityCategoryId}) {
          createdActivity {
            Id,
            name,
            icon,
          },
          response {
            text,
            status
          }
        }
      }
    `);
    
    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
      map((res: any) => res.data.createActivity)
    );
  }

  updateActivity(activityId: number, fields: {}, activityCategoryId: number= 0): Observable<any> {
    const args= StringifyObject(fields, { singleQuotes: false });
    const query= gqlCompress(`
      mutation {
        updateActivity(Id: ${activityId}, fields: ${args}, activityCategoryId: ${activityCategoryId}) {
          updatedActivity {
            Id,
            name,
            icon
          },
          response {
            text,
            status
          }
        }
      }
    `);
    
    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
      map((res: any) => res.data.updateActivity)
    );
  }

  removeActivities(activityIds: number[], activityCategoryId: number= 0): Observable<any> {
    const query= gqlCompress(`
      mutation {
        removeActivities(activityIds: [${activityIds}], activityCategoryId: ${activityCategoryId}) {
          removedActivities,
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
      map((res: any) => res.data.removeActivities)
    );
  } 

  moveActivitiesIntoCategory(activityIds: number[], fromCategoryId: number= 0, toCategoryId: number): Observable<any> {
    const query= gqlCompress(`
      mutation {
        moveActivitiesIntoCategory(activityIds: [${activityIds}], fromCategoryId: ${fromCategoryId}, toCategoryId: ${toCategoryId}) {
          movedActivities {
            Id,
            name,
            icon
          },
          response {
            text,
            status
          }
        }
      }
    `);
    
    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
      map((res: any) => res.data.moveActivitiesIntoCategory)
    );
  }
  
  /**
   * Activity Category
   */
  getActivityCategories(fields= {}): Observable<any> {
    const args = StringifyObject(fields, { singleQuotes: false });
    const query= gqlCompress(`
      query {
        getActivityCategories(fields: ${args}) {
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
      map((res: any) => res.data.getActivityCategories)
    );
  }

  getActivityCategory(activityCategoryId: number): Observable<any> {
    const query= gqlCompress(`
      query {
        getActivityCategory(Id: ${activityCategoryId}) {
          __typename,
          ... on AuthInfoField {
            message
          },
          ... on ActivityCategoryResponse {
            activityCategory {
              Id,
              category,
              activities {
                Id,
                name,
                icon
              }
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
      map((res: any) => res.data.getActivityCategory)
    )
  }

  createActivityCategory(fields: {}): Observable<any> {
    const args= StringifyObject(fields, { singleQuotes: false });
    const query= gqlCompress(`
      mutation {
        createActivityCategory(fields: ${args}) {
          createdActivityCategory {
            Id,
            category,
            activities {
              Id,
              name,
              icon
            }
          },
          response {
            text,
            status
          }
        }
      }    
    `);
    
    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
      map((res: any) => res.data.createActivityCategory)
    );
  }

  updateActivityCategory(activityCategoryId: number, fields: {}): Observable<any> {
    const args= StringifyObject(fields, { singleQuotes: false });
    const query= gqlCompress(`
      mutation {
        updateActivityCategory(Id: ${activityCategoryId}, fields: ${args}) {
          updatedActivityCategory {
            Id,
            category,
            activities {
              Id,
              name,
              icon
            }
          },
          response {
            text,
            status
          }
        }
      }
    `);
    
    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
      map((res: any) => res.data.updateActivityCategory)
    );
  }

  removeActivityCategories(activityCategoryIds: number[], keepActivities: boolean= false): Observable<any> {
    const query= gqlCompress(`
      mutation {
        removeActivityCategories(activityCategoryIds: [${activityCategoryIds}], keepActivities: ${keepActivities}) {
          removedActivityCategories,
          response {
            text,
            status
          }
        } 
      }
    `);

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
      map((res: any) => res.data.removeActivityCategories)
    );
  }

  reorderActivityCategory(categoryIds: number[]): Observable<any> {
    const query= gqlCompress(`
      mutation {
        reorderActivityCategory(categoryIds: [${categoryIds}]) {
          reorderedActivityCategories {
            Id,
            category,
            activities {
              Id,
              name,
              icon
            }
          },
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query });
  }
}
