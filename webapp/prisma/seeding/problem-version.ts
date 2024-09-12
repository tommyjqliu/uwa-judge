import { createProblemVersions } from "@/lib/services/problem-version/create-problem-version";

import { readProblems } from "@/tests/utils/read-problems";

export default async function importProblemVersion() {
    const files = await readProblems();
    return createProblemVersions(files);
}