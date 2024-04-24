import { testApiHandler } from "next-test-api-route-handler";
import { describe, expect, it } from "vitest";
import * as appHandler from "@/app/api/problems/route";
import { PrismaClient as UWAjudgeClient } from '@prisma/client';
import { readFile, readdir } from "fs/promises"

const problemPath = "./tests/data/problems/";

describe.concurrent("Upload problem", () => {
    it("should upload success", async () => {
        await testApiHandler({
            appHandler,
            test: async ({ fetch }) => {
                const uwajudge = new UWAjudgeClient()
                const assignment = await uwajudge.assignment.create({
                    data: {
                        name: "test assignment"
                    }
                })

                const formdata = new FormData()
                formdata.append("assignmentId", assignment.id.toString())
                const paths = await readdir(problemPath)
                const files = await Promise.all(paths.map(path => readFile(problemPath + path)))
                const fileNames = paths.map(path => path.split("/").pop()?.replace(/\.zip$/, '') || "")
                files.forEach((file, i) => {
                    formdata.append("files", new File([file], fileNames[i]))
                })

                const res = await fetch({
                    method: "POST",
                    body: formdata,
                });

                console.log(await res.json())
            }
        });
    });
});
