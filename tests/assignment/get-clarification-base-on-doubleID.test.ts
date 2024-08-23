//單體測試
//import { testApiHandler } from "next-test-api-route-handler";
import { describe, it,vi,expect  } from "vitest";
//import * as appHandler from "app/api/assignments/[assignmentId]/clarification/route";
//import { GET33 } from "app/api/assignments/[assignmentId]/clarification/route";
//import { Assignment, Print } from "@mui/icons-material";
import axios from 'axios'
import * as appHandler from "app/api/assignments/[assignmentId]/clarification/[id]/route";
import { testApiHandler } from "next-test-api-route-handler";
//單體get測試完成

// describe.concurrent("GET1 API", () => {
//     it("should return clarifications successfully", async () => {
        
//         const assignmentID = 7; // 动态赋值 assignmentID
//         const clarificationId = 1;
        
        
//         await axios.get(`http://localhost:3000/api/assignments/${assignmentID}/clarification/${clarificationId}`)
//         .then(function (response) {        
//             expect(response.status).toBe(200); 
//             //response.data=[
//             //{ id: 1, text: '1', assignmentId: 1 },
//             //{ id: 2, text: '2', assignmentId: 1 },
//             //{ id: 3, text: '3', assignmentId: 1 }]
//             //expect(response.data).toEqual('2');
//             expect(response.data[0].text).toEqual('123');
//             //expect(response.data).toEqual(2);
//             expect(response.data).toHaveLength(1);
//             //expect(response.data[2].assignmentId).toEqual(2);
//             console.log(response.data);
//         })
//         .catch(function (error) {
//             expect(error.message).toBe("Request failed with status code 404"); 
//             //console.error(error);
     
//             //expect(error).toBeNull();
//         });

       
//     });
// });











describe.concurrent("DELETE Clarification API", () => {
  it("should delete the clarification successfully", async () => {
    const assignmentID = 20; // 动态赋值 assignmentID
    const clarificationID = 20; // 动态赋值 clarificationID



      // 执行删除操作
      await axios.delete(`http://localhost:3000/api/assignments/${assignmentID}/clarification/${clarificationID}`)
        .then(response => {
          expect(response.status).toBe(200);
          // 可选的验证删除后的状态
          // return axios.get(`http://localhost:3000/api/assignments/${assignmentID}/clarifications`);
        })
        .then(responseAfterDelete => {
          // 验证删除后的状态
          // expect(responseAfterDelete.data).not.toContainEqual(expect.objectContaining({ id: clarificationID }));
        })
        .catch(error => {
          // 捕获删除操作中的错误
          if (axios.isAxiosError(error)) {
            expect(error.response?.status).toBe(404);
          } else {
            throw error;
          }
        });

  });
});


 //測試單體pUt 用next-test-api-route-handler) 完成
 describe.concurrent("PUT API", () => {
  it("should return clarifications successfully", async () => {
      const assignmentId = 2; // 动态赋值 assignmentID  
      const  id=2;

      await testApiHandler({
        
        appHandler,
          params:{
              assignmentId:assignmentId.toString(),// assignmentId.toString(),
              id: id.toString() //id.toString()
          },
          test: async ({ fetch }) => {
    const newClarification = {
      //id: 4,
      text: "This is a new clarification",//, 
      //assignmentId: assignmentId
    };
              const response = await fetch({
                  method: "PUT",body: JSON.stringify( newClarification ) 
              });
              // console.log(response)
              //const data = await response.json();
              expect(response.status).toBe(200);
              //expect(data).toHaveLength(1);
             // expect(data[1].text).toEqual('2');
              //expect(data[2].assignmentId).toEqual(1);
              expect(response.status).toBe(200);
          },
      });
  })
});
