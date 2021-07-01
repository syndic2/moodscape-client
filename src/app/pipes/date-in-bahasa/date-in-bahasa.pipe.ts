import { Pipe, PipeTransform } from '@angular/core';

import { transformDateTime } from 'src/app/utilities/helpers';

@Pipe({
  name: 'dateInBahasa'
})
export class DateInBahasaPipe implements PipeTransform {
  transform(date: Date, ...args: unknown[]) {
    return {
      shortDate: transformDateTime(date).toShortDate(),
      fullDate: transformDateTime(date).toDate()
    };
  }
}
