import axios from 'axios';
import { describe, it,vi,expect  } from "vitest";

describe.concurrent("DELETE API", () => {
    it("should delete the clarification successfully", async () => {
        const assignmentID = 1; // 动态赋值 assignmentID
        const clarificationID = 2; // 动态赋值 clarificationID

        // 首先确保记录存在，然后进行删除操作
        await axios.get(`http://localhost:3000/api/assignments/${assignmentID}/clarification`)
            .then(function (response) {
                // 检查是否返回了成功状态码
                expect(response.status).toBe(200);
                expect(response.data).toHaveLength(3);

                // 删除指定的 clarification
                return axios.delete(`http://localhost:3000/api/assignments/${assignmentID}/clarification/${clarificationID}`);
            })
            .then(function (response) {
                // 检查是否删除成功
                expect(response.status).toBe(200);
                expect(response.data.message).toEqual("Clarification deleted successfully");

                // 确认该记录已经被删除
                return axios.get(`http://localhost:3000/api/assignments/${assignmentID}/clarification`);
            })
            .then(function (response) {
                // 再次检查 clarifications 数量
                expect(response.status).toBe(200);
                expect(response.data).toHaveLength(2);
                // 确认ID为clarificationID的记录不再存在
                const deletedClarification = response.data.find(c => c.id === clarificationID);
                expect(deletedClarification).toBeUndefined();
            })
            .catch(function (error) {
                console.error(error);
                // 错误时的断言
                expect(error).toBeNull(); // 你可以根据实际需要断言 error
            });

        // 如果你需要在请求外部进行断言，可以在此处进行。
    });
});
