import { uwajudgeDB } from "@/lib/database-client";
import { Permission, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import UserOperation from "./operation";
import ManagementLayout from "@/components/management-layout";
import UserManagementNavigator from "../navigator";
import { ServerDataTable } from "@/components/ui/server-data-table";
import { assertPermission } from "@/lib/error";
import { getUsers } from "@/services/user/get-users";
import Pagination, { paginationSchema } from "@/components/pagination";

const columns: ColumnDef<Awaited<ReturnType<typeof getUsers>>["rows"][number]>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "displayPermissions",
    header: "Permissions",
  },
];

export default async function page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    perPage?: string;
    search?: string;
  };
}) {
  await assertPermission(Permission.userManagement);
  const { page, perPage } = paginationSchema.parse(searchParams);
  const { rows, count } = await getUsers({
    pagination: {
      page,
      perPage,
    },
    search: searchParams?.search,
  });

  const userTableData = rows.map((user) => ({
    ...user,
    displayPermissions: user.permissions.map((perm) => perm).join(", "),
  }));

  return (
    <ManagementLayout
      title="User"
      operation={<UserOperation search={searchParams?.search} />}
      navigator={<UserManagementNavigator />}
    >
      <main className="flex-1 overflow-x-auto h-full flex flex-col">
        <ServerDataTable columns={columns} data={userTableData} />
        <Pagination
          totalCount={count}
          page={page}
          perPage={perPage}
          className="mt-4"
        />
      </main>
    </ManagementLayout>
  );
}
