import errorHandler from "@/lib/error-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DELETE clarification
export const DELETE = errorHandler(async function (
  request: Request,
  context: any,
) {
  const params = context.params;
  const assignmentId123 = Number(params.assignmentId);
  const clarificationId = Number(params.id);

  // Delete the specified clarification
  const deletedClarification = await prisma.clarification.deleteMany({
    where: {
      assignmentId: assignmentId123,
      id: clarificationId,
    },
  });

  if (!deletedClarification || deletedClarification.count === 0) {
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

// GET clarification
export const GET = errorHandler(async function (
  request: Request,
  context: any,
) {
  // Extract assignmentId and id from URL params
  const params = context.params;
  const assignmentIdNumber = Number(params.assignmentId);
  let clarificationIdNumber = Number(params.id);

  // Fetch the clarification based on assignmentId and clarificationId
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

  // Return the result
  return new Response(JSON.stringify(clarifications), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
});

// PUT update clarification text
export const PUT = errorHandler(async function (
  request: Request,
  context: any,
) {
  const params = context.params;
  const assignmentId = Number(params.assignmentId);
  let clarificationId = Number(params.id);

  // Parse the request body as JSON
  const body = await request.json();

  // Extract new text from the body
  const { text } = body;

  // Validate the text from the request body
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

  // Check if the clarification exists
  const clarificationExists = await prisma.clarification.findUnique({
    where: {
      id: clarificationId,
      assignmentId: assignmentId,
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

  // Update the clarification text
  const updatedClarification = await prisma.clarification.update({
    where: {
      id: clarificationId,
    },
    data: {
      text: text,
    },
  });

  // Return the updated clarification
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
