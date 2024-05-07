import { domjudgeDB } from "@/lib/database-client";
import { judging_run, judging_run_output } from "@/lib/domjudge-db-client";


type BufferToString<T> = {
    [K in keyof T]: T[K] extends Buffer | null ? string : T[K];
};

type ParsedOutput = BufferToString<judging_run_output>


export async function GET(
    request: Request,
) {
    const submissionId = 30;
    const judging = await domjudgeDB.judging.findMany({
        where: {
            submitid: submissionId
        }
    })

    // console.log(judging)
    const judgingRuns = await domjudgeDB.judging_run.findMany({
        where: {
            judging: {
                submitid: submissionId
            }
        },
        include: {
            judging_run_output: true,
            testcase: {
                include: {
                    testcase_content: true
                }
            }
        }
    })
    type ParsedRun = typeof judgingRuns[0] & {
        judging_run_output: ParsedOutput

    }
    const parsedRuns: ParsedRun[] = judgingRuns.map(run => {
        const parsedRun = {
            ...run
        }
        const output: any = run.judging_run_output
        const parsedOutput: any = {}
        if (output) {
            for (const key in output) {
                if (output[key] !== null && output[key] instanceof Buffer) {
                    parsedOutput[key] = output[key].toString()
                }
            }
            parsedRun.judging_run_output = parsedOutput
        }
        return parsedRun as any as ParsedRun
    })

    console.log(parsedRuns[0].testcase?.testcase_content[0]?.output?.toString())

    return new Response(JSON.stringify(parsedRuns), {
        headers: {
            "content-type": "application/json",
        },
    });
}