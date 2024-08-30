import { uwajudgeDB } from "@/lib/database-client";
import { stringToInt } from "@/lib/zod";
import { z } from "zod";
import CodeEditor from "./code-editor";
import { Card, CardContent, MenuItem, Select } from "@mui/material";
import Link from "next/link";
import PdfReader from "@/lib/components/pdf-reader";
import CodeModule from "./code-module";

export default async function Code({
  searchParams,
}: {
  searchParams?: { assignmentId?: string; problemId?: string; problemVersionId?: string; submissionId?: string };
}) {
  const { assignmentId, problemId, problemVersionId, submissionId } = z
    .object({
      assignmentId: stringToInt.optional(),
      problemId: stringToInt.optional(),
      problemVersionId: stringToInt.optional(),
      submissionId: stringToInt.optional(),
    })
    .parse(searchParams);

  const assignment =
    undefined !== assignmentId
      ? await uwajudgeDB.assignment.findUnique({
        where: { id: assignmentId },
        include: {
          problems: {
            include: {
              problemVersion: true,
            },
          },
        },
      })
      : undefined;

  const problems =
    assignment && assignment.problems;

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
      <CodeModule problemId={problemId} problemVersionId={problemVersionId} />
    </main>
  );
}
