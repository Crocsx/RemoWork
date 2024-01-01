/* eslint-disable @typescript-eslint/no-explicit-any */
export const createQueryString = <T extends Record<any, any>>(filter: T) => {
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

export const readQueryString = <T extends Record<string, any>>(
  searchParams: URLSearchParams
): T => {
  const result: any = {};

  searchParams.forEach((value, key) => {
    const keys = key.split('.');
    let current = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!key) {
        return;
      }
      current[key] = current[key] || {};
      current = current[key];
    }

    const prevKey = keys[keys.length - 1];
    if (!prevKey) {
      return;
    }
    current[prevKey] = isNaN(Number(value)) ? value : Number(value);
  });

  return result as T;
};
