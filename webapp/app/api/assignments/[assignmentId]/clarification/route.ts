import errorHandler from "@/lib/error-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET multiple clarifications
export const GET = errorHandler(async function (
  request: Request,
  context: any,
) {
  const params = context.params;
  const assignmentId123 = Number(params.assignmentId);

  // Find clarifications based on assignmentId
  const clarifications = await prisma.clarification.findMany({
    where: {
      assignmentId: assignmentId123
    }
  });

  // Check if any clarifications were found
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

  // Return the clarifications as JSON
  return new Response(JSON.stringify(clarifications), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  }); 
});

// POST a new clarification
export const POST = errorHandler(async function (
  request: Request,
  context: any,
) {
  const params = context.params;
  const assignmentId123 = Number(params.assignmentId);

  // Parse the request body as JSON
  const body = await request.json();

  // Extract the text field from the request body
  const { text } = body;

  // Validate the text data
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

  // Check if the assignmentId exists in the assignments table
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

  // Create a new clarification
  const newClarification = await prisma.clarification.create({
    data: {
      text: text,
      assignmentId: assignmentId123,
    },
  });

  // Return a success response
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
