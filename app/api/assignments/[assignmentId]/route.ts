import errorHandler from "@/lib/error-handler";
import { object, z } from "zod";
import { zfd } from "zod-form-data";
import { PrismaClient, Problem,AssignmentRole, Assignment,Prisma,UsersOnAssignments,ProblemsOnAssignments} from '@prisma/client';
import { UsernamePasswordClient } from "@azure/msal-node";
import {UserWithRoles,AssignmentDetailVO} from "@/app/vo/AssignmentDetailVO"
const prisma = new PrismaClient();

export const GET = errorHandler(async function (request: Request, context: any) {
  
  const params = context.params;
  const assignmentId = Number(params.assignmentId); 
    try {
        const assignment = await prisma.assignment.findUnique({
            where: {
              id: assignmentId,
            },
          });
        if(assignment == null){
          return new Response(JSON.stringify({ error: 'Failed to get assignment' }), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
        //get all users related to the assignment
        console.log("assignment",assignment)
        const usersOnAssignments = await prisma.usersOnAssignments.findMany({
            where: {
                assignmentId: assignmentId,
              },
            include:{
              user: {
                select: {
                  id: true, 
                  username: true, 
                  email: true
                },
              }     
            },
        });

        let userList:UserWithRoles[] = [];
        for (let each of usersOnAssignments) {
          console.log(each);
          let user: UserWithRoles = {
            id: each.user.id,
            email: each.user.email,
            username: each.user.username,
            roles: each.roles
          };
          userList.push(user);
        }
        console.log(userList);



        // TO DO PROBLEM PART
        let problemList:Problem[] = [];
        
        let assignmentDetailVO: AssignmentDetailVO = new AssignmentDetailVO(assignmentId,assignment.title,assignment.description,
          assignment.publishDate,assignment?.dueDate,userList,problemList);

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
            where:{
              assignmentId: assignmentId
            }
          })
          //Delete Assignments
          const deleteAssignments = await prisma.assignment.deleteMany({
            where:{
              id: assignmentId
            }
          })
          let json =  {
            "status":200,
            "msg":"Successfully deleted"
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