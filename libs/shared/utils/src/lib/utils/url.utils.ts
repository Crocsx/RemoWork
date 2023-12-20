/* eslint-disable @typescript-eslint/no-explicit-any */
export const createQueryString = (filter: Record<any, any>) => {
  const params = new URLSearchParams();

  Object.entries(filter).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (subValue !== undefined) {
          params.append(`${key}.${subKey}`, subValue?.toString() || '');
        }
      });
    } else if (value !== undefined) {
      params.append(key, value?.toString() || '');
    }
  });

  return params.toString();
};
