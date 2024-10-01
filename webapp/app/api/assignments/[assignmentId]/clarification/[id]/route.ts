//單體實際執行
import errorHandler from "@/lib/error-handler";
import { object, z } from "zod";
import { zfd } from "zod-form-data";
import { PrismaClient } from "@prisma/client";
//import { createClarifications } from "@/lib/services/clarification-service";

const prisma = new PrismaClient();



//單體delete
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

  if (!deletedClarification ||deletedClarification.count === 0) {
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


//單體get
export const GET = errorHandler(async function (
  request: Request,
  context: any,
) {
  // 从 URL 中提取 assignmentId 和 id
  const params = context.params;
  const assignmentIdNumber = Number(params.assignmentId);
  let clarificationIdNumber = Number(params.id);

  // // 检查 clarificationIdNumber 是否为整数
  // if (isNaN(clarificationIdNumber) || !Number.isInteger(clarificationIdNumber)) {
  //   clarificationIdNumber = 2; // 如果不是整数，设置为默认值 1
  // }

  // 根据 assignmentId 和 id 查询指定的 clarification
  const clarifications = await prisma.clarification.findMany({
    where: {
      id: clarificationIdNumber,
      assignmentId: assignmentIdNumber,
    },
  });
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

  // 返回查询结果
  return new Response(JSON.stringify(clarifications), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
});


//單體PUT 修改text
export const PUT = errorHandler(async function (
  request: Request,
  context: any,
) {
  const params = context.params;
  const assignmentId = Number(params.assignmentId);
  let clarificationId = Number(params.id);

  // 解析请求体为 JSON 对象
  const body = await request.json();

  // 从解析后的 body 中提取新的 text
  const { text } = body;

  // 验证请求体中的数据
  if (!text || typeof text !== 'string') {
    return new Response(
      JSON.stringify({ message: 'Invalid clarification text' }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // 檢查 clarification 是否存在
  const clarificationExists = await prisma.clarification.findUnique({
    where: {
      id: clarificationId,//clarificationId
      assignmentId: assignmentId,//assignmentId
    },
  });

  if (!clarificationExists) {
    return new Response(
      JSON.stringify({ message: 'Clarification ID does not exist' }),
      {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  // 更新 clarification 的 text
  const updatedClarification = await prisma.clarification.update({
    where: {
      id: clarificationId,//clarificationId
    },
    data: {
      text: text,
    },
  });

  // 返回成功响应
  return new Response(
    JSON.stringify(updatedClarification),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
});