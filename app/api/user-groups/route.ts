import { zfd } from "zod-form-data";
import { z } from "zod";
import { uwajudgeDB } from "@/lib/database-client";
import errorHandler from "@/lib/error-handler";


const createUserGroupSchema = zfd.formData({
  name: z.string(),
  description: z.string().optional(),
});


export const POST = errorHandler(async function (request) {
  const formData = await request.formData();
  const parsedData = createUserGroupSchema.parse(formData);
  
  const { name, description } = parsedData;
  //const userId = request.user.id; 
  const userGroup = await uwajudgeDB.userGroup.create({
    data: {
      name,
      description,
    }
  });

  return new Response(JSON.stringify(userGroup), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
});


export const GET = errorHandler(async function (request) {
    try {
      const userGroups = await uwajudgeDB.userGroup.findMany();

      return new Response(JSON.stringify(userGroups), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to fetch user groups" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  });