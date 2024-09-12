import { zfd } from "zod-form-data";
import { z } from "zod";
import { uwajudgeDB } from "@/lib/database-client";
import errorHandler from "@/lib/error-handler";

export const DELETE = errorHandler(async function (request:Request,context:any) {
    const params = context.params;
    const userId = params.userId;
    const groupId = params.userGroupId
    try{
    await uwajudgeDB.usersOnGroups.delete({
      where: {
        userId_groupId: {
          userId: parseInt(userId),
          groupId: parseInt(groupId)
        }
      }
    });  
    let json = {
      "msg" :"delete successfully"
    }
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  catch (error){
    let json = {
      "msg" :"no record found"
    }
    return new Response(JSON.stringify(json), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  });
  