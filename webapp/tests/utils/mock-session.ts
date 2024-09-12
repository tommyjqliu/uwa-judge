let session = {}

export function setMockSession(newSession: any) {
    session = newSession
}

export function getMockSession() {
    return session
}