import { uwajudgeDB } from "@/lib/database-client";
import argon2 from "@node-rs/argon2";
export default async function seedUser() {
  const emails = Array.from(
    { length: 20 },
    (_, i) => `user${i + 1}@example.com`,
  );
  const password = await argon2.hash("password");
  await uwajudgeDB.user.createMany({
    data: emails.map((email, index) => ({
      email,
      username: `user${index + 1}`,
      password,
      active: true,
    })),
  });
}
