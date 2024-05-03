import { PrismaClient as UWAjudgeClient } from '@prisma/client';
import { isFile } from "@/lib/file"
import errorHandler from '@/lib/error-handler';

export const uwajudgeDB = new UWAjudgeClient()


export const POST = errorHandler(async function (request: Request) {
    const formData = await request.formData()   // get data from user input

    const problemId = String(formData.get('problemId')) ?? ''
    const assignmentID = String(formData.get('assignmentID')) ?? ''
    const language = String(formData.get('language')) ?? ''
    const files = formData.getAll('files').filter(isFile)
    if(files == null){
        throw new Error("No Files Specified")
    }
    const res = await submissionsApi.postV4AppApiSubmissionAddsubmissionForm(problemId, language, files, entryPoint, String(CONTEST_CID))
    
    return new Response(JSON.stringify(res.data), {
        status: 200
    })
})