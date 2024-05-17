import { PrismaClient as DOMjudgeClient } from "@/lib/domjudge-db-client";
import { PrismaClient as UWAjudgeClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  uwajudgeDB: UWAjudgeClient;
  domjudgeDB: DOMjudgeClient;
};

export type DOMjudgeDB = DOMjudgeClient;
export type UWAjudgeDB = UWAjudgeClient;
export const DOMjudgeDB = DOMjudgeClient;
export const UWAjudgeDB = UWAjudgeClient;
export type RuntimeClient<C> = Omit<
  C,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

export const domjudgeDB = globalForPrisma.domjudgeDB || new DOMjudgeClient();
export const uwajudgeDB = globalForPrisma.uwajudgeDB || new UWAjudgeClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.domjudgeDB = domjudgeDB;
  globalForPrisma.uwajudgeDB = uwajudgeDB;
}
