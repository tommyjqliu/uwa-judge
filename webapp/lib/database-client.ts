
import { PrismaClient as UWAjudgeClient } from "@prisma/client";

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
