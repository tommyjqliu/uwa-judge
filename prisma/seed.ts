import dotenv from 'dotenv';
import { PrismaClient as DOMjudgeClient } from '../lib/domjudge-db-client'
import { CONTEST_CID, CONTEST_SETTING } from '../lib/constant';
import { PrismaClient as UWAjudgeClient } from '@prisma/client';

dotenv.config();

const domjudgeDB = new DOMjudgeClient()
const uwajudgeDB = new UWAjudgeClient()

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