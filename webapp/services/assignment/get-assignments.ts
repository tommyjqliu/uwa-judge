import { uwajudgeDB } from "@/lib/database-client";

export default async function getAssignments() {
    return uwajudgeDB.assignment.findMany()
}
