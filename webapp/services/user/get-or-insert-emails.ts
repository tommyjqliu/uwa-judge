import { uwajudgeDB } from "@/lib/database-client";

export default async function getOrInsertEmails(emails: string[]) {
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
