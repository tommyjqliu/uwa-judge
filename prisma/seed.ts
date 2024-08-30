
import { uwajudgeDB } from '@/lib/database-client';
import { readProblems } from '@/tests/utils/read-problems';
import bcrypt from 'bcrypt';
import { readEnvs } from '@/lib/utils';
import importJudgeBasic from './seeding/judge-basic';
import importLanguage from './seeding/language';
import importProblemVersion from './seeding/problem-version';

readEnvs()

async function main() {
  importJudgeBasic();
  importLanguage();
  importProblemVersion()
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