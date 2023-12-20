/* eslint-disable @typescript-eslint/no-explicit-any */
export const combineValidators =
  (...validators: any[]) =>
  (value: string) => {
    const errors = validators
      .map((validator) => validator(value))
      .filter((result) => result !== null);

    return errors.length > 0 ? errors[0] : null;
  };
