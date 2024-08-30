import { uwajudgeDB } from "@/lib/database-client";
import { assert, ParamsInvalidError } from "@/lib/error";
import { Problem2PDF, getHash } from "@/lib/file";
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
export const createProblemVersion = (file: File) => withZipFile(file, async (zip) => {
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
    const fileName = file.name.replace(/\.[^/.]+$/, "");
    const name = metadata.name || fileName;
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
        outputValidator = await createExecutable(`${name}-${hash}`, `Validator for Problem ${name}`, combinedRunCompare ? 'run' : 'compare', filePaths);
    }

    // Obtain Statement
    const statementPaths = zip.getEntries('problem_statement');
    const pdfPath = statementPaths.find(path => path.endsWith('en.pdf'));
    let pdf: File | undefined;
    if (pdfPath) {
        pdf = zip.readFile(pdfPath)!;
    } else {
        pdf = await Problem2PDF(file!);
    }

    assert(!!pdf, 'pdf is required');
    const pdfHash = await getHash(pdf);

    let problemStatement = await uwajudgeDB.problemStatement.findUnique({
        where: {
            hash: pdfHash,
        }
    });
    if (!problemStatement) {
        problemStatement = await uwajudgeDB.problemStatement.create({
            data: {
                file: Buffer.from(await pdf.arrayBuffer()),
                hash: pdfHash,
            }
        });
    }

    // TODO: Submit example submission
    return uwajudgeDB.problemVersion.create({
        data: {
            name,
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
            problemStatement: {
                connect: {
                    hash: problemStatement.hash,
                }
            }

        }
    });
})

export default createProblemVersion;


export function createProblemVersions(files: File[]) {
    return Promise.all(files.map(createProblemVersion));
}