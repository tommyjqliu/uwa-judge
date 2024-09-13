import { testApiHandler } from "next-test-api-route-handler";
import { describe, expect, it } from "vitest";
import * as appHandler from "@/app/api/assignments/route";
import { createAssignment } from "@/services/assignment/create-assignment";
import { readProblems } from "../utils/read-problems";
const problemPath = "./tests/data/problems/";


describe.concurrent("Create Assignment", () => {
    it("should create success", async () => {
        const problems = await readProblems();
        const assignment = await createAssignment({
            title: "test assignment",
            description: "test description",
            problems,
        })
    });

    it.skip("should create success", async () => {
        await testApiHandler({
            appHandler,
            test: async ({ fetch }) => {
                const formdata = new FormData()
                formdata.append("title", "test assignment")
                formdata.append("description", "test description")
                
                const res = await fetch({
                    method: "POST",
                    body: formdata,
                });

                console.log(await res.json())
                // const data = appHandler.assignmentSchema.parse(formdata)
                // console.log(data)
            }
        });
    });
});
