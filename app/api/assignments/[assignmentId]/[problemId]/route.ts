import errorHandler from "@/lib/error-handler";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { Assignment,StudentsOnAssignments,TutorsOnAssignments,AdminsOnAssignments } from "@prisma/client";
import { uwajudgeDB } from "@/lib/database-client";
import { createProblems } from "@/lib/services/problem-service";
import { log } from "console";

export const GET = errorHandler(async function (
    request: Request,
    context: any,
  ) {
    const params = context.params;
    const assignmentId = Number(params.assignmentId);
    const userId = Number(params.userId);
    log("-------------------------------------")
    log(assignmentId)
    log(userId)
      return new Response(JSON.stringify("test"), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
  });