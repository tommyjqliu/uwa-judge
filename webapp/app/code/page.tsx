import { uwajudgeDB } from "@/lib/database-client";
import { stringToInt } from "@/lib/zod";
import { z } from "zod";
import ProblemSolver from "./problem-solver";
import Link from "next/link";
import PdfReader from "@/components/pdf-reader";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Value" />
          </SelectTrigger>
          <SelectContent>
            {problems &&
              problems.map((problem) => (
                <SelectItem key={problem.id} value={String(problem.id)}>
                  <Link
                    key={problem.id}
                    href={`/code?assignmentId=${assignmentId}&problemId=${problem.id}`}
                    className="h-full w-full absolute inset-0"
                  />
                  {problem.problemVersion.name}
                </SelectItem>
              ))}
          </SelectContent>
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
