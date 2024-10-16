"use server"

import { uwajudgeDB } from "@/lib/database-client";

export default async function createAssessment(
  assignmentId: number,
  studentId: number,
  mark: number,
  comment?: string,
) {
  return uwajudgeDB.assessment.create({
    data: {
      assignmentId,
      studentId,
      mark,
      comment,
    },
  });
}
