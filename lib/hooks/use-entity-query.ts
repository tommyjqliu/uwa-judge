import { useQuery } from "@tanstack/react-query";
import {
  entityQuery,
  DB,
  EntityQueryOptions,
  SupportedDB,
} from "../actions/entity-query";
import { ModelOfDB } from "../type";

export function useEntityQuery<
  E extends keyof ModelOfDB<DB<DBK>>,
  A extends keyof DB<DBK>[E],
  DBK extends SupportedDB = "UWAjudgeDB",
>(options: EntityQueryOptions<E, A, DBK>) {
  return useQuery({
    queryKey: ["entityQuery", options],
    queryFn: () => entityQuery(options),
  });
}
