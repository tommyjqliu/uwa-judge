import { readFile, readdir } from "fs/promises";

const problemPath = "./prisma/test-problem";

export const readProblems = async () => {
  const paths = await readdir(problemPath);
  const nodeFiles = await Promise.all(
    paths.map((path) => readFile(problemPath + "/" + path)),
  );
  const fileNames = paths.map((path) => path.split("/").pop() || "");
  return nodeFiles.map((file, i) => new File([file], fileNames[i]));
};

export const readProblem = async (problemName: string) => {
  const file = await readFile(problemPath + "/" + problemName);
  return new File([file], problemName);
};
