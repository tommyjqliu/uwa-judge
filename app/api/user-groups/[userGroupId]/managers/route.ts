import { zfd } from "zod-form-data";
import { z } from "zod";
import { uwajudgeDB } from "@/lib/database-client";
import errorHandler from "@/lib/error-handler";

//const getUserScheme = zfd.formData({
    //userId: zfd.numeric(z.number().int()),
  //});

export const GET = errorHandler(async function (request:Request,context:any) {
    const params = context.params;
    const userId = Number(params.userGroupId);

    const managedGroups = await uwajudgeDB.usersOnGroups.findMany({
      where: {
        userId: userId,
        isAdmin: true
      },
      include: { group: true } 
    });
  
    const groups = managedGroups.map((g) => g.group);
  
    return new Response(JSON.stringify(groups), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
  