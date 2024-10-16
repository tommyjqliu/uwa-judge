import { uwajudgeDB } from "@/lib/database-client";

export default async function getAssessments(assignmentId: number) {
  return uwajudgeDB.assessment.findMany({
    where: {
      assignmentId,
    },
  });
}
