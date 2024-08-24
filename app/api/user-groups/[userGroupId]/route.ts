import { zfd } from "zod-form-data";
import { z } from "zod";
import { uwajudgeDB } from "@/lib/database-client";
import errorHandler from "@/lib/error-handler";

const addUserToGroupSchema = zfd.formData({
    userId: zfd.numeric(z.number().int()),
    isAdmin: z.enum(["true", "false"]).transform((val) => val === "true") 
  });

// formData:
// userId : id
// isAdmin: true / false
export const POST = errorHandler(async function (request:Request,context:any) {
    const params = context.params;
    const groupId = Number(params.userGroupId);
    const formData = await request.formData();
    const parsedData = addUserToGroupSchema.parse(formData);
  
    const { userId, isAdmin } = parsedData;
  
    const userOnGroup = await uwajudgeDB.usersOnGroups.create({
      data: {
        groupId: groupId,
        userId: userId,
        isAdmin: isAdmin
      }
    });
  
    return new Response(JSON.stringify(userOnGroup), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

//get users from userGroup
export const GET = errorHandler(async function (request:Request,context:any) {
  const params = context.params;
  const groupId = Number(params.userGroupId);
  const usersInGroup = await uwajudgeDB.usersOnGroups.findMany({
    where: { groupId: groupId },
    include: { user: true } 
  });

  const users = usersInGroup.map((u) => ({
    id: u.user.id,
    username: u.user.username,
    email: u.user.email,
    isAdmin: u.isAdmin
  }));

  return new Response(JSON.stringify(users), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
});



  