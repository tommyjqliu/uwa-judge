import { CONTEST_CID } from "@/lib/constant"    // Unique contest IDs aren't used in our implementation.
import { SubmissionsApi, djConfig } from "@/lib/domjudge-api-client"
import { PrismaClient as DOMjudgeClient } from '@/lib/domjudge-db-client';
import { isFile } from "@/lib/file"
import errorHandler from '@/lib/error-handler';

const submissionsApi = new SubmissionsApi(djConfig)

//export async function POST(
//    request: Request,
//) 
export const POST = errorHandler(async function (request: Request) {
    /* const formData = await request.formData()   // get data from user input
    const problemId = String(formData.get('problemId')) ?? ''
    const language = String(formData.get('language')) ?? ''
    const entryPoint = String(formData.get('entryPoint')) ?? ''
    const files = formData.getAll('files[]').filter(isFile)
    const res = await submissionsApi.postV4AppApiSubmissionAddsubmissionForm(problemId, language, files, entryPoint, String(CONTEST_CID))
    return new Response(JSON.stringify(res.data), {
        status: 200,
    }) */


    return new Response(JSON.stringify("test"), {
        status: 200,
    })
}