import errorHandler from "@/lib/error-handler";
import { object, z } from "zod";
import { zfd } from "zod-form-data";
import { PrismaClient } from "@prisma/client";
//import { createClarifications } from "@/lib/services/clarification-service";

const prisma = new PrismaClient();







export const GET = errorHandler(async function (
  request: Request,
  context: any,
) {
  const params = context.params;
  const assignmentId123 = Number(params.assignmentId);
  const clarifications = await prisma.clarification.findMany({
    where: {
      assignmentId: assignmentId123
    }
  });
    // extract clarifications' objects' text
    //const texts = clarifications.map(clarification => clarification.text);
    return new Response(JSON.stringify(clarifications), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }); 
});
