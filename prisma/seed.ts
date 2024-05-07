import dotenv from 'dotenv';
import { CONTEST_CID, CONTEST_SETTING } from '@/lib/constant';
import { domjudgeDB, uwajudgeDB } from '@/lib/database-client';
import { readProblems } from '@/tests/utils/read-problems';
import { createProblems } from '@/lib/services/problem-service';

dotenv.config();


async function main() {
    await domjudgeDB.contest.upsert({
        where: { cid: CONTEST_CID },
        update: CONTEST_SETTING,
        create: CONTEST_SETTING,
    })

    await domjudgeDB.user.update({
        where: { username: 'admin' },
        data: {
            teamid: 1,
        }
    })


    // Insert test users
    const usersToInsert = Array.from({ length: 20 }, (_, i) => {
        const username = `user${i + 1}`;
        return {
            username,
            password: username,
        };
    });

    await uwajudgeDB.user.createMany({
        data: usersToInsert,
    })

    const problems = await readProblems()

    for (let i = 1; i <= 5; i++) {
        const title = `Assignment ${i}`;
        const description = `Assignment ${i} description`;
        const assignment = await uwajudgeDB.assignment.create({
            data: {
                title,
                description,
                publishDate: new Date(),
                dueDate: new Date(),
            }
        })
        await createProblems(problems, assignment.id)

    }
}


main()
    .then(async () => {
        await Promise.all([
            domjudgeDB.$disconnect(),
            uwajudgeDB.$disconnect(),
        ])
    })
    .catch(async (e) => {
        console.error(e)
        await Promise.all([
            domjudgeDB.$disconnect(),
            uwajudgeDB.$disconnect(),
        ])
        process.exit(1)
    })