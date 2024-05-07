import { EntityQueryOptions } from "@/lib/actions/entity-query";
import useEntityQuery from "@/lib/hooks/use-entity-query";
import { MenuItem, Select } from "@mui/material";
import { DOMjudgeDB, UWAjudgeDB } from "../database-client";

export type EntitySelectorProps<DB extends "UWAjudgeDB" | "DOMjudgeDB"> = React.ComponentProps<typeof Select> & {
    entityQuery: EntityQueryOptions<DB>
}

export default function EntitySelector<DB extends "UWAjudgeDB" | "DOMjudgeDB" = "UWAjudgeDB">({ entityQuery, ...rest }: EntitySelectorProps<DB>) {
    const { data: entities } = useEntityQuery(entityQuery)
    return <Select {...rest}>
        {entities?.map((entity: any) => {
            const id = entity.id || entity.externalid
            const displayName = entity.title || entity.name || entity.username
            return <MenuItem key={id} value={id}>{displayName}</MenuItem>
        })}
    </Select>
}