
import { uwajudgeDB } from '@/lib/database-client';
import { readProblems } from '@/tests/utils/read-problems';
import importJudgeBasic from './seeding/judge-basic';
import importLanguage from './seeding/language';
import importProblemVersions from './seeding/problem-version';
import { createAssignment } from '@/services/assignment/create-assignment';
import { readEnvs } from '@/lib/server-utils';

readEnvs()

async function main() {
  await importJudgeBasic();
  await importLanguage();
  await importProblemVersions()

  const problems = await readProblems();
  for (let i = 0; i < 5; i++) {
    await createAssignment({
      title: "test assignment",
      description: "test description",
      problems,
    })
  }
}


main()
  .then(async () => {
    await Promise.all([
      uwajudgeDB.$disconnect(),
    ])
  })
  .catch(async (e) => {
    console.error(e)
    await Promise.all([
      uwajudgeDB.$disconnect(),
    ])
    process.exit(1)
  })