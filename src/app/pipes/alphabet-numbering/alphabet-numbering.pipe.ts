import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphabetNumbering'
})
export class AlphabetNumberingPipe implements PipeTransform {
  private alphabets = (): string[] => {
    let values = [];

    for (let i = 0; i < 26; i++) {
      values.push(String.fromCharCode(65 + i));
    }

    return values;
  };

  transform(number: number, ...args: unknown[]): string {
    return this.alphabets()[number];
  }
}
