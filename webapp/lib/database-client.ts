import { PrismaClient as UWAjudgeClient } from "@prisma/client";
import { assert } from "./error";

assert(
  typeof window === "undefined",
  "PrismaClient should only be used on the server, do you want to use server actions? Add 'use server' to the function",
);

const globalForPrisma = global as unknown as {
  uwajudgeDB: UWAjudgeClient;
};

export type UWAjudgeDB = UWAjudgeClient;
export const UWAjudgeDB = UWAjudgeClient;

export type RuntimeClient<C> = Omit<
  C,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export const uwajudgeDB = globalForPrisma.uwajudgeDB || new UWAjudgeClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.uwajudgeDB = uwajudgeDB;
}
