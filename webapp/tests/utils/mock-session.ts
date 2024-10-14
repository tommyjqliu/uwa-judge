import { Session } from "@/lib/auth/session"

let session: Session = {
    user: {
        name: "test",
        email: "",
        image: "",
    }
}

export function setMockSession(newSession: any) {
    session = newSession
}

export async function getMockSession() {
    return session
}