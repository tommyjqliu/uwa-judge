import errorHandler from "@/lib/error-handler";
import { PrismaClient, AssignmentRole } from '@prisma/client';
import { object, z } from "zod";

export const POST = errorHandler(async function (request: Request, context: any) {
    const body = await request.json();
    const users = body.users;
    const assignmentId = context.params.assignmentId;
    try {
      const rolesSchema = z.enum(Object.values(AssignmentRole) as [string]);
  
      const validateRoles = (roles: unknown) => {
        try {
          return rolesSchema.parse(roles);
        } catch (error) {
          return null;
        }
      }
      if (users) {
        const usersData = users.map((user: { id: any; roles: any; }) => ({
          userId: parseInt(user.id),
          assignmentId: parseInt(assignmentId),
          roles: validateRoles(user.roles)
        }));
        //check
        for (let each of usersData) {
          console.log(each.roles);
          if (each.roles == null) {
            let json = {
              "status": 400,
              "msg": "Role not correct: should be either TEACHER, STUDENT, or TUTOR"
            }
            return new Response(JSON.stringify(json), {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
              },
            });
          }
        }
        try {
          const createManyResult = await prisma.usersOnAssignments.createMany({
            data: usersData,
            skipDuplicates: true
          });
          console.log("Inserted records:", createManyResult.count);
        } catch (error) {
          console.error("Failed to create assignments for users:", error);
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