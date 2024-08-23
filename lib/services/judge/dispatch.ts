import { sendMessage } from "@/lib/broker";
import { uwajudgeDB } from "@/lib/database-client";
import { assert } from "@/lib/error";

export default async function dispatchJudge(judgeId: number) {
    const judge = await uwajudgeDB.judge.findUnique({
        where: {
            id: judgeId,
        },
        include: {
            JudgeTask: {
                include: {
                    Testcase: true,
                },
            },
            Submission: {
                include: {
                    Language: true,
                }
            }
        },
    });

    assert(!!judge, 'Judge not found');

    const result = judge.JudgeTask.map((task) => {
        const compile_config = `{ "script_timelimit": 30, "script_memory_limit": 2097152, "script_filesize_limit": 2621440, "language_extensions": ${JSON.stringify(judge.Submission.Language.extensions)}, "filter_compiler_files": true }`;
        const run_config = `{"time_limit":10.0,"memory_limit":524288,"output_limit":8192,"process_limit":64,"entry_point":null}`;
        const compare_config = `{"script_timelimit":30,"script_memory_limit":2097152,"script_filesize_limit":2621440,"compare_args":null,"combined_run_compare": false}`

        return sendMessage('judgeTask', JSON.stringify({
            judgeId: judge.id,
            judgetaskid: task.id,

            input: task.Testcase.input,
            output: task.Testcase.output,
            code: judge.Submission.code,

            compile_config,
            run_config,
            compare_config,

            compile_script_id: judge.Submission.Language.executableId,
            // TODO: Support sepcial run and compare
            run_script_id: judge.Submission.Language.executableId,
            compare_script_id: judge.Submission.Language.executableId,
        }));
    })

    return Promise.all(result);
}