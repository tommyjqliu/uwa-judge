"use client";

import { Session } from "@/services/session/get-session";

let globalSession: Session | null = null;

export default function SessionInjector({ session }: { session: Session }) {
  globalSession = session;
  return null;
}

export function getClientSession() {
  return globalSession;
}
