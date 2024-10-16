"use server";

import { User } from "@prisma/client";
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

export async function getSession() {
  return getIronSession<Session>(cookies(), {
    cookieName: "uwajudge-session",
    password: process.env.SESSION_SECRET!,
  });
}
