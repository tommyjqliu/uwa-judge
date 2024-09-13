import { AssignmentList } from "@/app/assignments/assignment-list";
import Pagination from "@/components/pagination";
import { uwajudgeDB } from "@/lib/database-client";
import Link from "next/link";

export const dynamic = 'force-dynamic'

export default async function page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  // Read all assignments
  const allAssignments = await uwajudgeDB.assignment.findMany();
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
    <main className="p-8">
      <div className="flex justify-between">
        <h2 className="mb-4">Assignments</h2>
        <Link href="/assignments/create">Create Assignment</Link>
      </div>
      <AssignmentList assignments={assignments} />
      <Pagination totalPage={totalPage} className="mt-4"/>
    </main>
  );
}
