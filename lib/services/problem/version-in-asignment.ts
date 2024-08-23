import { uwajudgeDB } from "@/lib/database-client";

export default async function versionInAssignment(versionId: number, assignmentId: number) {
  const assignment = await uwajudgeDB.assignment.findUnique({
    where: {
      id: assignmentId,
    },
    include: {
      problems: {
        include: {
          VersionOnProblem: true,
        },
      },
    },
  });

  const ids = assignment?.problems.map((problem) => problem.VersionOnProblem.map(item => item.problemVersionId));

  return !!ids?.flat().includes(versionId);
}