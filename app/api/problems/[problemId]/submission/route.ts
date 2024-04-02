import { SubmissionsApi, djConfig } from "@/lib/domjudge-client"
import { isFile } from "@/lib/file"

const submissionsApi = new SubmissionsApi(djConfig)

export async function POST(
    request: Request,
    { params: { problemId } }: { params: { problemId: string } }
) {
    const formData = await request.formData()
    const language = String(formData.get('language')) ?? ''
    const files = formData.getAll('files[]').filter(isFile)
    const res = await submissionsApi.postV4AppApiSubmissionAddsubmissionForm(problemId, language, files, files[0].name, '1')
    console.log(res)
    return new Response('Hello, Next.js!!!', {
        status: 200,
    })
}