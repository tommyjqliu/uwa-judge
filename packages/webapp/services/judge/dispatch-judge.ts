import { sendMessages } from "@/lib/broker";
import { uwajudgeDB } from "@/lib/database-client";
import { assert } from "@/lib/error";
/**
 * refs: Domjudge@8.2.2: maybeCreateJudgeTasks
 * Still need cleanup later
 * @param judgeId
 * @returns
 */
export default async function dispatchJudge(judgeId: number) {
  const judge = await uwajudgeDB.judge.findUnique({
    where: {
      id: judgeId,
    },
    include: {
      judgeTask: {
        include: {
          testcase: true,
        },
      },
      submission: {
        include: {
          language: true,
        },
      },
      problemVersion: {
        include: {
          outputValidator: true,
        },
      },
    },
  });
  assert(!!judge, "Judge not found");

  const problem = judge.problemVersion;
  const messages = judge.judgeTask.map((task) => {
    const compile_config = `{ "script_timelimit": 30, "script_memory_limit": 2097152, "script_filesize_limit": 2621440, "language_extensions": ${JSON.stringify(judge.submission.language.extensions)}, "filter_compiler_files": true, "hash": "1sdf23sdf4f56" }`;
    const run_config = `{"time_limit":10.0,"memory_limit":524288,"output_limit":8192,"process_limit":64,"entry_point":null, "hash": "123asdf45sfd6"}`;
    const compare_config = `{"script_timelimit":30,"script_memory_limit":2097152,"script_filesize_limit":2621440,"compare_args":null,"combined_run_compare": ${problem.combinedRunCompare}, "hash": "1234sdf5f6"}`;

    return JSON.stringify({
      uuid: "1sdf2sdf3",
      jobid: judge.id,
      judgeId: judge.id,
      judgetaskid: task.id,
      submitid: judge.submission.id,
      testcase_id: task.testcase.id.toString(),
      testcase_hash: "1sdf2314",
      input: task.testcase.input,
      output: task.testcase.output,
      code: Buffer.from(judge.submission.code).toString("base64"),
      stop_on_error: judge.stopOnError,

      compile_config,
      run_config,
      compare_config,

      compile_script_id: judge.submission.language.executableId,
      run_script_id:
        (problem.combinedRunCompare && problem.outputValidator?.id) || "run",
      compare_script_id: problem.outputValidator?.id || "compare",
    });
  });

  return sendMessages("judge_task", messages);
}
