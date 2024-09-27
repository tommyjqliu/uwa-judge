import { DataTable } from "@/components/ui/data-table";
import { uwajudgeDB } from "@/lib/database-client";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import UserOperation from "./operation";

const columns: ColumnDef<User>[] = [
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
  {
    accessorKey: "groups",
    header: "Groups",
  },
];

export default async function page() {
  const users = await uwajudgeDB.user.findMany({
    include: {
      groups: true,
    },
  });

  const userTableData = users.map((user) => ({
    ...user,
    groups: user.groups.map((group) => group.name).join(", "),
    displayPermissions: user.permissions.map((perm) => perm).join(", "),
  }));

  return (
    <main className="flex-1 h-full flex flex-col">
      <UserOperation />
      <div className="flex-1 h-0 flex flex-col">
        <DataTable columns={columns} data={userTableData} />
      </div>
    </main>
  );
}
