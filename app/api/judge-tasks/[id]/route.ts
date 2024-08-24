import { uwajudgeDB } from "@/lib/database-client";
import { decodeBase64 } from "@/lib/utils";
import { z } from "zod";
import { zfd } from "zod-form-data";

const schema = zfd.formData({
    compile_success: z.string().transform((value) => !!value).optional(),
    output_compile: z.string().optional(),
    compile_metadata: z.string().transform((value) => decodeBase64(value)).optional(),
    entry_point: z.string().optional(),
    runresult: z.string().optional(),
    runtime: z.string().transform((value) => Number(value)).optional(),
    output_run: z.string().transform((value) => decodeBase64(value)).optional(),
    output_error: z.string().transform((value) => decodeBase64(value)).optional(),
    output_system: z.string().transform((value) => decodeBase64(value)).optional(),
    metadata: z.string().transform((value) => decodeBase64(value)).optional(),
    output_diff: z.string().transform((value) => decodeBase64(value)).optional(),
});

export async function PUT(request: Request, context: { params: { id: string } }) {
    const formData = await request.formData();
    const data = schema.parse(formData);
    console.log(Number(context.params.id), data)
    const transformedData = {
        compileSuccess: data.compile_success,
        compileOutput: data.output_compile,
        compileMetadata: data.compile_metadata,
        runResult: data.runresult,
        runTime: data.runtime,
        runOutput: data.output_run,
        runError: data.output_error,
        runSystem: data.output_system,
        runMetadata: data.metadata,
        runDiff: data.output_diff,
    };

    const filteredData = Object.fromEntries(Object.entries(transformedData).filter(([_, v]) => v !== undefined));

    await uwajudgeDB.judgeTask.update({
        where: {
            id: Number(context.params.id),
        },
        data: filteredData,
    });

    return new Response('ok', {
        status: 200,
    });
}