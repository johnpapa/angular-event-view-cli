import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'initCaps' })
export class InitCapsPipe implements PipeTransform {
  transform(value: string, args?: any[]) {
    return value.toLowerCase().replace(/(?:^|\s)[a-z]/g, m => m.toUpperCase());
  }
}
