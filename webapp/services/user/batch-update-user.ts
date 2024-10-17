"use server";

import { parse } from "csv-parse/sync";
import { uwajudgeDB } from "@/lib/database-client";
import { Permission } from "@prisma/client";
import { z } from "zod";
import { assertPermission } from "@/lib/error";

const schema = z.object({
  Email: z.string().email(),
  Permission: z.string(),
});

export async function batchUpdateUser(csvString: string) {
  await assertPermission(Permission.userManagement);
  const records = parse(csvString, { columns: true, skip_empty_lines: true });

  await uwajudgeDB.$transaction(async (tx) => {
    for (const record of records) {
      const parsedRecord = schema.parse(record);
      const { Email, Permission: PermissionString } = parsedRecord;

      const permissions = [
        ...new Set(PermissionString.split(",").map((p) => p.trim())),
      ] as Permission[];

      await tx.user.upsert({
        where: { email: Email },
        update: {
          permissions: permissions,
        },
        create: {
          email: Email,
          permissions: permissions,
        },
      });
    }
  });
}
