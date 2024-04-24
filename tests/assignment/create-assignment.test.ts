import { testApiHandler } from "next-test-api-route-handler";
import { describe, expect, it } from "vitest";
import * as appHandler from "@/app/api/assignments/route";
import { readFile, readdir } from "fs/promises"
import { zfd } from "zod-form-data";
const problemPath = "./tests/data/problems/";


describe.concurrent("Create Assignment", () => {
    it("should create success", async () => {
        await testApiHandler({
            appHandler,
            test: async ({ fetch }) => {
                const formdata = new FormData()
                formdata.append("title", "test assignment")
                formdata.append("description", "test description")
                formdata.append("users", JSON.stringify([{ userId: "1", role: "TEACHER" }]))

                const res = await fetch({
                    method: "POST",
                    body: formdata,
                });

                console.log(await res.json())
                const data = appHandler.assignmentSchema.parse(formdata)
                console.log(data)
            }
        });
    });
});
