export class TimezoneUtils {
  static readonly DEFAULT = 'Asia/Tokyo';

  static isValidTimeZone(timeZone: string) {
    if (!timeZone) {
      return false;
    }

    try {
      Intl.DateTimeFormat(undefined, { timeZone });
      return true;
    } catch (e) {
      return false;
    }
  }

  static getRecommendedTimezone() {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e) {
      return TimezoneUtils.DEFAULT;
    }
  }
}
