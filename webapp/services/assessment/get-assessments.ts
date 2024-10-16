"use server";
import { uwajudgeDB } from "@/lib/database-client";

// Fetch the latest assessment (based on the highest ID) for a specific student and assignment
export default async function getAssessment(assignmentId: number, studentId: number) {
  return uwajudgeDB.assessment.findFirst({
    where: {
      assignmentId,
      studentId,
    },
    orderBy: {
      id: 'desc', // This ensures that the highest (latest) ID is selected
    },
  });
}
