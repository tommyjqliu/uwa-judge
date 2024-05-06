import { PrismaClient as DOMjudgeClient } from '@/lib/domjudge-db-client'
import { PrismaClient as UWAjudgeClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
    uwajudgeDB: UWAjudgeClient
    domjudgeDB: DOMjudgeClient
}


export const domjudgeDB = globalForPrisma.domjudgeDB || new DOMjudgeClient()
export const uwajudgeDB = globalForPrisma.uwajudgeDB || new UWAjudgeClient()


if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.domjudgeDB = domjudgeDB
    globalForPrisma.uwajudgeDB = uwajudgeDB
}