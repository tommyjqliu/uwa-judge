"use client"

import { Session } from "@/lib/auth/auth";


let globalSession: Session | null = null;

export default function SessionInjector({ session }: { session: Session }) {
    globalSession = session;
    return null;
}

export function getClientSession() {
    return globalSession;
}