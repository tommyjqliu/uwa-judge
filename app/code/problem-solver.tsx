"use client"
import ClientContext from "@/lib/components/client-context";
import EntitySelector from "@/lib/components/entity-selector";
import { Editor } from "@monaco-editor/react";
import { Button, MenuItem, Select } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useState } from "react";

export interface ProblemSolverProps {
    problemId: string;
}

export default function ProblemSolver({ problemId }: ProblemSolverProps) {
    const [language, setLanguage] = useState('python');
    const [code, setCode] = useState('');
    const submit = useCallback(() => {
        axios.postForm('/api/submissions', {
            problemId,
            language: language,
            code,
        })
    }, [code, language, problemId]);

    return (
        <ClientContext>
            <div>
                <div>
                    {/* Todo: Problem Statement */}
                </div>
                <div>
                    <div>
                        <div>
                            <EntitySelector
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as string)}
                                entityQuery={{
                                    db: "DOMjudgeDB",
                                    entity: "language",
                                    where: { allow_submit: { equals: true } }
                                }}
                            />
                            <Editor
                                width="100%"
                                height="400px"
                                language={language}
                                theme="vs-dark"
                                value={code}
                                onChange={(newValue) => setCode(newValue || '')}
                                options={{
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                }}
                            />
                        </div>
                        <div>
                            <div>
                                <Button onClick={submit}>Submit</Button>
                                <Button>Upload Files</Button>
                            </div>

                        </div>
                    </div>
                    <div>
                        {/* Todo: Submit and Feedback */}
                    </div>
                </div>
            </div>
        </ClientContext>
    )
}