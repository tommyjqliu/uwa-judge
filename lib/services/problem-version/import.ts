import { uwajudgeDB } from "@/lib/database-client";
import { assert, ParamsInvalidError } from "@/lib/error";
import { getHash } from "@/lib/file";
import { withZipFile } from "@/lib/zip";
import { Executable, TestCaseType } from "@prisma/client";
import { parseLegacyMetadata } from "./metadata/legacy";
import path from "path";
import createExecutable from "../executable/create";

/**
 * 
 * @param file Problem zip in Kattis format
 * https://icpc.io/problem-package-format/spec/2023-07-draft.html
 * https://www.problemarchive.org/wiki/index.php/Introduction_to_the_Kattis_Problem_Format
 * @returns 
 */
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
    const problemYaml = zip.readFileString(yamlFile);
    assert(!!problemYaml, 'problem.yaml is required');
    const metadata = parseLegacyMetadata(problemYaml);
    
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

    assert(testCases.filter(i => i.type === 'secret').length > 0, 'At least one secret test case is required');

    let combinedRunCompare = false;
    let outputValidator: Executable | undefined;
    if (metadata.validation.includes('custom')) {
        if (metadata.validation.includes('interactive')) {
            combinedRunCompare = true;
        }

        const filePaths = zip.getFullEntries('output_validators');
        const firstDir = path.dirname(filePaths[0]);
        assert(filePaths.every(filePath => path.dirname(filePath) === firstDir), 'All output validators must be in the same directory');
        outputValidator = await createExecutable(`Validator for Problem ${metadata.name} ${hash}`, 'Special Validator', combinedRunCompare ? 'run' : 'compare', filePaths);
    }


    // TODO: Obtain Statement
    // TODO: Submit example submission

    return uwajudgeDB.problemVersion.create({
        data: {
            hash,
            metadata,
            combinedRunCompare,
            file: Buffer.from(await file.arrayBuffer()),
            testcase: {
                createMany: {
                    data: testCases,
                }
            },
            outputValidator: outputValidator ? {
                connect: {
                    id: outputValidator.id,
                }
            } : undefined,
        }
    });
})

export default importProblemVersion;