import { testApiHandler } from "next-test-api-route-handler";
import { describe, it, vi, expect } from "vitest";
import * as appHandler from "app/api/assignments/[assignmentId]/clarification/route";
//import { GET33 } from "app/api/assignments/[assignmentId]/clarification/route";
//import { Assignment, Print } from "@mui/icons-material";
import axios from 'axios'

describe.concurrent("GET1 API", () => {
    it("should return clarifications successfully", async () => {
        const assignmentId = 1; // 动态赋值 assignmentID    
        await testApiHandler({
            appHandler,
            params:{
                assignmentId: assignmentId.toString()
            },
            test: async ({ fetch }) => {
                const response = await fetch({
                    method: "GET",
                });
                // console.log(response)
                const data = await response.json();
                expect(response.status).toBe(200);
                expect(data).toHaveLength(3);
                expect(data[1].text).toEqual('2');
                expect(data[2].assignmentId).toEqual(1);
                expect(response.status).toBe(200);
            },
        });
    })
});
