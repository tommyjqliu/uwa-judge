import { uwajudgeDB } from "@/lib/database-client";
import { User, UserGroup } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import UserGroupOperation from "./operation";
import ManagementLayout from "@/components/management-layout";
import UserManagementNavigator from "../navigator";
import UserOperation from "../user/operation";
import { ServerDataTable } from "@/components/ui/server-data-table";

const columns: ColumnDef<UserGroup>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Group Name",
  },
];

export default async function page() {
  const users = await uwajudgeDB.userGroup.findMany();
  return (
    <ManagementLayout
      title="Users"
      operation={<UserOperation />}
      navigator={<UserManagementNavigator />}
    >
      <div className="flex-1 h-full flex flex-col">
        <ServerDataTable columns={columns} data={users} />
      </div>
    </ManagementLayout>
  );
}
