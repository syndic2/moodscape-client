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
export class HabitService {
  private skipLoading: string= 'skip';

  constructor(private http: HttpClient) { }

  getHabits(): Observable<any> {
    const query= gqlCompress(`
      query {
        getUserHabits {
          __typename
          ... on AuthInfoField {
            message
          },
          ... on UserHabits {
            Id,
            userId,
            habits {
              Id,
              name,
              description,
              createdAt {
                date,
                time
              },
              type,
              day,
              goal,
              goalDates {
                start,
                end
              },
              reminderTime,
              labelColor,
              track {
                totalCompleted,
                totalStreaks,
                streakLogs {
                  startDate,
                  endDate,
                  currentGoal,
                  targetGoal,
                  lastMarkedAt,
                  isComplete,
                  markedAt
                }
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
      map((res: any) => res.data.getUserHabits)
    );
  }

  getHabitsChart(): Observable<any> {
    const query= gqlCompress(`
      query {
        getUserHabitsChart {
          __typename
            ... on AuthInfoField {
            message
          },
          ... on UserHabitsChart {
            userId,
            habitsChart {
              group,
              habitAverageGroupByYear {
                year,
                habits {
                  Id
                }
                average
              }
            }
          }
        }
      }
    `);

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`).pipe(
      map((res: any) => res.data.getUserHabitsChart)
    );
  }

  searchHabit(filters: {}): Observable<any> {
    const query= gqlCompress(`

    `);

    return this.http.get(`${environment.apiUrl}/graphql?query=${query}`).pipe(
      map((res: any) => console.log('res', res))
    );
  }

  getHabit(habitId: number): Observable<any> {
    const query= gqlCompress(`
      query {
        getUserHabit(Id: ${habitId}) {
          __typename
          ... on AuthInfoField {
            message
          },
          ... on HabitResponse {
            habit {
              Id,
              name,
              description,
              createdAt {
                date,
                time
              },
              type,
              day,
              goal,
              goalDates {
                start,
                end
              },
              reminderTime,
              labelColor,
              track {
                totalCompleted,
                totalStreaks,
                streakLogs {
                  startDate,
                  endDate,
                  currentGoal,
                  targetGoal,
                  lastMarkedAt,
                  isComplete,
                  markedAt
                }
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
      map((res: any) => res.data.getUserHabit)
    );
  }

  createHabit(fields: {}): Observable<any> {
    const args= StringifyObject(fields, { singleQuotes: false });
    const query= gqlCompress(`
      mutation {
        createHabit(fields: ${args}) {
          createdHabit {
            Id,
            name,
            description,
            createdAt {
              date,
              time
            },
            type,
            day,
            goal,
            goalDates {
              start,
              end
            },
            reminderTime,
            labelColor,
            track {
              totalCompleted,
              totalStreaks,
              streakLogs {
                startDate,
                endDate,
                currentGoal,
                targetGoal,
                lastMarkedAt,
                isComplete,
                markedAt
              }
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
      map((res: any) => res.data.createHabit)
    );
  }

  updateHabit(habitId: number, fields: {}): Observable<any> {
    const args= StringifyObject(fields, { singleQuotes: false });
    const query= gqlCompress(`
      mutation {
        updateHabit(Id: ${habitId}, fields: ${args}) {
          updatedHabit {
            Id,
            name,
            description,
            createdAt {
              date,
              time
            },
            type,
            day,
            goal,
            goalDates {
              start,
              end
            },
            reminderTime,
            labelColor,
            track {
              totalCompleted,
              totalStreaks,
              streakLogs {
                startDate,
                endDate,
                currentGoal,
                targetGoal,
                lastMarkedAt,
                isComplete,
                markedAt
              }
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
      map((res: any) => res.data.updateHabit)
    );
  }

  removeHabits(habitIds: number[]): Observable<any> {
    const query= gqlCompress(`
      mutation {
        removeHabits(habitIds: ${habitIds}) {
          removedHabits,
          response {
            text,
            status
          }
        }
      }
    `);

    return this.http.post(`${environment.apiUrl}/graphql`, { query: query }).pipe(
      map((res: any) => res.data.removeHabits)
    );
  }

  markHabitGoal(habitId: number, markedAt: string): Observable<any> {
    const query= gqlCompress(`
      mutation {
        markHabitGoal(Id: ${habitId}, markedAt: "${markedAt}") {
          markedHabit {
            Id,
            name,
            description,
            createdAt {
              date,
              time
            },
            type,
            day,
            goal,
            goalDates {
              start,
              end
            },
            reminderTime,
            labelColor,
            track {
              totalCompleted,
              totalStreaks,
              streakLogs {
                startDate,
                endDate,
                currentGoal,
                targetGoal,
                lastMarkedAt,
                isComplete,
                markedAt
              }
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
      map((res: any) => res.data.markHabitGoal)
    );
  }
}
