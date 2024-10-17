import { uwajudgeDB } from "@/lib/database-client";

export default async function getAssignments() {
  return {
    rows: await uwajudgeDB.assignment.findMany(),
    count: await uwajudgeDB.assignment.count(),
  };
}
