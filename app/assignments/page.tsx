import { AssignmentList } from "@/app/assignments/assignment-list";
import Pagination from "@/lib/components/pagination";
import { uwajudgeDB } from "@/lib/database-client";
import { sleep } from "@/lib/utils";

import Link from "next/link";

export default async function page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const assignments = await uwajudgeDB.assignment.findMany();
  console.log(searchParams?.["page"]);
  return (
    <main className="p-8">
      <div className="flex justify-between">
        <h2 className="mb-4">Assignments</h2>
        <Link href="/assignments/create">Create Assignment</Link>
      </div>
      <AssignmentList assignments={assignments} />
      <Pagination totalPage={10} />
    </main>
  );
}
