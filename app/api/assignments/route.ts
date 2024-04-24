import errorHandler from "@/lib/error-handler";
import { object, z } from "zod";
import { zfd } from "zod-form-data";
import { AssignmentRole } from "@prisma/client";

export const assignmentSchema = zfd.formData({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.date().optional(),
    dueDate: z.date().optional(),
    users: zfd.json((z.object({
        userId: z.string(),
        role: z.enum(Object.values(AssignmentRole) as [string])
    }).array())).optional(),
    problems: zfd.json(z.object({
        file: zfd.file(),
    }).array()).optional(),

});

export const POST = errorHandler(async function (request: Request) {
    const { title, description, publishDate, dueDate, users, problems } = assignmentSchema.parse(await request.formData())

    return new Response(JSON.stringify({ message: "Implementing" }), {
        status: 200,
    })

})