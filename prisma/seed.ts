
import { uwajudgeDB } from '@/lib/database-client';
import { readProblems } from '@/tests/utils/read-problems';
import { createProblems } from '@/lib/services/problem-service';
import bcrypt from 'bcrypt';
import { readEnvs } from '@/lib/utils';
import judgeBasic from './seeding/judge-basic';
import language from './seeding/language';

readEnvs()

async function main() {
    judgeBasic();
    language();
    // Insert test data
    const usersToInsert = Array.from({ length: 20 }, (_, i) => {
        const username = `user${i + 1}`;
        return {
            username,
            password: username,
        };
    });

    await uwajudgeDB.user.createMany({
        data: usersToInsert,
        skipDuplicates: true,
    })

    // const problems = await readProblems()

    // for (let i = 1; i <= 5; i++) {
    //     const title = `Assignment ${i}`;
    //     const description = `Assignment ${i} description`;
    //     const assignment = await uwajudgeDB.assignment.create({
    //         data: {
    //             title,
    //             description,
    //             publishDate: new Date(),
    //             dueDate: new Date(),
    //         }
    //     })
    //     await createProblems(problems, assignment.id)

    // }
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