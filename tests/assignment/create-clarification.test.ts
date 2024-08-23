//多體測試
import { testApiHandler } from "next-test-api-route-handler";
import { describe, it,vi,expect  } from "vitest";
//import * as appHandler from "app/api/assignments/[assignmentId]/clarification/route";

import { Assignment, Print } from "@mui/icons-material";
import axios from 'axios'

//test get clarification base on assignment id 測試多體get ver1(使用axios)  完成
// describe.concurrent("GET1 API", () => {
//     it("should return clarifications successfully", async () => {
        
//         const assignmentID = 7; // 动态赋值 assignmentID
        
        
//         await axios.get(`http://localhost:3000/api/assignments/${assignmentID}/clarification`)
//         .then(function (response) {        
//             expect(response.status).toBe(2001); 
//             //response.data=[
//             //{ id: 1, text: '1', assignmentId: 1 },
//             //{ id: 2, text: '2', assignmentId: 1 },
//             //{ id: 3, text: '3', assignmentId: 1 }]

//             //expect(response.data[1].text).toEqual('2');
//             //expect(response.data).toEqual(2);
//             //expect(response.data).toHaveLength(3);
//             //expect(response.data[2].assignmentId).toEqual(2);
//             //console.log(response.data);
//         })
//         .catch(function (error) {
//             expect(error.message).toBe("Request failed with status code 4041"); 
//             //console.error(error);
     
//             //expect(error).toBeNull();
//         }
    
//     );

       
//     });
// });


//import { GET } from "app/api/assignments/[assignmentId]/clarification/route";



 import { GET } from "app/api/assignments/[assignmentId]/clarification/route";
import { POST } from "@/app/api/assignments/route";






//  //測試多體get ver2(使用next-test-api-route-handler) 完成
// describe.concurrent("GET1 API", () => {
//   it("should return clarifications successfully", async () => {
//       //const assignmentId = 1; // 动态赋值 assignmentID    
//       await testApiHandler({
//         appHandler,
//         //pagesHandler: GET,
//           params:{
//               assignmentId: "1"  //assignmentId.toString()
//           },
//           test: async ({ fetch }) => {
//               const response = await fetch({
//                   method: "GET",
//               });
//               // console.log(response)
//               const data = await response.json();
//               expect(response.status).toBe(200);
//               expect(data).toHaveLength(1);
//               expect(data[1].text).toEqual('2');
//               expect(data[2].assignmentId).toEqual(1);
//               expect(response.status).toBe(200);
//           },
//       });
//   })
// });



//  //測試單體post 用next-test-api-route-handler) 完成
// describe.concurrent("POST API", () => {
//   it("should return clarifications successfully", async () => {
//       const assignmentId = 20; // 动态赋值 assignmentID    
//       await testApiHandler({
        
//         appHandler,
//           params:{
//               assignmentId: assignmentId.toString()
//           },
//           test: async ({ fetch }) => {
//     const newClarification = {
//       //id: 4,
//       text: "This is a new clarification",//, 
//       //assignmentId: assignmentId
//     };
//               const response = await fetch({
//                   method: "POST",body: JSON.stringify( newClarification ) 
//               });
//               // console.log(response)
//               const data = await response.json();
//               expect(response.status).toBe(201);
//               expect(data).toHaveLength(1);
//               expect(data[1].text).toEqual('2');
//               expect(data[2].assignmentId).toEqual(1);
//               expect(response.status).toBe(200);
//           },
//       });
//   })
// });


