
import { uwajudgeDB } from '@/lib/database-client';
import { readProblems } from '@/tests/utils/read-problems';
import bcrypt from 'bcrypt';
import { readEnvs } from '@/lib/utils';
import importJudgeBasic from './seeding/judge-basic';
import importLanguage from './seeding/language';
import importProblemVersion from './seeding/problem-version';
import { createAssignment } from '@/lib/services/assignment/create-assignment';

readEnvs()

async function main() {
  await importJudgeBasic();
  await importLanguage();
  await importProblemVersion()

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