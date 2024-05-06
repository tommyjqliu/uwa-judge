import { EntityQueryOptions } from "@/lib/actions/entity-query";
import useEntityQuery from "@/lib/hooks/use-entity-query";
import { MenuItem, Select } from "@mui/material";

export type EntitySelectorProps = React.ComponentProps<typeof Select> & {
    entityQuery: EntityQueryOptions
}

export default function EntitySelector({ entityQuery, ...rest }: EntitySelectorProps) {
    const { data: entities } = useEntityQuery<any[]>(entityQuery)
    return <Select {...rest}>
        {entities?.map((entity) => <MenuItem key={entity.id} value={entity.id}>{entity.title}</MenuItem>)}
    </Select>
}