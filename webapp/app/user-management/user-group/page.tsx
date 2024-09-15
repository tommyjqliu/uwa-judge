import { DataTable } from "@/components/ui/data-table";
import { uwajudgeDB } from "@/lib/database-client";
import { User, UserGroup } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import UserGroupOperation from "./operation";

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
    <main className="flex-1 h-full flex flex-col">
        <UserGroupOperation/>
      <div className="flex-1 h-0 flex flex-col">
        <DataTable columns={columns} data={users} />
      </div>
    </main>
  );
}
