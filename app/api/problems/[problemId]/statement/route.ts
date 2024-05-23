import { domjudgeDB } from "@/lib/database-client";
import errorHandler from "@/lib/error-handler";
import { getProblemStatement } from "@/lib/services/problem-service";

export const GET = errorHandler(async function (request: Request, { params }: { params: { problemId: string } }) {
    const { problemId } = params;
    const [type, statement] = await getProblemStatement(problemId); // todo: support html txt
    return new Response(statement, {
        status: 200,
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename="${problemId}.pdf"`,
        },
    });
})