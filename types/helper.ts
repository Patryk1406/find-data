export type Helper = {
  <T>(arr: Record<string, T>[], obj: Record<string, T>): boolean;
  <T, K>(arr: Record<string, T>[], obj: Record<string, K>): boolean;
};
