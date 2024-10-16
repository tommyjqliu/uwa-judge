import { uwajudgeDB } from "@/lib/database-client";
import { assert } from "@/lib/error";

export async function createJudge(submissionId: number) {
  const submission = await uwajudgeDB.submission.findUnique({
    where: {
      id: submissionId,
    },
    include: {
      problem: {
        include: {
          problemVersion: true,
        },
      },
    },
  });
  assert(!!submission, "Submission not found");
  const versionId = (submission.problemVersionId ||
    submission.problem?.problemVersion.id)!;
  assert(!!versionId, "Problem version not found");
  const version = await uwajudgeDB.problemVersion.findUnique({
    where: {
      id: versionId,
    },
    include: {
      testcase: true,
    },
  });
  assert(!!version, "No valid problem version is found");

  return uwajudgeDB.$transaction(async (db) => {
    const judge = await db.judge.create({
      data: {
        submissionId,
        problemVersionId: versionId,
      },
    });

    await db.judgeTask.createMany({
      data: version.testcase.map((testcase) => ({
        judgeId: judge.id,
        testcaseId: testcase.id,
      })),
    });

    return judge;
  });
}
