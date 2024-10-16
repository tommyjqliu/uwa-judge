import { AxiosError } from "@/lib/axios";
import { ZodError } from "zod";
import { isErr, ParamsInvalidError } from "./error";

export default function errorHandler(endpoint: (...args: any[]) => any) {
  return async function (...args: any[]) {
    try {
      return await endpoint(...args);
    } catch (error) {
      console.error("error!", error);

      if (
        error instanceof ZodError ||
        (error instanceof Error && isErr(error, ParamsInvalidError))
      ) {
        return new Response(error.message, {
          status: 400,
        });
      }

      if (error instanceof AxiosError) {
        return new Response(error.response?.data?.message, {
          status: error.response?.status,
        });
      }

      return new Response("Internal Server Error Catched", {
        status: 500,
      });
    }
  };
}
