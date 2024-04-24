import { PrismaClient as DOMjudgeClient } from '@/lib/domjudge-db-client'
import { PrismaClient as UWAjudgeClient } from '@prisma/client';

export const domjudgeDB = new DOMjudgeClient()
export const uwajudgeDB = new UWAjudgeClient()