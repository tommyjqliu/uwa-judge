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
          where: {
            id: assignmentId,
          },
          include: {
            problems: {
              include: {
                problem: true,
              },
            },
          },
        })
      : undefined;

  const problems =
    assignment && assignment.problems.map(({ problem }) => problem);
  const problemId = paramProblemId || (problems && problems[0].id);

  return (
    <main className="p-8">
      <div>
        <label>Assignment</label>
        <div> {assignment?.title}</div>
        <label>Problem</label>
        <Select value={problemId}>
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
      <Card>
        <CardContent sx={{ m: 1 }}>
          <PdfReader url={`api/problems/${problemId}/statement`}/>
        </CardContent>
      </Card>
      <div>
        {problemId ? <ProblemSolver problemId={problemId} /> : "No Problem"}
      </div>
    </main>
  );
}
