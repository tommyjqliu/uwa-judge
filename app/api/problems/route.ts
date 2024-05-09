import { isFile } from "@/lib/file";
import errorHandler from "@/lib/error-handler";
import { createProblems } from "@/lib/services/problem-service";

export const POST = errorHandler(async function (request: Request) {
  const formData = await request.formData();
  const assignmentId = formData.get("assignmentId")
    ? Number(formData.get("assignmentId"))
    : undefined;
  const files = formData.getAll("files").filter(isFile);

  const problems = await createProblems(files, assignmentId);

  return new Response(JSON.stringify(problems), {
    status: 200,
  });
});
