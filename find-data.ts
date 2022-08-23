import { CheckCommonPropertiesAndConflicts } from './types/check-common-properties-and.conflicts';
import { Helper } from './types/helper';
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

const checkCommonPropertiesAndConflicts: CheckCommonPropertiesAndConflicts = <T>(
  obj1: Record<string, T>, obj2: Record<string, T>) => checkIfHaveCommonProperty<T>(
    obj1,
    obj2,
  )
  && !checkIfThereIsAConflict<T>(obj1, obj2);

const helper: Helper = <T>(
  arr: Record<string, T>[], obj: Record<string, T>): boolean => arr.some((element: Record<string, T>) => {
    if (checkCommonPropertiesAndConflicts<T>(element, obj)) {
      Object.assign(element, obj);
      Object.assign(obj, element);
      return true;
    }
    Object.values(element)
      .forEach((value: T) => {
        if (!value) return;
        if (Array.isArray(value)) {
          helper<T>(value, obj);
          return;
        }
        if (typeof value === 'object') {
          if (
            checkCommonPropertiesAndConflicts<T, Record<string, T>>(
              value,
              obj,
            )
          ) {
            Object.assign(value, obj);
            Object.assign(obj, value);
            return;
          }
          helper<ValueOf<T>, T>(Object.values(value), obj);
        }
      });
    return false;
  });

export const findData = <T>(
  array: Record<string, T>[], array2: Record<string, T>[]): Record<string, T>[] => {
  const combined = [...array, ...array2];
  return combined.reduce((acc: Record<string, T>[], curr: Record<string, T>) => {
    const isMerged: boolean = helper<T>(acc, curr);
    if (!isMerged) acc.push(curr);
    return acc;
  }, []);
};
