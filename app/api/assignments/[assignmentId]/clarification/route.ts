import { uwajudgeDB } from "@/lib/database-client";
import errorHandler from "@/lib/error-handler";
import { object, z } from "zod";
import { zfd } from "zod-form-data";

export const GET = errorHandler(async function (
  request: Request,
  context: any,
) {
  console.log("11", context)

  const clarifications = await uwajudgeDB.clarification.findMany({
    where: {
      assignmentId: +context.params.assignmentId,
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
