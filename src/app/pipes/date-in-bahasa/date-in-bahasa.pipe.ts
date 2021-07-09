import { Pipe, PipeTransform } from '@angular/core';

import { transformDateTime } from 'src/app/utilities/helpers';

@Pipe({
  name: 'dateInBahasa'
})
export class DateInBahasaPipe implements PipeTransform {
  transform(date: Date | string, ...args: unknown[]) {
    return {
      dateObject: new Date(date),
      shortDate: transformDateTime(new Date(date)).toShortDate(),
      fullDate: transformDateTime(new Date(date)).toDate()
    };
  }
}
