
import { CONTEST_CID, CONTEST_SETTING } from '@/lib/constant';
import { domjudgeDB, uwajudgeDB } from '@/lib/database-client';
import { readProblems } from '@/tests/utils/read-problems';
import { createProblems } from '@/lib/services/problem-service';
import bcrypt from 'bcrypt';
import { readEnvs } from '@/lib/utils';

readEnvs()

async function main() {
    // Initial setup
    await domjudgeDB.user.upsert({
        where: { username: "admin" },
        update: { username: "admin", name: "Administrator", password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10), teamid: 1 },
        create: { username: "admin", name: "Administrator", password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10), teamid: 1 },
    })
    await domjudgeDB.user.upsert({
        where: { username: "judgehost" },
        update: { username: "judgehost", name: "judgehost", password: await bcrypt.hash(process.env.JUDGEDAEMON_PASSWORD, 10) },
        create: { username: "judgehost", name: "judgehost", password: await bcrypt.hash(process.env.JUDGEDAEMON_PASSWORD, 10) },
    })

    await domjudgeDB.contest.upsert({
        where: { cid: CONTEST_CID },
        update: CONTEST_SETTING,
        create: CONTEST_SETTING,
    })

    await domjudgeDB.language.update({
        where: { langid: 'py3' },
        data: {
            externalid: "python"
        }
    })

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