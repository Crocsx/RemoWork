export class ObjectUtils {
  static objectsEqual(o1: unknown, o2: unknown): boolean {
    return typeof o2 === 'object' && typeof o1 === 'object' && Object.keys(o1 || {}).length > 0
      ? Object.keys(o1 || {}).length === Object.keys(o2 || {}).length &&
          Object.keys(o1 || {}).every((p) =>
            ObjectUtils.objectsEqual(
              (o1 as { [key: string]: unknown })[p],
              (o2 as { [key: string]: unknown })[p]
            )
          )
      : o1 === o2;
  }

  static isEmpty(value: unknown) {
    if (Array.isArray(value)) {
      return !value.length;
    }

    if (value instanceof Map || value instanceof Set) {
      return !value.size;
    }

    if (ObjectUtils.isRecord(value)) {
      return !Object.keys(value).length;
    }

    return true;
  }

  static arraysEqual(a1: unknown[], a2: unknown[]) {
    return a1.length === a2.length && a1.every((o, idx) => ObjectUtils.objectsEqual(o, a2[idx]));
  }

  static arrayFromEnum<T extends string>(test: Record<string, string>): T[] {
    return Object.keys(test) as T[];
  }

  static isLiteralObject = function (obj: unknown): obj is object {
    return !!obj && obj.constructor === Object;
  };

  static isRecord(obj: unknown): obj is Record<string, string> {
    return !!obj && typeof obj === 'object' && !Array.isArray(obj);
  }

  static alphabeticalOrder<T>(array: readonly T[], byField?: keyof T) {
    return [...array].sort((a, b) => {
      if (!byField) {
        if (typeof a === 'string' && typeof b === 'string') {
          return a.localeCompare(b);
        }
        return 0;
      }
      const fieldA = a[byField];
      const fieldB = b[byField];
      if (typeof fieldA === 'string' && typeof fieldB === 'string') {
        return fieldA.localeCompare(fieldB);
      }
      return 0;
    });
  }
}
