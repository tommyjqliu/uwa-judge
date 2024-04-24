import { getHash, isFile } from '@/lib/file';
import { ProblemsApi, djConfig } from '@/lib/domjudge-api-client';
import { CONTEST_CID } from '@/lib/constant';
import errorHandler from '@/lib/error-handler';
import { PrismaClient as DOMjudgeClient } from '@/lib/domjudge-db-client';

const problemsApi = new ProblemsApi(djConfig)

export const POST = errorHandler(async function (request: Request) {
    const formData = await request.formData()
    const assignmentId = String(formData.get('assignmentId')) ?? ''
    const files = formData.getAll('files').filter(isFile)
    const hashes = await Promise.all(files.map(getHash))

    const responses = await Promise.all(files.map(async (file, i) => {
        const buffer = await file.arrayBuffer()
        const newFile = new File([buffer], hashes[i]) // rename the file to its hash
        const addProblemRes = await problemsApi.postV4AppApiProblemAddproblemForm(newFile, '', String(CONTEST_CID))
        return addProblemRes.data;
    }));

    return new Response(JSON.stringify(responses), {
        status: 200,
    })
})