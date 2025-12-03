"use server";
import { uwajudgeDB } from "@/lib/database-client";

export default async function getLanguages() {
  return {
    rows: await uwajudgeDB.language.findMany(),
    count: await uwajudgeDB.language.count(),
  };
}
