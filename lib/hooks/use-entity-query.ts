import { useQuery } from "@tanstack/react-query";
import entityQuery, { EntityQueryOptions } from "../actions/entity-query";

export default function useEntityQuery<DB extends "UWAjudgeDB" | "DOMjudgeDB">(options: EntityQueryOptions<DB>) {
    return useQuery({
        queryKey: ['entityQuery', options],
        queryFn: () => entityQuery(options)
    })
}