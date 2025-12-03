"use server";

import { z } from "zod";
import { uwajudgeDB } from "@/lib/database-client";
import { createProblemVersions } from "../problem-version/create-problem-version";
import getOrInsertEmails from "../user/insert-or-get-emails";
import assignmentFormData from "./assignment-form-schema";
import { ToOptional } from "@/lib/type";
import { Permission } from "@prisma/client";
import { assertPermission } from "@/lib/error";

export async function createAssignment(
  data: ToOptional<z.infer<typeof assignmentFormData>>,
) {
  await assertPermission([Permission.createAssignment]);

  const {
    title,
    description,
    publishDate,
    dueDate,
    students,
    tutors,
    admins,
    problems,
  } = data;

  const problemVersion = await createProblemVersions(problems);
  const assignment = await uwajudgeDB.assignment.create({
    data: {
      title,
      description,
      publishDate,
      dueDate,
      problems: {
        createMany: {
          data: problemVersion.map((pv) => ({
            problemVersionId: pv.id,
          })),
        },
      },
    },
  });

  const assignmentId = assignment.id;

  if (students) {
    const users = await getOrInsertEmails(students);
    await uwajudgeDB.studentsOnAssignments.createMany({
      data: users.map((user) => ({
        assignmentId,
        userId: user.id,
      })),
    });
  }

  if (tutors) {
    const users = await getOrInsertEmails(tutors);
    await uwajudgeDB.tutorsOnAssignments.createMany({
      data: users.map((user) => ({
        assignmentId,
        userId: user.id,
      })),
    });
  }

  if (admins) {
    const users = await getOrInsertEmails(admins);
    await uwajudgeDB.adminsOnAssignments.createMany({
      data: users.map((user) => ({
        assignmentId,
        userId: user.id,
      })),
    });
  }
  return assignment;
}
