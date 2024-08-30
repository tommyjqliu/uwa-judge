import { uwajudgeDB } from "@/lib/database-client";
import { getHash } from "@/lib/file";
import batchImportProblemVersion from "@/lib/services/problem-version/batch-import";
import { readProblems } from "@/tests/utils/read-problems";

export default async function importProblemVersion() {
    const files = await readProblems();
    return batchImportProblemVersion(files);
}