
import { uwajudgeDB } from '@/lib/database-client';
import { readProblems } from '@/tests/utils/read-problems';
import bcrypt from 'bcrypt';
import { readEnvs } from '@/lib/utils';
import judgeBasic from './seeding/judge-basic';
import language from './seeding/language';

readEnvs()

async function main() {
  judgeBasic();
  language();
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