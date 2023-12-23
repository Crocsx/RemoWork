import { EMPTY_DEFAULT } from '../config';

export class TimeUtils {
  static formatTime(hour?: string | number, minute?: string | number) {
    if (isNaN(Number(hour)) || isNaN(Number(minute))) {
      return EMPTY_DEFAULT;
    }

    const date = new Date();
    date.setHours(Number(hour), Number(minute));

    const timeFormatter = new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
    });

    return timeFormatter.format(date);
  }
}
