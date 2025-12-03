import { uwajudgeDB } from "@/lib/database-client";
import argon2 from "@node-rs/argon2";
import { Permission } from "@prisma/client";
export default async function seedUser() {
  const password = await argon2.hash("password");

  const insertData = Array.from({ length: 20 }, (_, i) => ({
    email: `student${i + 1}@example.com`,
    username: `student${i + 1}`,
    password,
    active: true,
  }));

  await uwajudgeDB.user.createMany({
    data: [
      {
        email: "admin@example.com",
        username: "admin",
        password,
        active: true,
        permissions: [Permission.developAdmin],
      },
      {
        email: "user_management@example.com",
        username: "user_management",
        password,
        active: true,
        permissions: [Permission.userManagement],
      },
      {
        email: "problem_management@example.com",
        username: "problem_management",
        password,
        active: true,
        permissions: [Permission.problemManagement],
      },
      {
        email: "create_assignment@example.com",
        username: "create_assignment",
        password,
        active: true,
        permissions: [Permission.createAssignment],
      },
      ...insertData,
    ],
  });
}
