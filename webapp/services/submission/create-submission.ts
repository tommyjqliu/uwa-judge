import { uwajudgeDB } from "@/lib/database-client";
import { assert, ParamsInvalidError } from "@/lib/error";

// Todo: improve relationship between problem and problemVersion
export interface SubmissionOptions {
    code: string;
    languageId: string;
    problemVersionId?: number;
    problemId?: number;
}

export async function createSubmission(options: SubmissionOptions) {
    const {
        code,
        languageId,
        problemVersionId,
        problemId,
    } = options;

    // const userId = (await getUser())?.userId; // temp setting
    // const user = await uwajudgeDB.user.findUnique({
    //     where: {
    //         id: userId,
    //     },
    // });
    // assert(!userId || !!user, "Invalid user id", ParamsInvalidError); // After writing user mock for test

    const language = await uwajudgeDB.language.findUnique({
        where: {
            id: languageId,
        },
    });

    const problem = problemId && await uwajudgeDB.problem.findUnique({
        where: {
            id: problemId,
        },
    });

    const problemVersion = problemVersionId && await uwajudgeDB.problemVersion.findUnique({
        where: {
            id: problemVersionId,
        },
    });

    assert(!!language, "Language not found", ParamsInvalidError);
    assert([problemVersion, problem].filter(i => i).length == 1, "Submission is either connect with a problemVersion or a problem", ParamsInvalidError);

    const submission = await uwajudgeDB.submission.create({
        data: {
            code,
            languageId,
            // userId,
            problemVersionId,
        },
    });

    return submission;
} 