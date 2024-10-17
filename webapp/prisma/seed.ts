import { uwajudgeDB } from "@/lib/database-client";
import { readProblems } from "@/tests/utils/read-problems";
import importJudgeBasic from "./seeding/judge-basic";
import importLanguage from "./seeding/language";
import importProblemVersions from "./seeding/problem-version";
import { createAssignment } from "@/services/assignment/create-assignment";
import { readEnvs } from "@/lib/server-utils";
import seedUser from "./seeding/user";
import { Permission } from "@prisma/client";
import { setMockSession } from "@/services/session/mock-session";

readEnvs();

async function main() {
  setMockSession({
    profile: {
      id: 1,
      username: "test",
      email: "test@example.com",
      active: true,
      permissions: [Permission.developAdmin],
    },
  });

  await seedUser();
  await importJudgeBasic();
  await importLanguage();
  await importProblemVersions();

  const problems = await readProblems();
  for (let i = 0; i < 5; i++) {
    await createAssignment({
      title: "test assignment",
      description: "test description",
      problems,
    });
  }
}

main()
  .then(async () => {
    await Promise.all([uwajudgeDB.$disconnect()]);
  })
  .catch(async (e) => {
    console.error(e);
    await Promise.all([uwajudgeDB.$disconnect()]);
    process.exit(1);
  });
