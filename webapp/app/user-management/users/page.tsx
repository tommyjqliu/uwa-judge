import { uwajudgeDB } from "@/lib/database-client";
import { Permission, User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import UserOperation from "./operation";
import ManagementLayout from "@/components/management-layout";
import UserManagementNavigator from "../navigator";
import { ServerDataTable } from "@/components/ui/server-data-table";
import { assertPermission } from "@/lib/error";
import { getUsers } from "@/services/user/get-users";

const columns: ColumnDef<Awaited<ReturnType<typeof getUsers>>[number]>[] = [
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

export default async function page() {
  await assertPermission(Permission.userManagement);

  const users = await getUsers();
  const userTableData = users.map((user) => ({
    ...user,
    displayPermissions: user.permissions.map((perm) => perm).join(", "),
  }));

  return (
    <ManagementLayout
      title="User"
      operation={<UserOperation />}
      navigator={<UserManagementNavigator />}
    >
      <main className="flex-1 h-full flex flex-col">
        <ServerDataTable columns={columns} data={userTableData} />
      </main>
    </ManagementLayout>
  );
}
