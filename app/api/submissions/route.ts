import { CONTEST_CID } from "@/lib/constant"
import { SubmissionsApi, djConfig } from "@/lib/domjudge-api-client"
import { isFile } from "@/lib/file"

const submissionsApi = new SubmissionsApi(djConfig)

export async function POST(
    request: Request,
) {
    const formData = await request.formData()
    const problemId = String(formData.get('problemId')) ?? ''
    const language = String(formData.get('language')) ?? ''
    const entryPoint = String(formData.get('entryPoint')) ?? ''
    const files = formData.getAll('files[]').filter(isFile)
    const res = await submissionsApi.postV4AppApiSubmissionAddsubmissionForm(problemId, language, files, entryPoint, String(CONTEST_CID))
    return new Response(JSON.stringify(res.data), {
        status: 200,
    })
}