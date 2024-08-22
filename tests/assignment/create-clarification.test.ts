//import { testApiHandler } from "next-test-api-route-handler";
import { describe, it,vi,expect  } from "vitest";
//import * as appHandler from "app/api/assignments/[assignmentId]/clarification/route";
//import { GET33 } from "app/api/assignments/[assignmentId]/clarification/route";
//import { Assignment, Print } from "@mui/icons-material";
import axios from 'axios'

describe.concurrent("GET1 API", () => {
    it("should return clarifications successfully", async () => {
        
        const assignmentID = 1; // 动态赋值 assignmentID
        
        
        await axios.get(`http://localhost:3000/api/assignments/${assignmentID}/clarification`)
        .then(function (response) {        
            expect(response.status).toBe(200); 
            //response.data=[
            //{ id: 1, text: '1', assignmentId: 1 },
            //{ id: 2, text: '2', assignmentId: 1 },
            //{ id: 3, text: '3', assignmentId: 1 }]

            expect(response.data[1].text).toEqual('2');
            //expect(response.data).toEqual(2);
            expect(response.data).toHaveLength(3);
            //expect(response.data[2].assignmentId).toEqual(2);
            console.log(response.data);
        })
        .catch(function (error) {
            console.error(error);
     
            expect(error).toBeNull();
        });

       
    });
});
