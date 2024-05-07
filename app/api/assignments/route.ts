import errorHandler from "@/lib/error-handler";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { AssignmentRole, Assignment } from '@prisma/client';
import ProblemService from "@/lib/service/problemService";
import { uwajudgeDB } from "@/lib/database-client";

const problemService = new ProblemService();

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
 *       "users":[{"userId": "1", "role": "TEACHER"},{"userId": "2","role": "STUDENT"}],
 *       "problems":List<File>
    ]
 *    }
 * @Return: Response
 */
export const POST = errorHandler(async function (request: Request) {

  const parsedData = assignmentSchema.parse(await request.formData());
  console.log("json!");
  console.log(request.json());
  const { title, description, publishDate, dueDate, users, problems } = parsedData;
  console.log(parsedData);
  try {

    const newAssignment = await uwajudgeDB.assignment.create({
      data: {
        title,
        description,
        publishDate: publishDate ? new Date(publishDate) : undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      }
    });
    let assignmentId: number = newAssignment.id;
    console.log("assignment created assignmentID:", assignmentId);
    if (users) {
      console.log("catch users' information");
      const usersData = users.map(user => ({
        assignmentId: assignmentId,
        userId: Number(user.userId),
        roles: user.role
      }));
      if (usersData.length > 0) {
        const result = await uwajudgeDB.usersOnAssignments.createMany({
          data: usersData,
          skipDuplicates: true
        });
        console.log(result);
      }
    }


    if (problems) {
      console.log("catch problems information");
      // Extract only the file objects from the problems array
      const problemFiles = problems.map(p => p.file);
      await problemService.uploadProblemsAndLinkToAssignment(problemFiles, assignmentId);
    }
    return new Response(JSON.stringify(newAssignment), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to create assignment' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
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
    const assignments: Assignment[] = assignmentsFromDB.map(assignmentFromDB => {
      return {
        id: assignmentFromDB.id,
        title: assignmentFromDB.title,
        description: assignmentFromDB.description,
        publishDate: assignmentFromDB.publishDate,
        dueDate: assignmentFromDB.dueDate
      };
    });
    return new Response(JSON.stringify(assignments), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to get assignment' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
});