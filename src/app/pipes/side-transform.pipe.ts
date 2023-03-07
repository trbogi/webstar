import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sideTransform'
})
export class SideTransformPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value === 'DARK' ? 'Sötét' : 'Világos';
  }

}
