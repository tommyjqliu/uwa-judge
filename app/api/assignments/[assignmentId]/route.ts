import errorHandler from "@/lib/error-handler";
import { object, z } from "zod";
import { zfd } from "zod-form-data";
import {
  PrismaClient,
  Problem,
  AdminsOnAssignments,
  Assignment,
  Prisma,
  StudentsOnAssignments,
  TutorsOnAssignments,
  ProblemsOnAssignments,
} from "@prisma/client";
import { UsernamePasswordClient } from "@azure/msal-node";
import { UserWithRoles, AssignmentDetailVO } from "@/lib/vo/AssignmentDetailVO";
import { log } from "console";
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
    "assignment": {
        "id": 9,
        "title": "testWithProblems",
        "description": "testWithProblems",
        "publishDate": null,
        "dueDate": null
    },
    "students": [
        {
            "id": 1,
            "username": "user1",
            "email": null
        },
    ],
    "tutors": [......],
    "admins": [......]
}
 * 
 * */
export const GET = errorHandler(async function (
  request: Request,
  context: any,
) {
  const params = context.params;
  const assignmentId = Number(params.assignmentId);
  try {
    const assignment = await prisma.assignment.findUnique({
      where: {
        id: assignmentId,
      },
    });
    if (assignment == null) {
      return new Response(
        JSON.stringify({ error: "Assignment Not Found" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }
    //Admin List
    //get all admins related to the assignment
    const as = await prisma.adminsOnAssignments.findMany({
      where: {
        assignmentId: assignmentId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    let adminList = as.map(item => item.user)
    //Student List
    const sl = await prisma.studentsOnAssignments.findMany({
      where: {
        assignmentId: assignmentId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    let studentList = sl.map(item => item.user)
    //Tutor List
    const tl = await prisma.tutorsOnAssignments.findMany({
      where: {
        assignmentId: assignmentId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
    let tutorList = tl.map(item => item.user)

    //The problems list
    const pl = await prisma.problemsOnAssignments.findMany({
      where: {
        assignmentId: assignmentId,
      },

      include: {
        problem: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });
    let problemList = pl.map(item => item.problem)

    let json = {
      "assignment": assignment,
      "students":studentList,
      "tutors":tutorList,
      "admins":adminList,
      "problems":problemList
    }
    return new Response(JSON.stringify(json), {
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
export const DELETE = errorHandler(async function (
  request: Request,
  context: any,
) {
  const params = context.params;
  const assignmentId = Number(params.assignmentId);
  try {
    //Delete ProblemsOnAssignments
    const deleteProblemsOnAssignments =
      await prisma.problemsOnAssignments.deleteMany({
        where: {
          assignmentId: assignmentId,
        },
      });
    //Delete studentsOnAssignments
    const deleteUsersOnAssignments = await prisma.studentsOnAssignments.deleteMany(
      {
        where: {
          assignmentId: assignmentId,
        },
      },
    );
    //Delete tutorssOnAssignments
    const deleteTutorsOnAssignments = await prisma.tutorsOnAssignments.deleteMany(
      {
        where: {
          assignmentId: assignmentId,
        },
      },
    );
    //Delete adminsOnAssignments
    const deleteAdminsOnAssignments = await prisma.adminsOnAssignments.deleteMany(
      {
        where: {
          assignmentId: assignmentId,
        },
      },
    );
    //Delete Assignments
    const deleteAssignments = await prisma.assignment.deleteMany({
      where: {
        id: assignmentId,
      },
    });
    let json = {
      status: 200,
      msg: "Successfully deleted",
    };
    return new Response(JSON.stringify(json), {
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

const receiveSchema = zfd.formData({
  title: z.string(),
  description: z.string().optional(),
  publishDate: z.date().optional(),
  dueDate: z.date().optional(),
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
export const PUT = errorHandler(async function (
  request: Request,
  context: any,
) {
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
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    });
    let json = {
      status: 200,
      msg: "Successfully deleted",
    };
    return new Response(JSON.stringify(json), {
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
