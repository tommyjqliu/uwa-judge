import { uwajudgeDB } from "@/lib/database-client";
import { assertPermission } from "@/lib/error";
import { Permission } from "@prisma/client";
/**
 * Get or insert users by email. Used in business logic where we need placeholder accounts for students/tutors/admins.
 * @param emails - An array of email addresses.
 * @returns - An array of users.
 */
export default async function getOrInsertEmails(emails: string[]) {
  await assertPermission(Permission.createAssignment);

  const users = await Promise.all(
    emails.map((email) =>
      uwajudgeDB.user.upsert({
        where: { email },
        update: {},
        create: { email },
      }),
    ),
  );

  return users;
}
