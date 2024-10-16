import ManagementLayout from "@/components/management-layout";
import { uwajudgeDB } from "@/lib/database-client";
import Link from "next/link";
import { Assignment, Permission, Problem } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ServerDataTable } from "@/components/ui/server-data-table";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/pagination";
import { z } from "zod";
import LocalTime from "@/components/local-time";
import { FilePen } from "lucide-react";
import { serverHasPermission } from "@/lib/permission";

const columns: ColumnDef<Assignment & { problems: Problem[] }>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <Link
          href={`/assignments/${row.original.id}`}
          className="hover:underline"
        >
          {row.original.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    header: "Publish Date",
    cell: ({ row }) => {
      return <LocalTime date={row.original.publishDate} />;
    },
  },
  {
    header: "Due Date",
    cell: ({ row }) => {
      return <LocalTime date={row.original.dueDate} />;
    },
  },
  {
    header: "Operations",
    cell: ({ row }) => {
      return (
        <div>
          <Link href={`/assignments/${row.original.id}/assess`}>
            <Button variant="ghost" size="icon" title="Assess assignment">
              <FilePen className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];

export default async function page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    perPage?: string;
  };
}) {
  const { page, perPage } = z
    .object({
      page: z.string().transform(Number).default("1"),
      perPage: z.string().transform(Number).default("15"),
    })
    .parse(searchParams);
  const assignmentCount = await uwajudgeDB.assignment.count();
  const assignments = await uwajudgeDB.assignment.findMany({
    orderBy: {
      id: "desc",
    },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  // Output assignment list and pagination component
  return (
    <ManagementLayout
      title="Assignments"
      operation={
        (await serverHasPermission(Permission.createAssignment)) && (
          <Link href="/assignments/create">
            <Button>Create Assignment</Button>
          </Link>
        )
      }
    >
      <div className="flex-1 h-full flex flex-col">
        <ServerDataTable columns={columns} data={assignments as []} />
        <Pagination
          totalCount={assignmentCount}
          page={page}
          perPage={perPage}
          className="mt-4"
        />
      </div>
    </ManagementLayout>
  );
}
