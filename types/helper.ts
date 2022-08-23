import { AnyObject } from './any-object';

export type Helper = {
  <T extends AnyObject, K extends AnyObject>(
    arr: (T | K)[], obj: T | K): boolean;
  <T, K>(arr: T[], obj: K): boolean;
};
