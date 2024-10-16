"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./input";

export function DatetimePicker({
  value,
  onChange,
}: {
  value?: Date;
  onChange: (date: Date) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP HH:mm") : "Pick date and time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            date && onChange(date);
          }}
          initialFocus
        />
        <Input
          type="time"
          value={value?.toTimeString().slice(0, 5)}
          onChange={(e) => {
            console.log(e.target.value);
            onChange(new Date(`${value?.toDateString()} ${e.target.value}`));
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
