import errorHandler from "@/lib/error-handler";
import { PrismaClient, UsersOnAssignments,AssignmentRole} from '@prisma/client';
import { object, z } from "zod";
const prisma = new PrismaClient();


export const DELETE = errorHandler(async function (request: Request, context: any) {
  
    
    const body = await request.json();
    const usersId = body.users; 
    const assignmentId = context.params.assignmentId;
      try {
        if(usersId){
            for(let userId of usersId){
            const deleteUsersOnAssignments = await prisma.usersOnAssignments.deleteMany({
            where: {
              assignmentId: parseInt(assignmentId),
              userId: parseInt(userId)
            },
                })
            }
        }
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


    export const POST = errorHandler(async function (request: Request, context: any) {
        const body = await request.json();
        const users = body.users; 
        const assignmentId = context.params.assignmentId;

        /*
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
        }
    ],
        */

          try {
            const rolesSchema = z.enum(Object.values(AssignmentRole) as [string]);

            const validateRoles = (roles: unknown) => {
                try {
                    console.log("不起作用啊？",roles);
                    console.log(rolesSchema.parse(roles))
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
                for(let each of usersData){
                    console.log(each.roles);
                    if(each.roles == null){
                        let json =  {
                            "status":400,
                            "msg":"Roles not correct"
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