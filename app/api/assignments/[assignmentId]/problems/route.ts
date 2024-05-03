import errorHandler from "@/lib/error-handler";
import { object, z } from "zod";
import { zfd } from "zod-form-data";
import { PrismaClient, Problem, AssignmentRole, Assignment, Prisma, UsersOnAssignments, ProblemsOnAssignments } from '@prisma/client';
import { UsernamePasswordClient } from "@azure/msal-node";
import { UserWithRoles, AssignmentDetailVO } from "@/app/vo/AssignmentDetailVO"
import ProblemService from "@/lib/service/problemService";
const problemService = new ProblemService();
const prisma = new PrismaClient();

export const assignmentSchema = zfd.formData({
  assignmentId: z.number(),
  problems: zfd.json(z.object({
    file: zfd.file(),
  }).array())
});


/**
 * @Description: Delete problems on specific assignment
 * @Author: Zhiyang
 * @version: 
 * @Date: 2024-04-28 10:27:15
 * @LastEditors: Zhiyang
 * @LastEditTime: Do not Edit
 * @param:
 *    params:assignmentId
 *    jsonData:{
 *      "problems":["problemId1","problemId2"]
 *    }
 * @Return: Response
 */
export const DELETE = errorHandler(async function (request: Request, context: any) {
  const params = context.params;
  const assignmentId = Number(params.assignmentId);
  const body = await request.json();
  const problemsId = body.problems;
  try {
    //Delete ProblemsOnAssignments
    if (problemsId) {
      for (let problemId of problemsId) {
        const deleteProblemsOnAssignments = await prisma.problemsOnAssignments.deleteMany({
          where: {
            assignmentId: assignmentId,
            problemId: problemId
          },
        })
      }
    }
    let json = {
      "status": 200,
      "msg": "Successfully deleted"
    }
    return new Response(JSON.stringify(json), {
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




/**
 * @Description: 
 * @Author: Zhiyang
 * @version: 
 * @Date: 2024-05-02 11:39:25
 * @LastEditors: Zhiyang
 * @LastEditTime: Do not Edit
 * @description: 
 * @param:
 *  params:{
 *    assignmentId: number
 *    problems: list<file>
 * }
 * @return response
 */
export const POST = errorHandler(async function (request: Request, context: any) {
  const parsedData = assignmentSchema.parse(await request.formData());
  const { assignmentId, problems } = parsedData;
  try {
    let response: Response = new Response()
    if (problems) {
      const problemFiles = problems.map(p => p.file);
      response = await problemService.uploadProblemsAndLinkToAssignment(problemFiles, assignmentId);
    }
    else {
      response = new Response(JSON.stringify({ error: 'Failed to upload problems' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
    return response;
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to upload problems' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
});