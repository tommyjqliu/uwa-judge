import { AxiosError } from "axios"

export default function errorHandler(endpoint: (...args: any[]) => any) {
    return async function (...args: any[]) {
        try {
            return await endpoint(...args)
        } catch (error) {
            console.error(error)
            if (error instanceof AxiosError) {
                return new Response(error.response?.data?.message, {
                    status: error.response?.status,
                })
            }
          
            return new Response("Internal Server Error Catched", {
                status: 500,
            })
        }
    }
}