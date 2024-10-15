import { zfd } from "zod-form-data";
import { z } from "zod";

export const assignmentFormData = zfd.formData({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date().optional(),
    dueDate: z.coerce.date().optional(),
    students: zfd.repeatable(z.coerce.number().array().default([])).optional(),
    tutors: zfd.repeatable(z.coerce.number().array().default([])).optional(),
    admins: zfd.repeatable(z.coerce.number().array().default([])).optional(),
    problems: zfd.repeatable(z.array(zfd.file())), // repearable is nessary for parsing single file
});