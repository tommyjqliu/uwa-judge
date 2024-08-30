import { uwajudgeDB } from "@/lib/database-client";
import { stringToInt } from "@/lib/zod";
import { z } from "zod";
import ProblemSolver from "./problem-solver";
import { Card, CardContent, MenuItem, Select } from "@mui/material";
import Link from "next/link";
import PdfReader from "@/lib/components/pdf-reader";

export default async function Code({
  searchParams,
}: {
  searchParams?: { assignmentId?: string; problemId?: string };
}) {
  const { assignmentId, problemId: paramProblemId } = z
    .object({
      assignmentId: stringToInt.optional(),
      problemId: z.string().optional(),
    })
    .parse(searchParams);

  const assignment =
    undefined !== assignmentId
      ? await uwajudgeDB.assignment.findUnique({
        where: { id: assignmentId },
        include: {
          problems: { include: { problemVersion: true } },
        },
      })
      : undefined;

  const problems = assignment && assignment.problems;
  const problemId = paramProblemId || (problems && problems[0].id);

  return (
    <main className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Assignment:</h2>
        <div className="text-lg">{assignment?.title}</div>
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Problem:</label>
        <Select value={problemId} className="w-full max-w-xs">
          {problems &&
            problems.map((problem) => (
              <MenuItem key={problem.id} value={problem.id}>
                <Link
                  key={problem.id}
                  href={`/code?assignmentId=${assignmentId}&problemId=${problem.id}`}
                  className="h-full w-full absolute inset-0"
                />
                {problem.problemVersion.name}
              </MenuItem>
            ))}
        </Select>
      </div>
      <Card>
        <CardContent className="h-[450px]">
          <PdfReader url={`api/problems/${problemId}/statement`} />
        </CardContent>
      </Card>
      <div>
        {problemId ? (
          <ProblemSolver problemId={problemId} assignmentId={assignmentId} />
        ) : (
          "No Problem"
        )}
      </div>
    </main>
  );
}
