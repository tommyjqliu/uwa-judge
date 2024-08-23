import { testApiHandler } from "next-test-api-route-handler";
import { describe, expect, it } from "vitest";
import * as appHandler from "@/app/api/problems/route";
import { readProblems } from "../utils/read-problems";
import { importProblemVersion } from "@/lib/services/problem/upload";


describe.concurrent("Upload problem", () => {
    it("should upload success", async () => {
        // await testApiHandler({
        //     appHandler,
        //     test: async ({ fetch }) => {

        //         const formdata = new FormData()
          
        //         const files = await readProblems()
        //         files.forEach((file) => {
        //             formdata.append("files", file)
        //         })

        //         const res = await fetch({
        //             method: "POST",
        //             body: formdata,
        //         });

        //         console.log(await res.json())
        //         expect(res.status).toBe(200);
        //     }
        // });

        const files = await readProblems();
        await importProblemVersion(files[0]);
    });
});
