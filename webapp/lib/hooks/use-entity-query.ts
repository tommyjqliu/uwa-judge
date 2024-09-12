import { useQuery } from "@tanstack/react-query";
import {
  entityQuery,
  EntityQueryOptions,
} from "../actions/entity-query";
import { ModelOfDB } from "../type";
import { UWAjudgeDB } from "../database-client";

export function useEntityQuery<
  E extends keyof ModelOfDB<UWAjudgeDB>,
  A extends keyof UWAjudgeDB[E],
>(options: EntityQueryOptions<E, A>) {
  return useQuery({
    queryKey: ["entityQuery", options],
    queryFn: () => entityQuery(options),
  });
}
