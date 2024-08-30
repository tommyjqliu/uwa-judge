import PdfReader from "@/lib/components/pdf-reader";
import { uwajudgeDB } from "@/lib/database-client";
import { assert } from "@/lib/error";
import { Card, CardContent, MenuItem, Select } from "@mui/material";
import CodeEditor from "./code-editor";
import CodeResult from "./code-result";

interface CodeModuleProps {
    problemId?: number;
    problemVersionId?: number;
    submissionId?: number;
}
/**
 * One of problemId or problemVersionId must be provided.
 * @param param0 
 * @returns 
 */
export default async function CodeModule({ problemId, problemVersionId, submissionId }: CodeModuleProps) {
    const problemVersion = problemVersionId ? await uwajudgeDB.problemVersion.findUnique({
        where: {
            id: problemVersionId,
        }
    }) : (await uwajudgeDB.problem.findUnique({
        where: {
            id: problemId,
        },
        include: {
            problemVersion: true,
        }
    }))?.problemVersion;

    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardContent className="h-[450px]">
                    <PdfReader url={`api/problems/${problemId}/statement`} />
                </CardContent>
            </Card>
            <Card>
                <CardContent className="h-[450px]">
                    <CodeEditor problemId={problemId} problemVersionId={problemVersionId} />
                    <CodeResult submissionId={submissionId} />
                </CardContent>
            </Card>
        </div>
    )
}