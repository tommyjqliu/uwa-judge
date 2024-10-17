"use server";

import { uwajudgeDB } from "@/lib/database-client";
import { assertPermission } from "@/lib/error";
import { Permission, Prisma } from "@prisma/client";

interface GetUsersArgs {
  search?: string;
  pagination?: {
    page: number;
    perPage: number;
  };
}

export async function getUsers(args?: GetUsersArgs) {
  if (process.env.NODE_ENV === "production") {
    // In development, allow account switch
    await assertPermission(Permission.userManagement);
  }

  const isPermission =
    args?.search &&
    Object.values(Permission).includes(args.search as Permission);
  const where = {
    ...(args?.search && {
      OR: [
        {
          email: {
            contains: args.search,
          },
        },
        {
          username: {
            contains: args.search,
          },
        },
      ],
    }),
    ...(isPermission && {
      OR: [
        {
          permissions: {
            has: args.search as Permission,
          },
        },
      ],
    }),
  };

  const count = await uwajudgeDB.user.count({
    where,
  });

  const rows = await uwajudgeDB.user.findMany({
    select: {
      id: true,
      email: true,
      permissions: true,
    },
    where,
    ...(args?.pagination && {
      skip: (args.pagination.page - 1) * args.pagination.perPage,
      take: args.pagination.perPage,
    }),
  });

  return {
    count,
    rows,
  };
}
