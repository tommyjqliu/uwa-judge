import dotenv from 'dotenv';
import { CONTEST_CID, CONTEST_SETTING } from '@/lib/constant';
import { domjudgeDB, uwajudgeDB } from '@/lib/database-client';

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
    
    await uwajudgeDB.assignment.createMany({
        data: [
            {
                title: 'Assignment 1',
                description: 'Assignment 1 description',
                publishDate: new Date(),
                dueDate: new Date(),

            },
            {
                title: 'Assignment 2',
                description: 'Assignment 2 description',
                publishDate: new Date(),
                dueDate: new Date(),
            },
        ]
    })

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