import { Pipe, PipeTransform } from '@angular/core';

import { Speaker } from '../../models';

@Pipe({ name: 'sortSpeakers' })
export class SortSpeakersPipe implements PipeTransform {
  transform(value: Speaker[], args?: any[]) {
    if (!value || !value.sort) { return value; }

    return value.sort((a: Speaker, b: Speaker) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
  }
}
