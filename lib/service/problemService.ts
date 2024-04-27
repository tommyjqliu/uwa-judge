import { getHash, isFile } from '@/lib/file';  
import { ProblemsApi, djConfig } from '@/lib/domjudge-api-client';
import { CONTEST_CID } from '@/lib/constant';
import { domjudgeDB, uwajudgeDB } from '@/lib/database-client';

export default class ProblemService {
  problemsApi: ProblemsApi;

  constructor() {
    this.problemsApi = new ProblemsApi(djConfig);
  }

    async uploadProblemsAndLinkToAssignment(files: File[], assignmentId: number) {
    const fileNames = files.map(file => file.name.replace(/\.zip$/, ''));
    const hashes = await Promise.all(files.map(getHash));
    const existedProblems = await domjudgeDB.problem.findMany({
        where: {
            externalid: {
                in: hashes
            }
        }
    });

    const newProblemIndices = hashes
        .map((hash, i) => existedProblems.some(problem => problem.externalid === hash) ? null : i)
        .filter((i): i is number => i !== null);

    await Promise.all(newProblemIndices.map(async (i) => {
        const file = files[i];
        const buffer = await file.arrayBuffer();
        const newFile = new File([buffer], hashes[i]); // rename the file to its hash
        const addProblemRes = await this.problemsApi.postV4AppApiProblemAddproblemForm(newFile, '', String(CONTEST_CID));
        return addProblemRes.data;
    }));

    const transaction = [
        uwajudgeDB.problem.createMany({
            data: hashes.map((hash, i) => ({ id: hash, name: fileNames[i] })),
            skipDuplicates: true,
        })
    ];

    if (assignmentId) {
        transaction.push(
            uwajudgeDB.problemsOnAssignments.createMany({
                data: hashes.map(hash => ({
                    problemId: hash,
                    assignmentId: +assignmentId,
                })),
                skipDuplicates: true,
            })
        );
    }

    await uwajudgeDB.$transaction(transaction);

    const problems = await uwajudgeDB.problem.findMany({
        where: {
            id: {
                in: hashes
            }
        }
    });
    return new Response(JSON.stringify(problems), { status: 200 });
  }
}

