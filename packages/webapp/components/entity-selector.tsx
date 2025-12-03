import { useQuery } from "@tanstack/react-query";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { useAssertClientContext } from "@/lib/hooks/use-assert-context";

interface Entity {
  id: string | number;
  email?: string | null;
  title?: string | null;
  name?: string | null;
  username?: string | null;
}

export type EntitySelectorProps<A extends () => Promise<{ rows: Entity[] }>> = {
  queryAction: A;
  label?: string;
  defaultValue?: string;
  onChange?: ComponentProps<typeof Select>["onValueChange"];
  className?: string;
};

export default function EntitySelector<
  A extends () => Promise<{ rows: Entity[] }>,
>({
  queryAction,
  label,
  defaultValue,
  onChange,
  className,
}: EntitySelectorProps<A>) {
  useAssertClientContext();
  const { data } = useQuery({
    queryKey: ["test"],
    queryFn: () => queryAction(), // In next.js, server action need to be called in our code instead of in dependency lib
  });

  const entities = data?.rows;

  return (
    <>
      {label && <Label>{label}</Label>}
      <Select defaultValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger className={cn("w-[180px]", className)}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {entities?.map((entity) => {
            const id = entity.id;
            const displayName =
              entity.title || entity.name || entity.username || entity.email;
            return (
              <SelectItem key={id} value={String(id)}>
                {displayName}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}
