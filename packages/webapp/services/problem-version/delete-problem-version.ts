"use server";

import { uwajudgeDB } from "@/lib/database-client";

export async function deleteProblemVersion(id: number) {
  await uwajudgeDB.problemVersion.delete({
    where: {
      id: id,
    },
  });
}
