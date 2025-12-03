import { Permission } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import ManagementLayout from "@/components/management-layout";
import UserManagementNavigator from "../navigator";
import { ServerDataTable } from "@/components/ui/server-data-table";
import { assertPermission } from "@/lib/error";

const columns: ColumnDef<{
  permission: string;
  description: string;
}>[] = [
  {
    accessorKey: "permission",
    header: "Permission",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];

export default async function page() {
  await assertPermission(Permission.userManagement);
  const permissionTable = [
    {
      permission: Permission.developAdmin,
      description: "Full administrative access for development purposes",
    },
    {
      permission: Permission.problemManagement,
      description:
        "Ability to manage problem module of the system and view all problems",
    },
    {
      permission: Permission.userManagement,
      description: "Manage user accounts, roles, and permissions",
    },
    {
      permission: Permission.createAssignment,
      description: "Create and manage assignments",
    },
  ];

  return (
    <ManagementLayout title="User" navigator={<UserManagementNavigator />}>
      <main className="flex-1 h-full flex flex-col">
        <ServerDataTable columns={columns} data={permissionTable} />
      </main>
    </ManagementLayout>
  );
}
