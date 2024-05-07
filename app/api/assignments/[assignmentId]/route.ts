import errorHandler from "@/lib/error-handler";
import { object, z } from "zod";
import { zfd } from "zod-form-data";
import { PrismaClient, Problem, AssignmentRole, Assignment, Prisma, UsersOnAssignments, ProblemsOnAssignments } from '@prisma/client';
import { UsernamePasswordClient } from "@azure/msal-node";
import { UserWithRoles, AssignmentDetailVO } from "@/lib/vo/AssignmentDetailVO"
const prisma = new PrismaClient();

/**
 * @Description: get assignment information base on assignmentId
 * @Author: Zhiyang
 * @version: 
 * @Date: 2024-04-28 10:27:15
 * @LastEditors: Zhiyang
 * @LastEditTime: Do not Edit
 * @param:
 *    params:assignmentId
 * @Return: {
 *     "assignmentId": 4,
    "title": "testWithProblems",
    "description": "testWithProblems",
    "publishDate": null,
    "dueDate": null,
    "users": [
        {
            "id": 1,
            "email": "abc@email.com",
            "username": "A",
            "roles": "TEACHER"
        },
        {
            "id": 2,
            "email": "sdf@email.com",
            "username": "B",
            "roles": "STUDENT"
        },
        {
            "id": 3,
            "email": "gggg@email.com",
            "username": "C",
            "roles": "STUDENT"
        }
    ],
    "problems": ["problemId1","problemId2"]
 * }
 */
export const GET = errorHandler(async function (request: Request, context: any) {
  const params = context.params;
  const assignmentId = Number(params.assignmentId);
  try {
    const assignment = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
    });
    if (assignment == null) {
      return new Response(JSON.stringify({ error: 'Failed to get assignment' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    //get all users related to the assignment
    console.log("assignment", assignment)
    const usersOnAssignments = await prisma.usersOnAssignments.findMany({
      where: {
        assignmentId: assignmentId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          },
        }
      },
    });

    let userList: UserWithRoles[] = [];
    for (let each of usersOnAssignments) {
      let user: UserWithRoles = {
        id: each.user.id,
        email: each.user.email,
        username: each.user.username,
        roles: each.roles
      };
      userList.push(user);
    }

    let problemList: string[] = [];
    const problemsOnAssignments = await prisma.problemsOnAssignments.findMany({
      where: {
        assignmentId: assignmentId,
      }
    })
    for (let each of problemsOnAssignments) {
      problemList.push(each.problemId);
    }
    let assignmentDetailVO: AssignmentDetailVO = new AssignmentDetailVO(assignmentId, assignment.title, assignment.description,
      assignment.publishDate, assignment?.dueDate, userList, problemList);

    let json = assignmentDetailVO.toJSON()

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
 * @Description: Delete assignment base on assignmentId
 * @Author: Zhiyang
 * @version: 
 * @Date: 2024-04-28 10:27:15
 * @LastEditors: Zhiyang
 * @LastEditTime: Do not Edit
 * @param:
 *    params:assignmentId
 * @Return: response
 */
export const DELETE = errorHandler(async function (request: Request, context: any) {

  const params = context.params;
  const assignmentId = Number(params.assignmentId);
  try {
    //Delete ProblemsOnAssignments
    const deleteProblemsOnAssignments = await prisma.problemsOnAssignments.deleteMany({
      where: {
        assignmentId: assignmentId
      },
    })
    //Delete UsersOnAssignments
    const deleteUsersOnAssignments = await prisma.usersOnAssignments.deleteMany({
      where: {
        assignmentId: assignmentId
      }
    })
    //Delete Assignments
    const deleteAssignments = await prisma.assignment.deleteMany({
      where: {
        id: assignmentId
      }
    })
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

const receiveSchema = zfd.formData({
  title: z.string(),
  description: z.string().optional(),
  publishDate: z.date().optional(),
  dueDate: z.date().optional()
});


/**
* @Description: update the basic information of an assignment (can only update: title description, publishDate, dueDate)
* @Author: Zhiyang
* @version: 
* @Date: 2024-04-28 10:27:15
* @LastEditors: Zhiyang
* @LastEditTime: Do not Edit
* @param:
*    formData: title, description, publishDate (ISO 8601 format string), dueDate(ISO 8601 format string)
* @Return: response
*/
export const PUT = errorHandler(async function (request: Request, context: any) {
  const parsedData = receiveSchema.parse(await request.formData());
  const { title, description, publishDate, dueDate } = parsedData;
  const params = context.params;
  const assignmentId = Number(params.assignmentId);
  try {
    const updateUser = await prisma.assignment.update({
      where: {
        id: assignmentId,
      },
      data: {
        title: title,
        description: description,
        publishDate: publishDate ? new Date(publishDate) : undefined,
        dueDate: dueDate ? new Date(dueDate) : undefined
      },
    })
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