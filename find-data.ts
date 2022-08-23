import { AnyObject } from './types/any-object';
import { Helper } from './types/helper';
import { isKeyOfObject } from './types/is-key-of-object';
import { ValueOf } from './types/value-of';

const checkIfHaveCommonProperty = (
  obj1: object,
  obj2: object,
): boolean => Object.keys(obj1)
  .some((key) => (isKeyOfObject(key, obj1) && isKeyOfObject(key, obj2)
    ? obj1[key] === obj2[key]
    : false));

const checkIfThereIsAConflict = (
  obj1: object,
  obj2: object,
): boolean => Object.keys(obj1)
  .some((key) => (isKeyOfObject(key, obj1) && isKeyOfObject(key, obj2)
    ? obj1[key] !== obj2[key]
    : false));

const checkCommonPropertiesAndConflicts = (obj1: object, obj2: object) => checkIfHaveCommonProperty(
  obj1,
  obj2,
)
  && !checkIfThereIsAConflict(obj1, obj2);

const mergedNestedObjects = <T extends AnyObject, K extends AnyObject>(element: T, obj: K) => {
  Object.values(element)
    .forEach((value) => {
      if (!value) return;
      if (Array.isArray(value)) {
        helper<ValueOf<T>, K>(value, obj);
        return;
      }
      if (typeof value === 'object') {
        if (
          checkCommonPropertiesAndConflicts(
            value,
            obj,
          )
        ) {
          Object.assign(value, obj);
          Object.assign(obj, value);
          return;
        }
        helper<ValueOf<ValueOf<T>>, K>(Object.values(value), obj);
      }
    });
};

const helper: Helper = <T extends AnyObject, K extends AnyObject>(
  arr: (T | K)[], obj: T | K): boolean => arr.some(
    (element) => {
      if (checkCommonPropertiesAndConflicts(element, obj)) {
        Object.assign(element, obj);
        Object.assign(obj, element);
        return true;
      }
      mergedNestedObjects<T | K, T | K>(element, obj);
      return false;
    },
  );

export const findData = <T extends AnyObject, K extends AnyObject>(
  array: T[], array2: K[]): (T | K)[] => {
  const combined = [...array, ...array2];
  return combined.reduce((acc: (T | K)[], curr: T | K) => {
    const isMerged: boolean = helper<T, K>(acc, curr);
    if (!isMerged) acc.push(curr);
    return acc;
  }, []);
};
