import { CONTEST_CID } from "@/lib/constant"    // Unique contest IDs aren't used in our implementation.
import { SubmissionsApi, djConfig } from "@/lib/domjudge-api-client"
import { PrismaClient as DOMjudgeClient } from '@/lib/domjudge-db-client';
import { isFile } from "@/lib/file"
import errorHandler from '@/lib/error-handler';

const djSubmissionsApi = new SubmissionsApi(djConfig)

export const POST = errorHandler(async function (request: Request) {
    const formData = await request.formData()   // get data from user input
    
    const problemId = String(formData.get('problemId')) ?? ''
    const language = String(formData.get('language')) ?? ''
    const entryPoint = String(formData.get('entryPoint')) ?? ''
    const files = formData.getAll('files').filter(isFile)
    if(files == null){
        throw new Error("No Files Specified")
    }
    const res = await djSubmissionsApi.postV4AppApiSubmissionAddsubmissionForm(problemId, language, files, entryPoint, String(CONTEST_CID))
    
    return new Response(JSON.stringify(res.data), {
        status: 200
    })
})