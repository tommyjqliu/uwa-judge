import { useQuery } from "@tanstack/react-query";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface Entity {
  id: string | number;
  title?: string;
  name?: string;
  username?: string;
}

export type EntitySelectorProps<A extends () => Promise<Entity[]>> = {
  queryAction: A;
  label?: string;
  defaultValue?: string;
  onChange?: ComponentProps<typeof Select>["onValueChange"];
  className?: string;
};

export default function EntitySelector<A extends () => Promise<Entity[]>>({ queryAction, label, defaultValue, onChange, className }: EntitySelectorProps<A>) {
  const { data: entities } = useQuery({
    queryKey: ["test"],
    queryFn: () => queryAction(), // In next.js, server action need to be called in our code instead of in dependency lib
  });


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
            const displayName = entity.title || entity.name || entity.username;
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
