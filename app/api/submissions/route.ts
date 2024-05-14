import { CONTEST_CID } from "@/lib/constant";
import { domjudgeDB } from "@/lib/database-client";
import { SubmissionsApi, djConfig } from "@/lib/domjudge-api-client";
import errorHandler from "@/lib/error-handler";
import { sleep } from "@/lib/utils";
import { z } from "zod";
import { zfd } from "zod-form-data";

const submissionsApi = new SubmissionsApi(djConfig);

export const POST = errorHandler(async function (request: Request) {
  const formData = await request.formData();

  const {
    problemId,
    language,
    entryPoint,
    code, // submit text code
    files, // submit file code
  } = zfd
    .formData({
      problemId: z.string(),
      language: z.string(),
      entryPoint: z.string().default(""),
      code: z.string().optional(),
      files: zfd.repeatable(z.array(zfd.file())),
    })
    .parse(formData);

  const domjudgeProblem = await domjudgeDB.problem.findUnique({
    where: {
      externalid: problemId,
    },
  });

  if (code) {
    const languageEntity = await domjudgeDB.language.findUnique({
      where: {
        externalid: language,
      },
    });
    const extensions: string[] | null = JSON.parse(
      languageEntity?.extensions || "null",
    );
    const file = new File(
      [new Blob([code], { type: "text/plain" })],
      `main.${extensions?.[0]}`,
    );
    files.push(file);
  }

  if (!domjudgeProblem) {
    return new Response(
      JSON.stringify({
        message: "Problem not found",
      }),
      {
        status: 404,
      },
    );
  }

  const res = await submissionsApi.postV4AppApiSubmissionAddsubmissionForm(
    domjudgeProblem.probid.toString(),
    language,
    files,
    entryPoint,
    String(CONTEST_CID),
  );
  await sleep(1000);

  let judging = await domjudgeDB.judging.findFirst({
    where: {
      submitid: +res.data.id!,
    },
  });

  while (!judging?.result) {
    await sleep(1000);
    judging = await domjudgeDB.judging.findFirst({
      where: {
        submitid: +res.data.id!,
      },
    });
  }

  const judgingRuns = await domjudgeDB.judging_run.findMany({
    where: { judgingid: judging!.judgingid },
  });

  const testcaseResults = await Promise.all(
    judgingRuns.map(async (run) => {
      const output = await domjudgeDB.judging_run_output.findFirst({
        where: { runid: run.runid },
      });
      return {
        runid: run.runid,
        result: run.runresult,
        output_run: output?.output_run?.toString(),
        output_diff: output?.output_diff?.toString(),
        output_error: output?.output_error?.toString(),
        output_system: output?.output_system?.toString(),
      };
    }),
  );

  return new Response(JSON.stringify({ judging, testcaseResults }), {
    status: 200,
  });
});
