import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {
  transform(text: string, keyword: string): string {
    if (!keyword) {
      return text;
    }

    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
  }
}
