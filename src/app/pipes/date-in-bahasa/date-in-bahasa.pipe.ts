import { Pipe, PipeTransform } from '@angular/core';

import { transformDateTime } from 'src/app/utilities/helpers';

@Pipe({
  name: 'dateInBahasa'
})
export class DateInBahasaPipe implements PipeTransform {
  transform(date: Date | string, ...args: unknown[]) {
    date = new Date(date);

    return {
      dateObject: date,
      'format::/': transformDateTime(date)['format::/'](),
      shortDate: transformDateTime(date).toShortDate(),
      fullDate: transformDateTime(date).toDate()
    };
  }
}
