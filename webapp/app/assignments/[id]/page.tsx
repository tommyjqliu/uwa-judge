import ManagementLayout from "@/components/management-layout";
import { ServerDataTable } from "@/components/ui/server-data-table";
import { uwajudgeDB } from "@/lib/database-client";
import { assertNotFound } from "@/lib/error";
import { Problem, ProblemVersion } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

const columns: ColumnDef<Problem & { problemVersion: ProblemVersion }>[] = [
  {
    accessorKey: "problemVersion.name",
    header: "Problem",
    cell: ({ row }) => {
      return (
        <Link
          href={`/code?problemId=${row.original.id}`}
          className="hover:underline"
        >
          {row.original.problemVersion.name}
        </Link>
      );
    },
  },
];

export default async function Page({ params }: { params: { id: string } }) {
  const assignment = await uwajudgeDB.assignment.findUnique({
    where: { id: +params.id },
    include: {
      problems: {
        include: {
          problemVersion: true,
        },
      },
    },
  });
  assertNotFound(assignment, "Assignment not found");

  return (
    <ManagementLayout title={assignment.title}>
      <div className="container">
        {assignment.description && (
          <p className="mb-4">{assignment.description}</p>
        )}
        <div className="mb-4">
          <p>
            <strong>Publish Date:</strong>{" "}
            {assignment.publishDate
              ? new Date(assignment.publishDate).toLocaleString()
              : "Not set"}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {assignment.dueDate
              ? new Date(assignment.dueDate).toLocaleString()
              : "Not set"}
          </p>
        </div>
        <h2 className="text-xl font-semibold mb-2">Problems</h2>
        <ServerDataTable columns={columns} data={assignment.problems} />
      </div>
    </ManagementLayout>
  );
}
