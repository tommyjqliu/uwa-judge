
import { uwajudgeDB } from "@/lib/database-client";
import { readEnvs } from "@/lib/utils";
import { beforeAll, afterAll } from "vitest";



beforeAll(() => {
    readEnvs();
})

afterAll(async () => {
    uwajudgeDB.$disconnect()
})