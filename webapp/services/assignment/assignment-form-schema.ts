import { zfd } from "zod-form-data";
import { z } from "zod";

export const assignmentFormData = zfd.formData({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date().optional(),
    dueDate: z.coerce.date().optional(),
    students: z.string().optional(),
    tutors: z.string().optional(),
    admins: z.string().optional(),
    problems: zfd.repeatable(z.array(zfd.file())), // repearable is nessary for parsing single file
}).transform(data => {
    const students = data.students?.split(/[\s,]+/);
    const tutors = data.tutors?.split(/[\s,]+/);
    const admins = data.admins?.split(/[\s,]+/);
    return {
        ...data,
        students,
        tutors,
        admins
    }
});

export default assignmentFormData;  