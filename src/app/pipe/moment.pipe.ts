import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment',
  pure: false,
})
export class MomentPipe implements PipeTransform {
  transform(m: moment.Moment | any, format: string = 'MMMM YYYY'): any {
    return m.format(format);
  }
}
