"use server";

import { uwajudgeDB } from "@/lib/database-client";
import { assertPermission } from "@/lib/error";
import { Permission } from "@prisma/client";

export async function getUsers() {
  if (process.env.NODE_ENV === "production") {
    // In development, allow account switch
    await assertPermission(Permission.userManagement);
  }

  return uwajudgeDB.user.findMany({
    select: {
      id: true,
      email: true,
      permissions: true,
    },
  });
}
