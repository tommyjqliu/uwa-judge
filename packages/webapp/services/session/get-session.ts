"use server";

import { User } from "@prisma/client";
import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";
import { mockSession } from "./mock-session";

export interface Session {
  profile?: Omit<User, "password">;
  pendingSignUpRequest?: {
    username: string;
    email: string;
    passwordHash: string;
    codeHash: string;
    expriresAt: string;
    signature: string;
  };
}

export async function getSession() {
  if (mockSession) {
    return mockSession;
  }

  return getIronSession<Session>(cookies(), {
    cookieName: "uwajudge-session",
    password: process.env.SESSION_SECRET!,
  });
}
