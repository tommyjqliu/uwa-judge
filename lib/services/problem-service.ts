import { callProblemToolAndSavePDF, extractAndCheckFile, getHash, rezipDirectory } from "@/lib/file";
import { ProblemsApi, getDjConfig } from "@/lib/domjudge-api-client";
import { CONTEST_CID } from "@/lib/constant";
import {
  domjudgeDB,
  uwajudgeDB,
} from "@/lib/database-client";
import path from "path";
import os from "os"
import fs from "fs-extra"

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

  let buffer = await file.arrayBuffer();
  const tempZipPath = path.join(os.tmpdir(), `${externalid}.zip`);
  const tempDirPath = path.join(os.tmpdir(), externalid);

  await fs.writeFile(tempZipPath, Buffer.from(buffer));

  // Extract and check for problem statement
  const hasProblemFile = await extractAndCheckFile(tempZipPath, tempDirPath);

  if (!hasProblemFile) {
    await fs.remove(tempZipPath);
    await callProblemToolAndSavePDF(file, tempDirPath);
    await rezipDirectory(tempDirPath, tempZipPath);
    buffer = await fs.readFile(tempZipPath);
  }

  await fs.remove(tempZipPath);
  await fs.remove(tempDirPath);

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

export async function getProblemStatement(problemId: string) {
  const problem = await domjudgeDB.problem.findUnique({
    where: {
      externalid: problemId,
    },
  });
  if (!problem) {
    throw new Error("Problem not found");
  }
  return [problem.problemtext_type, problem.problemtext]
}