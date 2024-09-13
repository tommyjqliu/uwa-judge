import { createProblemVersions } from "@/services/problem-version/create-problem-version";
import { readProblems } from "@/tests/utils/read-problems";

export default async function importProblemVersions() {
    const files = await readProblems();
    return createProblemVersions(files);
}