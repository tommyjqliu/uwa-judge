import { useQuery } from "@tanstack/react-query";
import entityQuery, { EntityQueryOptions } from "../actions/entity-query";

export default function useEntityQuery<D = any>(options: EntityQueryOptions) {
    return useQuery<D>({
        queryKey: ['entityQuery', options],
        queryFn: () => entityQuery(options)
    })
}