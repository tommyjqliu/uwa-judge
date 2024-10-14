"use client"
import ClientContext from "@/components/client-context";
import EntitySelector from "@/components/entity-selector";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { assertParams } from "@/lib/error";
import type { getJudgeResult } from "@/services/judge/get-judge-result";
import getLanguages from "@/services/language/get-languages";
import realtimeSubmission from "@/services/submission/realtime-submission";
import { Editor } from "@monaco-editor/react";
import { useCallback, useState } from "react";

interface ProblemSolverProps {
  problemVersionId?: number;
  problemId?: number;
}

export default function ProblemSolver({ problemVersionId, problemId }: ProblemSolverProps) {
  assertParams(!!problemVersionId || !!problemId, "Problem version or problem id is required");
  const [language, setLanguage] = useState("py3");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [judgeResult, setJudgeResult] = useState<Awaited<ReturnType<typeof getJudgeResult>>>();

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
            <EntitySelector queryAction={getLanguages} defaultValue={language} onChange={(v) => setLanguage(v)} className="h-6 border-none" />
            <Editor
              language={language}
              theme='vs-light'
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
              <div className="flex-1 p-4 overflow-y-auto">
                {judgeResult ? (
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          className="text-gray-200 stroke-current"
                          strokeWidth="10"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                        ></circle>
                        <circle
                          className={`${judgeResult.pass === judgeResult.total ? 'text-green-500' : 'text-red-500'} progress-ring stroke-current`}
                          strokeWidth="10"
                          strokeLinecap="round"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="transparent"
                          strokeDasharray={`${(judgeResult.pass / judgeResult.total) * 251.2} 251.2`}
                          transform="rotate(-90 50 50)"
                        ></circle>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold">{judgeResult.pass} / {judgeResult.total}</span>
                      </div>
                    </div>
                    {judgeResult.errorMessage && (
                      <div className="mt-4 text-red-500">{judgeResult.errorMessage}</div>
                    )}
                    {judgeResult.errorDiff && (
                      <div className="mt-2 text-gray-600">{judgeResult.errorDiff}</div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p>No results yet. Submit your code to see the outcome.</p>
                  </div>
                )}
              </div>
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
  )
}