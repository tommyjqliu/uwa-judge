import { withAuth } from "next-auth/middleware"

export default withAuth({
    pages: {
        signIn: '/auth/sign-in',
    }
})

// Only protect these route
export const config = { matcher: ["/dashboard", "/api/test"] }