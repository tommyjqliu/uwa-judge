
import { uwajudgeDB } from "@/lib/database-client";
import { ProblemVersion } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import ProblemVersionOperation from "./operation";
import ManagementLayout from "@/components/management-layout";
import { Button } from "@/components/ui/button";
import { ServerDataTable } from "@/components/ui/server-data-table";
import { Pencil, Trash2 } from "lucide-react";

const columns: ColumnDef<Pick<ProblemVersion, "id" | "name">>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return <Button variant="ghost" size="icon" >
        <Trash2 className="w-4 h-4" />
      </Button>
    }
  }
];

export default async function Page() {
  const problemVersions = await uwajudgeDB.problemVersion.findMany({
    select: {
      id: true,
      name: true
    }
  });

  return (
    <ManagementLayout
      title="Problems"
      operation={<ProblemVersionOperation />}
    >
      <div className="w-full">
        <ServerDataTable columns={columns} data={problemVersions} />
      </div>
    </ManagementLayout>

  );
}
