import {
  EntityQueryOptions
} from "@/lib/actions/entity-query";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { Merge, ModelOfDB } from "../lib/type";
import { useEntityQuery } from "../lib/hooks/use-entity-query";
import { UWAjudgeDB } from "../lib/database-client";

export type EntitySelectorProps<
  E extends keyof ModelOfDB<UWAjudgeDB>,
  A extends keyof UWAjudgeDB[E],
> = React.ComponentProps<typeof Select> & {
  entityQuery: EntityQueryOptions<E, A>;
};

export default function EntitySelector<
  E extends keyof ModelOfDB<UWAjudgeDB>,
  A extends keyof UWAjudgeDB[E],
>({ entityQuery, ...rest }: EntitySelectorProps<E, A>) {
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
