"use server";

import assignmentFormData from "./assignment-form-schema";
import { createAssignment } from "./create-assignment";

export async function createAssignmentForm(formData: FormData) {
  return createAssignment(assignmentFormData.parse(formData));
}
