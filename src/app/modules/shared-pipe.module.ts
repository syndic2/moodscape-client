import { NgModule } from '@angular/core';

import { DateInBahasaPipe } from '../pipes/date-in-bahasa/date-in-bahasa.pipe';
import { AlphabetNumberingPipe } from '../pipes/alphabet-numbering/alphabet-numbering.pipe';

const Pipes= [
  DateInBahasaPipe,
  AlphabetNumberingPipe
];

@NgModule({
  declarations: [...Pipes],
  imports: [],
  exports: [...Pipes]
})
export class SharedPipeModule { }
