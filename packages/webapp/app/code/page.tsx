import PdfReader from "@/components/pdf-reader";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { uwajudgeDB } from "@/lib/database-client";
import { stringToInt } from "@/lib/zod";
import { Assignment, ProblemVersion } from "@prisma/client";
import { z } from "zod";
import ProblemSolver from "./problem-solver";

interface SearchParams {
  problemId?: string; // assignment problem id
  problemVersionId?: string; // problem version id
}

export default async function Page({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const { problemId, problemVersionId } = z
    .object({
      problemId: stringToInt.optional(),
      problemVersionId: stringToInt.optional(),
    })
    .parse(searchParams);

  let assignment: Assignment | null = null;
  let problemVersion: ProblemVersion | null = null;
  if (problemVersionId !== undefined) {
    problemVersion = await uwajudgeDB.problemVersion.findUnique({
      where: { id: problemVersionId },
    });
  } else if (problemId !== undefined) {
    assignment = await uwajudgeDB.assignment.findUnique({
      where: { id: problemId },
    });
    const problem = await uwajudgeDB.problem.findUnique({
      where: { id: problemId },
      include: { problemVersion: true },
    });
    problemVersion = problem?.problemVersion ?? null;
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="flex-grow">
      {problemVersion && (
        <>
          <ResizablePanel defaultSize={50} id="statement">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="font-semibold m-4">{problemVersion.name}</div>
              <PdfReader
                url={`api/problem-versions/${problemVersion.id}/pdf-statement`}
                className="border-2 border-gray-300"
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
        </>
      )}
      <ProblemSolver
        problemVersionId={problemVersionId}
        problemId={problemId}
      />
    </ResizablePanelGroup>
  );
}
