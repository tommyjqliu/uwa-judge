import { UWAjudgeDB, uwajudgeDB } from "./database-client";

export type RemoveKeysStartingWith<T, Prefix extends string> = {
    [K in keyof T as `${string & K}` extends `${Prefix}${string}` ? never : K]: T[K];
};

export type ModelOfDB<T> = {
    [K in keyof T as T[K] extends { findMany: any } ? K : never]: T[K];
}
type t = never extends true ? 1 : 2
export type Merge<A, B> = {
    [K in keyof A as K extends keyof B ? B[K] extends never ? never : K : K]: K extends keyof B ? B[K] : A[K];
}