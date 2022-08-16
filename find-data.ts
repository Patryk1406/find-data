const checkIfHaveCommonProperty = <T>(
  obj1: Record<string, T>,
  obj2: Record<string, T>,
): boolean => {
  for (const key of Object.keys(obj1)) {
    if (obj1[key] === obj2[key]) return true;
  }
  return false;
};

const checkIfThereIsAConflict = <T>(
  obj1: Record<string, T>,
  obj2: Record<string, T>,
): boolean => {
  for (const key of Object.keys(obj1)) {
    if (obj2[key] !== undefined && obj1[key] !== obj2[key]) return true;
  }
  return false;
};

export const findData = <T extends Record<string, unknown>, K extends Record<string, unknown>>(
  array: T[], array2: K[]): (T | K)[] => {
  const combined = [...array, ...array2];
  return combined.reduce((acc: (T | K)[], curr: T | K) => {
    const helper = <Y>(arr: Record<string, Y>[], obj: Record<string, Y>): boolean => {
      for (const element of arr) {
        if (checkIfHaveCommonProperty(element, obj) && !checkIfThereIsAConflict(element, obj)) {
          Object.assign(element, obj);
          Object.assign(obj, element);
          return true;
        }
        for (const value of Object.values(element)) {
          if (!value) break;
          if (Array.isArray(value)) {
            helper(value, obj);
            break;
          }
          if (typeof value === 'object') {
            if (checkIfHaveCommonProperty(value as Y & Record<string, any>, obj)
              && !checkIfThereIsAConflict(value as Y & Record<string, any>, obj)) {
              Object.assign(value, obj);
              Object.assign(obj, value);
              break;
            }
            helper(Object.values(value), obj);
          }
        }
      }
      return false;
    };
    const isMerged = helper(acc, curr);
    if (!isMerged) acc[acc.length] = curr;
    return acc;
  }, []);
};
