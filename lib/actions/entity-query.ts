"use server";

import { useQuery } from "@tanstack/react-query";
import {
    DOMjudgeDB,
    UWAjudgeDB,
    domjudgeDB,
    uwajudgeDB,
} from "../database-client";
import { ModelOfDB, RemoveKeysStartingWith } from "../type";

export type SupportedDB = "UWAjudgeDB" | "DOMjudgeDB";
export type DB<DBK extends SupportedDB> = DBK extends "DOMjudgeDB"
    ? DOMjudgeDB
    : UWAjudgeDB;

export interface EntityQueryOptions<
    E extends keyof ModelOfDB<DB<DBK>>,
    A extends keyof DB<DBK>[E],
    DBK extends SupportedDB = "UWAjudgeDB",
> {
    db?: DBK;
    entity: E;
    action: A;
    query?: DB<DBK>[E][A] extends (arg: infer T) => any ? T : never;
}

export async function entityQuery<
    E extends keyof ModelOfDB<DB<DBK>>,
    A extends keyof DB<DBK>[E],
    DBK extends SupportedDB = "UWAjudgeDB",
>({ db, entity, action, query }: EntityQueryOptions<E, A, DBK>) {
    type returnType = DB<DBK>[E][A] extends (arg: any) => infer T ? T : never;
    const dbClient = (db === "DOMjudgeDB" ? domjudgeDB : uwajudgeDB) as DB<DBK>;
    return (dbClient[entity][action] as any)(query) as returnType;
}

export default entityQuery


entityQuery({
    db: "DOMjudgeDB",
    entity: "language",
    action: "findMany",
    query: {
        where: { allow_submit: { equals: true } }
    }
})