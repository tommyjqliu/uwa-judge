import { uwajudgeDB } from "@/lib/database-client";
import { stringToInt } from "@/lib/zod";
import { z } from "zod";
import ProblemSolver from "./problem-solver";
import { Card, CardContent, MenuItem, Select } from "@mui/material";
import Link from "next/link";

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
            problems: { include: { problem: true } },
          },
        })
      : undefined;

  const problems =
    assignment && assignment.problems.map(({ problem }) => problem);
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
                {problem.name}
              </MenuItem>
            ))}
        </Select>
      </div>
      <Card className="mb-6">
        <CardContent sx={{ m: 1 }}>{assignment?.description}</CardContent>
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
