import errorHandler from "@/lib/error-handler";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { Assignment, StudentsOnAssignments, TutorsOnAssignments, AdminsOnAssignments } from "@prisma/client";
import { uwajudgeDB } from "@/lib/database-client";
import { createAssignment, assignmentSchema } from "@/services/assignment/create-assignment";

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
  const assignment = await createAssignment(parsedData);

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
