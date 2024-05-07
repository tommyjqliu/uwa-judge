'use server'

import { DOMjudgeDB, UWAjudgeDB, domjudgeDB, uwajudgeDB } from "../database-client";
import { RemoveKeysStartingWith } from "../type";

export interface EntityQueryOptions<DB extends "UWAjudgeDB" | "DOMjudgeDB"> {
    db: DB,
    entity: DB extends "DOMjudgeDB" ? keyof DOMjudgeDB : keyof UWAjudgeDB,
    where?: any;
}

export default async function entityQuery<DB extends "UWAjudgeDB" | "DOMjudgeDB">({ entity, db, where }: EntityQueryOptions<DB>) {
    try {
        const dbClient = (db === "DOMjudgeDB" ? domjudgeDB : uwajudgeDB);
        return (dbClient[entity as any] as any).findMany({
            where
        });
    } catch (e) {
        console.error(e);
        return "Error fetching data.";
    }
}
