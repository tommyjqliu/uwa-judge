import { testApiHandler } from "next-test-api-route-handler";
import { describe, expect, it } from "vitest";
import * as appHandler from "@/app/api/problems/route";
import { uwajudgeDB } from "@/lib/database-client";
import { readProblems } from "../utils/read-problems";


describe.concurrent("Upload problem", () => {
    it("should upload success", async () => {
        await testApiHandler({
            appHandler,
            test: async ({ fetch }) => {

                const assignment = await uwajudgeDB.assignment.create({
                    data: {
                        title: "test assignment"
                    }
                })

                const formdata = new FormData()
                formdata.append("assignmentId", assignment.id.toString())
                const files = await readProblems()
                files.forEach((file) => {
                    formdata.append("files", file)
                })

                const res = await fetch({
                    method: "POST",
                    body: formdata,
                });

                console.log(await res.json())
                expect(res.status).toBe(200);
            }
        });
    });
});
