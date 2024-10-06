
import { uwajudgeDB } from "@/lib/database-client";
import { ProblemVersion } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import ProblemVersionOperation from "./operation";
import ManagementLayout from "@/components/management-layout";
import { Button } from "@/components/ui/button";
import { ServerDataTable } from "@/components/ui/server-data-table";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const columns: ColumnDef<Pick<ProblemVersion, "id" | "name">>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <Link href={`/code?problemVersionId=${row.original.id}`} className="hover:underline">{row.original.name}</Link>
    },
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
