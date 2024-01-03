/* eslint-disable @typescript-eslint/no-explicit-any */
export const combineValidators =
  (...validators: any[]) =>
  (...params: any[]) => {
    const errors = validators
      .map((validator) => {
        return validator(...params);
      })
      .filter((result) => result !== null);

    return errors.length > 0 ? errors[0] : null;
  };
