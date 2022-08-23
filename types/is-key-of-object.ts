export const isKeyOfObject = <T>(
  key: string | number | symbol, obj: object): key is keyof T => obj.hasOwnProperty(key);
