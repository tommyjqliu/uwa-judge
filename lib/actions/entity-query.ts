"use server";

import {
  UWAjudgeDB,
  uwajudgeDB,
} from "../database-client";
import { ModelOfDB } from "../type";

export interface EntityQueryOptions<
  E extends keyof ModelOfDB<UWAjudgeDB>,
  A extends keyof UWAjudgeDB[E],
> {
  entity: E;
  action: A;
  query?: UWAjudgeDB[E][A] extends (arg: infer T) => any ? T : never;
}

export async function entityQuery<
  E extends keyof ModelOfDB<UWAjudgeDB>,
  A extends keyof UWAjudgeDB[E],
>({ entity, action, query }: EntityQueryOptions<E, A>) {
  type returnType = UWAjudgeDB[E][A] extends (arg: any) => infer T ? T : never;
  return (uwajudgeDB[entity][action] as any)(query) as returnType;
}

export default entityQuery;