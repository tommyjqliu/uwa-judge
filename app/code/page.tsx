import { uwajudgeDB } from "@/lib/database-client";
import { stringToInt } from "@/lib/zod";
import { z } from "zod";
import ProblemSolver from "./problem-solver";
import { Card, CardContent } from "@mui/material";
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
    assignmentId &&
    (await uwajudgeDB.assignment.findUnique({
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
    }));

  const problems =
    assignment && assignment.problems.map(({ problem }) => problem);
  const problemId = paramProblemId || (problems && problems[0].id);

  return (
    <main className="p-8">
      <div>
        <label>Assignment</label>
        <select>
          {assignment && (
            <option value={assignment.id}>{assignment.title}</option>
          )}
        </select>
        <label>Problem</label>
        <select>
          {problems &&
            problems.map((problem) => (
              <option key={problem.id} value={problem.id}>
                {problem.name}
              </option>
            ))}
        </select>
      </div>
      <Card>
        <CardContent sx={{ m: 1 }}>
          TODO: will add the Problem Statement here or something
        </CardContent>
      </Card>
      <div>
        {problemId ? <ProblemSolver problemId={problemId} /> : "No Problem"}
      </div>
    </main>
  );
}
