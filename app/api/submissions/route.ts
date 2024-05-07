import { CONTEST_CID } from "@/lib/constant"
import { domjudgeDB } from "@/lib/database-client"
import { SubmissionsApi, djConfig } from "@/lib/domjudge-api-client"
import { z } from "zod"
import { zfd } from "zod-form-data"

const submissionsApi = new SubmissionsApi(djConfig)

export async function POST(
    request: Request,
) {
    const formData = await request.formData()

    const {
        problemId,
        language,
        entryPoint,
        code, // submit text code
        files, // submit file code
    } = zfd.formData({
        problemId: z.string(),
        language: z.string(),
        entryPoint: z.string().default(""),
        code: z.string().optional(),
        files: zfd.repeatable(z.array(zfd.file())),
    }).parse(formData)

    const domjudgeProblem = await domjudgeDB.problem.findUnique({
        where: {
            externalid: problemId
        }
    })

    if (code) {
        const languageEntity = await domjudgeDB.language.findUnique({
            where: {
                externalid: language
            }
        })
        const extensions: string[] | null = JSON.parse(languageEntity?.extensions || "null")
        const file = new File([new Blob([code], { type: 'text/plain' })], `main.${extensions?.[0]}`)
        files.push(file)
    }

    if (!domjudgeProblem) {
        return new Response(JSON.stringify({
            message: 'Problem not found'
        }), {
            status: 404,
        })
    }

    const res = await submissionsApi.postV4AppApiSubmissionAddsubmissionForm(domjudgeProblem.probid.toString(), language, files, entryPoint, String(CONTEST_CID))

    return new Response(JSON.stringify(res.data), {
        status: 200,
    })
}