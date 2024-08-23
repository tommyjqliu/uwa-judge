import { uwajudgeDB } from "@/lib/database-client";
import { assert } from "@/lib/error";
import { getHash } from "@/lib/file";
import { withZipFile } from "@/lib/zip";
import { TestCaseType } from "@prisma/client";

export const importProblemVersion = (file: File) => withZipFile(file, async (zip) => {
    const hash = await getHash(file);
    const existVersion = await uwajudgeDB.problemVersion.findFirst({
        where: {
            hash,
        },
    });

    if (existVersion) {
        return existVersion;
    }

    const yamlFile = 'problem.yaml';
    const tleFile = '.timelimit';
    const submissionFile = 'submissions.json';

    const problemYaml = zip.readFileString(yamlFile);
    // TODO: Obtain Statement

    const testCases = (['sample', 'secret'] as TestCaseType[]).map((type) =>
        zip.getEntries(`data/${type}`).filter((entry) => entry.endsWith('.in')).map((inputPath) => {
            const name = inputPath.match(/\/([^/]+)\.in$/)?.[1] ?? '';
            const outputPath = inputPath.replace(/\.in$/, '.ans');
            const input = zip.readFileString(inputPath)!;
            const output = zip.readFileString(outputPath)!;
            // TODO: Obtain image, description
            // TODO: maybe rank the case
            return {
                name,
                input,
                output,
                type,
            }
        })
    ).flat();

    assert(testCases.length > 0, 'No test case found');

    return uwajudgeDB.problemVersion.create({
        data: {
            hash,
            file: Buffer.from(await file.arrayBuffer()),
            testcase: {
                createMany: {
                    data: testCases,
                }
            },
        }
    });
})

export default importProblemVersion;