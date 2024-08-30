import { z } from "zod";
import { zfd } from "zod-form-data";
import { uwajudgeDB } from "@/lib/database-client";
import { createProblemVersions } from "../problem-version/create-problem-version";
import { assert } from "@/lib/error";

export const assignmentSchema = zfd.formData({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.coerce.date().optional(),
    dueDate: z.coerce.date().optional(),
    students: zfd.repeatable(z.coerce.number().array().default([])).optional(),
    tutors: zfd.repeatable(z.coerce.number().array().default([])).optional(),
    admins: zfd.repeatable(z.coerce.number().array().default([])).optional(),
    problems: zfd.repeatable(z.array(zfd.file())), // repearable is nessary for parsing signle file
});

export async function createAssignment(data: z.infer<typeof assignmentSchema>) {
    const { title, description, publishDate, dueDate, students, tutors, admins, problems } = data;
    
    const problemVersion = await createProblemVersions(problems);
    assert(!!problemVersion.length, 'Assignment must have problems');

    const assignment = await uwajudgeDB.assignment.create({
        data: {
            title,
            description,
            publishDate,
            dueDate,
            problems: {
                createMany: {
                    data: problemVersion.map(pv => ({
                        problemVersionId: pv.id,
                    }))
                }
            }
        }
    });

    let assignmentId = assignment.id;

    if (students) {
        //process with students
        const dataStudent = students.map(userId => ({
            assignmentId,
            userId,
        }));
        const st = await uwajudgeDB.studentsOnAssignments.createMany({
            data: dataStudent
        });
    }

    //process with admins
    if (admins) {
        const data_admins = admins.map(userId => ({
            assignmentId,
            userId,
        }));
        const ad = await uwajudgeDB.adminsOnAssignments.createMany({
            data: data_admins
        });
    }

    //process with tutors
    if (tutors) {
        const data_tutors = tutors.map(userId => ({
            assignmentId,
            userId,
        }));
        const tu = await uwajudgeDB.tutorsOnAssignments.createMany({
            data: data_tutors
        });
    }


    return assignment

}