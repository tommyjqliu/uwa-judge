
import { domjudgeDB, uwajudgeDB } from "@/lib/database-client";
import { beforeAll, afterAll } from "vitest";


afterAll(async () => {
    uwajudgeDB.$disconnect()
    domjudgeDB.$disconnect()
})