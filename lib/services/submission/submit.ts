import { getUser } from "@/lib/auth/session";
import { uwajudgeDB } from "@/lib/database-client";
import { assert, ParamsInvalidError } from "@/lib/error";
import { version } from "os";
import versionInAssignment from "../problem/version-in-asignment";

// Todo: improve relationship between problem and problemVersion
interface SubmissionOptions {
    problemVersionId: number;
    languageId: string;
    code: string;
    assignmentId?: number;
}

export async function postSubmission(options: SubmissionOptions) {
    const {
        problemVersionId,
        languageId,
        code,
        assignmentId,
    } = options;

    const userId = Number((await getUser())?.userId) || 1; // temp setting
    const user = await uwajudgeDB.user.findUnique({
        where: {
            id: userId,
        },
    });
    
    const language = await uwajudgeDB.language.findUnique({
        where: {
            id: languageId,
        },
    });
    
    const problemVersion = await uwajudgeDB.problemVersion.findUnique({
        where: {
            id: problemVersionId,
        },
    });

    !!assignmentId && assert(
         await versionInAssignment(problemVersionId, assignmentId),
        "Problem version not in assignment",
        ParamsInvalidError
    );
    assert(!!language, "Language not found", ParamsInvalidError);
    assert(!!problemVersion, "Problem version not found", ParamsInvalidError);

    const submission = await uwajudgeDB.submission.create({
        data: {
            code,
            languageId,
            userId,
            problemVersionId,
            assignmentId,
        },
    });
    
    return submission;
} 