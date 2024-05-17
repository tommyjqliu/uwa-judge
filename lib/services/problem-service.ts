import { getHash, isFile } from "@/lib/file";
import { ProblemsApi, getDjConfig } from "@/lib/domjudge-api-client";
import { CONTEST_CID } from "@/lib/constant";
import {
  RuntimeClient,
  UWAjudgeDB,
  domjudgeDB,
  uwajudgeDB,
} from "@/lib/database-client";



export async function uploadProblemToDomjudge(file: File) {
  const externalid = await getHash(file);
  const existedProblem = await domjudgeDB.problem.findUnique({
    where: {
      externalid,
    },
  });

  if (existedProblem) {
    return externalid;
  }

  const buffer = await file.arrayBuffer();
  const newFile = new File([buffer], externalid); // rename the file to its hash
  await (new ProblemsApi(getDjConfig())).postV4AppApiProblemAddproblemForm(
    newFile,
    "",
    String(CONTEST_CID),
  );

  return externalid;
}

export async function createProblems(files: File[], assignmentId?: number) {
  const fileNames = files.map((file) => file.name.replace(/\.zip$/, ""));
  const externalids = await Promise.all(
    files.map(async (file) => uploadProblemToDomjudge(file)),
  );

  await uwajudgeDB.problem.createMany({
    data: externalids.map((hash, i) => ({ id: hash, name: fileNames[i] })),
    skipDuplicates: true,
  });

  if (assignmentId) {
    await uwajudgeDB.problemsOnAssignments.createMany({
      data: externalids.map((hash) => ({
        problemId: hash,
        assignmentId: +assignmentId,
      })),
      skipDuplicates: true,
    });
  }

  const problems = await uwajudgeDB.problem.findMany({
    where: {
      id: {
        in: externalids,
      },
    },
  });

  return problems;
}

export async function readProblems() {}
