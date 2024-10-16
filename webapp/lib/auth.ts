import { User } from "@prisma/client";
import { MicrosoftEntraId } from "arctic";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export interface Session {
  pendingSignUpRequest?: {
    username: string;
    email: string;
    passwordHash: string;
    codeHash: string;
    expriresAt: string;
    signature: string;
  };
  profile?: Omit<User, "password">;
}

export function getSession() {
  return getIronSession<Session>(cookies(), {
    cookieName: "uwajudge-session",
    password: process.env.SESSION_SECRET!,
  });
}

export const azureAD = new MicrosoftEntraId(
  process.env.AZURE_AD_TENANT_ID!,
  process.env.AZURE_AD_CLIENT_ID!,
  process.env.AZURE_AD_CLIENT_SECRET!,
  `${process.env.AUTH_CALLBACK}/api/auth/azure-ad/callback`,
);
