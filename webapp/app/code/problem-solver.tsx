"use client";
import ClientContext from "@/components/client-context";
import EntitySelector from "@/components/entity-selector";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { assertParams } from "@/lib/error";
import type { JudgeResult } from "@/services/judge/get-judge-result";
import getLanguages from "@/services/language/get-languages";
import realtimeSubmission from "@/services/submission/realtime-submission";
import { Editor } from "@monaco-editor/react";
import { useCallback, useState } from "react";
import SubmitResult from "./submit-result";

interface ProblemSolverProps {
  problemVersionId?: number;
  problemId?: number;
}

export default function ProblemSolver({
  problemVersionId,
  problemId,
}: ProblemSolverProps) {
  assertParams(
    !!problemVersionId || !!problemId,
    "Problem version or problem id is required",
  );
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [judgeResult, setJudgeResult] = useState<JudgeResult>();

  const submit = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await realtimeSubmission({
        code,
        languageId: language,
        problemVersionId,
        problemId,
      });
      console.log(result);
      setJudgeResult(result);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [code, language, problemId, problemVersionId]);

  return (
    <ClientContext>
      <ResizablePanel defaultSize={50} id="code">
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={300}>
            <EntitySelector
              queryAction={getLanguages}
              defaultValue={language}
              onChange={(v) => setLanguage(v)}
              className="h-6 border-none"
            />
            <Editor
              language={language}
              theme="vs-light"
              value={code}
              onChange={(newValue) => setCode(newValue || "")}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
              }}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex flex-col h-full">
              <SubmitResult judgeResult={judgeResult} />
              <div className="px-4 py-2 bg-background border-t flex justify-end">
                <Button onClick={submit} loading={isLoading}>
                  Submit
                </Button>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ClientContext>
  );
}
