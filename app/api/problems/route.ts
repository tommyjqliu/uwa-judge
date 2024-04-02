import { getHash, isFile } from '@/lib/file';
import { ProblemsApi, djConfig } from '@/lib/domjudge-client';
const problemsApi = new ProblemsApi(djConfig)

export async function POST(request: Request) {

    const formData = await request.formData()
    const files = formData.getAll('files').filter(isFile)

    await Promise.all(files.map(async (file) => {
        const hash = await getHash(file)
        const fileName = file.name.replace(/\.zip$/, '')
        const buffer = await file.arrayBuffer()
        const newFile = new File([buffer], hash) // rename the file to its hash
        const addProblemRes = await problemsApi.postV4AppApiGeneralinfoAddproblemForm(newFile, '')
        const problemId = String(addProblemRes.data.problem_id)
        const linkProblemRes = await problemsApi.putV4AppApiProblemLinkproblem({
            label: fileName
        }, problemId, '1')
        console.log(linkProblemRes.data)
    }));

    return new Response('Hello, Next.js!!!', {
        status: 200,
    })
}