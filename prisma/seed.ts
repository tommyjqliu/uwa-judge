import dotenv from 'dotenv';
import { PrismaClient as DOMjudgeClient } from '../lib/domjudge-db-client'

dotenv.config();
const prisma = new DOMjudgeClient()


async function main() {
    const t = await prisma.user.findMany();
    console.log(t)
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })