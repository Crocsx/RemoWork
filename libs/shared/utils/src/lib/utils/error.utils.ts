import { AxiosError } from 'axios';

export class ErrorUtils {
  static getErrorMessage = function (
    error: unknown,
    defaultMessage = 'Something went wrong'
  ) {
    if (typeof error == 'string') {
      return error;
    }

    if (error instanceof Object) {
      if (error instanceof AxiosError) {
        return error.response?.data.error || error.message;
      }

      if (Object.prototype.hasOwnProperty.call(error, 'message')) {
        return (error as { message: string }).message;
      }

      if (Object.prototype.hasOwnProperty.call(error, 'code')) {
        return (error as { code: string }).code;
      }
    }

    return defaultMessage;
  };
}
