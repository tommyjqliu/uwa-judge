import {
  DB,
  EntityQueryOptions,
  SupportedDB,
} from "@/lib/actions/entity-query";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Merge, ModelOfDB } from "../type";
import { useEntityQuery } from "../hooks/use-entity-query";

export type EntitySelectorProps<
  E extends keyof ModelOfDB<DB<DBK>>,
  A extends keyof DB<DBK>[E],
  DBK extends SupportedDB = "UWAjudgeDB",
> = React.ComponentProps<typeof Select> & {
  entityQuery: EntityQueryOptions<E, A, DBK>;
};

export default function EntitySelector<
  E extends keyof ModelOfDB<DB<DBK>>,
  A extends keyof DB<DBK>[E],
  DBK extends SupportedDB = "UWAjudgeDB",
>({ entityQuery, ...rest }: EntitySelectorProps<E, A, DBK>) {
  const { data: entities } = useEntityQuery(entityQuery);
  return (
    <FormControl>
      {rest.label && <InputLabel>{rest.label}</InputLabel>}
      <Select {...rest}>
        {(entities as any[])?.map((entity: any) => {
          const id = entity.id || entity.externalid;
          const displayName = entity.title || entity.name || entity.username;
          return (
            <MenuItem key={id} value={id}>
              {displayName}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
