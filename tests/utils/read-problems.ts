const problemPath = "./tests/data/problems/";

import { readFile, readdir } from "fs/promises"

export const readProblems = async () => {
    const paths = await readdir(problemPath)
    const nodeFiles = await Promise.all(paths.map(path => readFile(problemPath + path)))
    const fileNames = paths.map(path => path.split("/").pop()?.replace(/\.zip$/, '') || "")
    return nodeFiles.map((file, i) => new File([file], fileNames[i]))
}