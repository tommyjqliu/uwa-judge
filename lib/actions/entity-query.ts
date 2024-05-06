'use server'

import { domjudgeDB, uwajudgeDB } from "../database-client";
type ClientKeys = 'uwajudgeDB' | 'domjudgeDB'

export interface EntityQueryOptions {
    db?: ClientKeys
    entity: string,
}

export default async function entityQuery({ entity, db }: EntityQueryOptions) {
    try {
        const dbClient = (db === 'uwajudgeDB' ? uwajudgeDB : domjudgeDB);
        return (dbClient[entity as any] as any).findMany();
    } catch (e) {
        console.error(e);
        return "Error fetching data.";
    }
}
