import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession as naGetServerSession } from "next-auth";
import authConfig from "./auth-config";
import { getMockSession } from "@/tests/utils/mock-session";

/**
 * @Description: Get the session of the user from server side only
 */
export interface Session {
  accessToken: any;
  user?: {
    userId: number;
    name?: string;
    email?: string;
    image?: string;
    accessToken?: string;
  };
}

export function getServerSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
): Promise<Session> {
  if (process.env.VITEST) {
    return getMockSession();
  }
  return naGetServerSession(...args, authConfig) as Promise<Session>;
}