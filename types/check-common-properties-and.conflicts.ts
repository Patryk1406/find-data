export type CheckCommonPropertiesAndConflicts = {
  <T>(
    obj1: Record<string, T>, obj2: Record<string, T>): boolean;
  <T, K>(obj1: T, obj2: K): boolean;
};
