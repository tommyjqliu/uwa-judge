"use server"
import { uwajudgeDB } from "@/lib/database-client"

export default async function getLanguages() {
    return uwajudgeDB.language.findMany()
} 