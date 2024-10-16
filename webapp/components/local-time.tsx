"use client";

export default function LocalTime({ date }: { date?: Date | null }) {
  return <span>{date?.toLocaleString()}</span>;
}
