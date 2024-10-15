import ManagementLayout from "@/components/management-layout";
import Pagination from "@/components/pagination";
import { uwajudgeDB } from "@/lib/database-client";
import Link from "next/link";
import { Assignment, Problem } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ServerDataTable } from "@/components/ui/server-data-table";
import { Button } from "@/components/ui/button";

const columns: ColumnDef<Assignment & { problems: Problem[] }>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return <Link href={`/assignments/${row.original.id}`} className="hover:underline">{row.original.title}</Link>
    }
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "publishDate",
    header: "Publish Date",
  },

];

export default async function page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // Read all assignments
  const allAssignments = await uwajudgeDB.assignment.findMany({
    include: {
      problems: true
    }
  });
  console.log("Total assignments:", allAssignments.length);

  // Set number of assignments per page
  const assignmentsPerPage = 10;

  // Parse page number, default to page 1 if not provided
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;

  // Calculate total number of pages
  const totalPage = Math.ceil(allAssignments.length / assignmentsPerPage);

  // Calculate the range of assignments to display based on page number and assignments per page
  const startIndex = (page - 1) * assignmentsPerPage;
  const endIndex = startIndex + assignmentsPerPage;
  const assignments = allAssignments.slice(startIndex, endIndex);

  console.log("Current page:", page);
  console.log("Total pages:", totalPage);

  // Output assignment list and pagination component
  return (
    <ManagementLayout
      title="Assignments"
      operation={<Link href="/assignments/create"><Button>Create Assignment</Button></Link>}
    >
      <div className="w-full">
        <ServerDataTable columns={columns} data={assignments} />
      </div>
    </ManagementLayout>
  );
}
