import { ValueOf } from './types/ValueOf';

const checkIfHaveCommonProperty = <T>(
  obj1: Record<string, T>,
  obj2: Record<string, T>,
): boolean => Object.keys(obj1)
    .some((key) => obj1[key] === obj2[key]);

const checkIfThereIsAConflict = <T>(
  obj1: Record<string, T>,
  obj2: Record<string, T>,
): boolean => Object.keys(obj1)
    .some((key) => obj2[key] !== undefined && obj1[key] !== obj2[key]);

const checkCommonPropertiesAndConflicts = <T, K>(
  obj1: Record<string, T>, obj2: Record<string, K>) => checkIfHaveCommonProperty<T | K>(obj1, obj2)
  && !checkIfThereIsAConflict<T | K>(obj1, obj2);

const helper = <Y>(arr: Record<string, Y>[], obj: Record<string, Y>): boolean => {
  let result = false;
  arr.forEach((element: Record<string, Y>) => {
    if (checkCommonPropertiesAndConflicts<Y, Y>(element, obj)) {
      Object.assign(element, obj);
      Object.assign(obj, element);
      result = true;
      return;
    }
    Object.values(element)
      .forEach((value: Y) => {
        if (!value) return;
        if (Array.isArray(value)) {
          helper<Y>(value, obj);
          return;
        }
        if (typeof value === 'object') {
          if (
            checkCommonPropertiesAndConflicts<ValueOf<Y>, Y>(
              value as Y & Record<string, ValueOf<Y>>,
              obj,
            )
          ) {
            Object.assign(value, obj);
            Object.assign(obj, value);
            return;
          }
          helper(Object.values(value), obj);
        }
      });
  });
  return result;
};

type Object<V> = Record<string, V>;

export const findData = <T extends Object<ValueOf<T>>, K extends Object<ValueOf<K>>>(
  array: T[], array2: K[]): (T | K)[] => {
  const combined = [...array, ...array2];
  return combined.reduce((acc: (T | K)[], curr: T | K) => {
    const isMerged: boolean = helper<ValueOf<T> | ValueOf<K>>(acc, curr);
    if (!isMerged) acc.push(curr);
    return acc;
  }, []);
};
