export type RemoveKeysStartingWith<T, Prefix extends string> = {
  [K in keyof T as `${string & K}` extends `${Prefix}${string}`
    ? never
    : K]: T[K];
};

export type ModelOfDB<T> = {
  [K in keyof T as T[K] extends { findMany: any } ? K : never]: T[K];
};

export type Merge<A, B> = {
  [K in keyof A as K extends keyof B
    ? B[K] extends never
      ? never
      : K
    : K]: K extends keyof B ? B[K] : A[K];
};

type UndefinedProperties<T> = {
  [P in keyof T]-?: undefined extends T[P] ? P : never;
}[keyof T];
/**
 * Convert undefined able properties of T to optional
 */
export type ToOptional<T> = Partial<Pick<T, UndefinedProperties<T>>> &
  Pick<T, Exclude<keyof T, UndefinedProperties<T>>>;
