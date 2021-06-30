import { NgModule } from '@angular/core';

import { DateInBahasaPipe } from '../pipes/date-in-bahasa/date-in-bahasa.pipe';

const Pipes= [
  DateInBahasaPipe
];

@NgModule({
  declarations: [...Pipes],
  imports: [],
  exports: [...Pipes]
})
export class SharedPipeModule { }
