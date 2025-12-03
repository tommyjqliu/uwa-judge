import { uwajudgeDB } from "@/lib/database-client";
import { assert } from "@/lib/error";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const problemVersion = await uwajudgeDB.problemVersion.findUnique({
    where: { id: +params.id },
    include: {
      problemStatement: true,
    },
  });

  const pdf = problemVersion?.problemStatement?.file;
  assert(pdf, "PDF not found");

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
    },
  });
}
