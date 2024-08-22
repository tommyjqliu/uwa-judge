import errorHandler from "@/lib/error-handler";
import { object, z } from "zod";
import { zfd } from "zod-form-data";
import { PrismaClient } from "@prisma/client";
//import { createClarifications } from "@/lib/services/clarification-service";

const prisma = new PrismaClient();
export const DELETE = errorHandler(async function (
    request: Request,
    context: any,
  ) {
    const params = context.params;
    const assignmentId123 = Number(params.assignmentId);
    const clarificationId = Number(params.id);
  
    // 删除指定的 clarification
    const deletedClarification = await prisma.clarification.deleteMany({
      where: {
        assignmentId: assignmentId123,
        id: clarificationId,
      },
    });
  
    if (deletedClarification.count === 0) {
      return new Response(JSON.stringify({ message: "No clarification found or deletion failed" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  
    return new Response(JSON.stringify({ message: "Clarification deleted successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  });
  