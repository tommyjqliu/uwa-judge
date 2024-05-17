import errorHandler from "@/lib/error-handler";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { Assignment,User, Submission,PrismaClient, } from "@prisma/client";
import { uwajudgeDB } from "@/lib/database-client";
import { createProblems } from "@/lib/services/problem-service";
import { log } from "console";
const prisma = new PrismaClient();

function getLatestSubmissions(submissions: Submission[]): Submission[] {
  const latestSubmissions = new Map<number, Submission>();

  for (const submission of submissions) {
      const existingSubmission = latestSubmissions.get(submission.userId);

      if (!existingSubmission || new Date(submission.submissionDate) > new Date(existingSubmission.submissionDate)) {
          latestSubmissions.set(submission.userId, submission);
      }
  }

  return Array.from(latestSubmissions.values());
}
/**
 * @Description: Get all submissions detail of one problem
 * @Author: Zhiyang
 * @version: 
 * @Date: 2024-04-28 10:27:15
 * @LastEditors: Zhiyang
 * @LastEditTime: Do not Edit
 * @Return: Response
 */
export const GET = errorHandler(async function (
    request: Request,
    context: any,
  ) {
    const params = context.params;
    const assignmentId = Number(params.assignmentId);
    const problemId = String(params.problemId);
    //Edit here
    const sl = await prisma.submission.findMany({
      where: {
        assignmentId: assignmentId,
        problemId: problemId
      }
    });
    let json = getLatestSubmissions(sl)
      return new Response(JSON.stringify(json), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
  });