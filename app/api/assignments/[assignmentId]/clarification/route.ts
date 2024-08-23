// 多體實際執行
import errorHandler from "@/lib/error-handler";
import { object, z } from "zod";
import { zfd } from "zod-form-data";
import { PrismaClient } from "@prisma/client";
//import { createClarifications } from "@/lib/services/clarification-service";

const prisma = new PrismaClient();






// 多體get
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

  // // 检查是否找到 clarifications
  if (!clarifications || clarifications.length === 0) {
    return new Response(
      JSON.stringify({ message: 'No clarifications found for the given assignmentId' }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
    // extract clarifications' objects' text
    //const texts = clarifications.map(clarification => clarification.text);
    return new Response(JSON.stringify(clarifications), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }); 
});


//單體post 完成
export const POST = errorHandler(async function (
  request: Request,
  context: any,
) {
  const params = context.params;
  const assignmentId123 = Number(params.assignmentId);
  //const id = Number(params.id);

  // 解析请求体为 JSON 对象
  const body = await request.json(); // 解析 request.body 为 JSON 对象

  // 从解析后的 body 中提取 clarification 的数据
  //const { text } = body;
  const { text} = body;//id,, assignmentId 

  // 验证请求体中的数据
  if (!text || typeof text !== 'string') {
    return new Response(
      JSON.stringify({ message: 'Invalid clarification data' }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
  
  // 檢查 assignmentId 是否存在於 assignments 表中
  const assignmentExists = await prisma.assignment.findUnique({
    where: {
      id: assignmentId123,
    },
  });

  if (!assignmentExists) {
    return new Response(
      JSON.stringify({ message: 'Assignment ID does not exist' }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // 创建新的 clarification
  const newClarification = await prisma.clarification.create({
    data: {
      //id: newid,
      
      text: text,
      assignmentId: assignmentId123,
    },
  });

  
  // 返回成功响应
  return new Response(
    JSON.stringify(newClarification),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
});
