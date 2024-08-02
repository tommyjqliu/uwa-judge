import errorHandler from "@/lib/error-handler";
import { Assignment,User, Submission,PrismaClient, } from "@prisma/client";
import { uwajudgeDB } from "@/lib/database-client";
import { createProblems } from "@/lib/services/problem-service";
import { log } from "console";
import { zfd } from "zod-form-data";
import { object, z } from "zod";
const prisma = new PrismaClient();

const receiveSchema = zfd.formData({
    comment: z.string(),
    mark:z.string()
  });

/**
 * @Description: Update comment or mark for a submission 
 * @Author: Zhiyang
 * @version: 
 * @Date: 2024-04-28 10:27:15
 * @LastEditors: Zhiyang
 * @LastEditTime: Do not Edit
 * @param:
 *    formData:{
 *       "comment": "xxxxxxxxxxxxxxxxxx",
 *       "mark":"xx"
 *    }
 * @Return: Response
 */
export const PUT = errorHandler(async function (
    request: Request,
    context: any,
  ) {
    const params = context.params;
    const submissionId = String(params.submissionId)
    
    const parsedData = receiveSchema.parse(await request.formData());
    const { comment,mark } = parsedData;
  
    const updatedUser = await prisma.submission.update({
        where: { id: submissionId },  
        data: { comment: comment,
                mark: mark,
         }  
      });
    let json = updatedUser
      return new Response(JSON.stringify(json), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
  });