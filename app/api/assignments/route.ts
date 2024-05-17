import errorHandler from "@/lib/error-handler";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { Assignment,StudentsOnAssignments,TutorsOnAssignments,AdminsOnAssignments } from "@prisma/client";

import { uwajudgeDB } from "@/lib/database-client";
import { createProblems } from "@/lib/services/problem-service";
import { log } from "console";

export const assignmentSchema = zfd.formData({
  title: z.string(),
  description: z.string().optional(),
  publishDate: z.coerce.date().optional(),
  dueDate: z.coerce.date().optional(),
  students: zfd.repeatable(z.coerce.number().array().default([])).optional(),
  tutors:zfd.repeatable(z.coerce.number().array().default([])).optional(),
  admins:zfd.repeatable(z.coerce.number().array().default([])).optional(),
  problems: zfd.repeatable(z.array(zfd.file())), // repearable is nessary for parsing signle file
});

/**
 * @Description: Add an assignment 
 * @Author: Zhiyang
 * @version: 
 * @Date: 2024-04-28 10:27:15
 * @LastEditors: Zhiyang
 * @LastEditTime: Do not Edit
 * @param:
 *    formData:{
 *       "title": string,
 *       "descripiton":string,
 *       "publishDate":Date,
 *       "dueDate":Date,
 *       "admins":x,
 *       "students":x
 *       "students":y
 *       ............
 *       "problems":File
 *       ............
    ]
 *    }
 * @Return: Response
 */
export const POST = errorHandler(async function (request: Request) {

  const parsedData = assignmentSchema.parse(await request.formData());
  const { title, description, publishDate, dueDate, students,tutors,admins, problems } =
    parsedData;
  const assignment = await uwajudgeDB.assignment.create({
    data: {
      title,
      description,
      publishDate,
      dueDate
    },
  });
  let assignmentId = assignment.id;

  if(students){
    //process with students
  const dataStudent = students.map(userId =>({
    assignmentId,
    userId,
  }));
    const st = await uwajudgeDB.studentsOnAssignments.createMany({
      data: dataStudent
    });
  }

  //process with admins
  if(admins){
    const data_admins = admins.map(userId =>({
      assignmentId,
      userId,
    }));
    const ad = await uwajudgeDB.adminsOnAssignments.createMany({
      data: data_admins
    });
  }

  //process with tutors
  if(tutors){
    const data_tutors = tutors.map(userId =>({
      assignmentId,
      userId,
    }));
    const tu = await uwajudgeDB.tutorsOnAssignments.createMany({
      data: data_tutors
    });
  }

  await createProblems(problems, assignment.id);

  return new Response(JSON.stringify(assignment), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
});

/**
 * @Description: Get assignments list
 * @Author: Zhiyang
 * @version: 
 * @Date: 2024-04-28 10:57:07
 * @LastEditors: Zhiyang
 * @LastEditTime: Do not Edit
 * @param:
 * @Return:
 * [
    {
      "id": 1,
      "title": "testWithProblems",
      "description": "testWithProblems",
      "publishDate": null,
      "dueDate": null
    }
  ]
 */
export const GET = errorHandler(async function (request: Request) {
  try {
    const assignmentsFromDB = await uwajudgeDB.assignment.findMany();
    const assignments: Assignment[] = assignmentsFromDB.map(
      (assignmentFromDB) => {
        return {
          id: assignmentFromDB.id,
          title: assignmentFromDB.title,
          description: assignmentFromDB.description,
          publishDate: assignmentFromDB.publishDate,
          dueDate: assignmentFromDB.dueDate,
        };
      },
    );
    return new Response(JSON.stringify(assignments), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to get assignment" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
});
