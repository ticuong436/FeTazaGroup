import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'timkiem'
})
export class TimkiemPipe implements PipeTransform {
  transform(items: any[], searchTxt: string,value:string): any[] {
    if(!items || !items.length) return items;
    if(!searchTxt || !searchTxt.length) return items;
    return items.filter(item => {
      return item[value].toString().toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
    });
  }
}