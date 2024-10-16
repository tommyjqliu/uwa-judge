"use server";

import { uwajudgeDB } from "@/lib/database-client";

export async function getUsers() {
  return await uwajudgeDB.user.findMany({
    select: {
      id: true,
      email: true,
      username: true,
    },
  });
}
