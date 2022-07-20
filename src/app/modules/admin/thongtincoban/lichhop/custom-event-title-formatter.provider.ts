import { LOCALE_ID, Inject, Injectable } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { formatDate } from '@angular/common';

@Injectable()
export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }
  month(event: CalendarEvent): string {
    return `${formatDate(event.start, 'HH:mm', this.locale)} ${
      event.title
    }`;
  }

  week(event: CalendarEvent): string {
    return `${formatDate(event.start, 'HH:mm', this.locale)} ${
      event.title
    }`;
  }

  day(event: CalendarEvent): string {
    return `${formatDate(event.start, 'HH:mm', this.locale)} ${
      event.title
    }`;
  }
}
