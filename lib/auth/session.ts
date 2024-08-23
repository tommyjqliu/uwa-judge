import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";
import authConfig from "./auth-config";
import { getMockSession } from "@/tests/utils/mock-session";

/**
 * @Description: Get the session of the user from client side or server side
 */
export function getSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  if (process.env.VITEST) {
    return getMockSession();
  }
  return getServerSession(...args, authConfig);
}

export async function getUser(...args:
  | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
  | [NextApiRequest, NextApiResponse]
  | []) {
    return (await getSession(...args))?.user;
}