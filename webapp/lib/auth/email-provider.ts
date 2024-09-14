import EmailProvider from "next-auth/providers/email";


export const emailProvider = EmailProvider({
    server: process.env.AZURE_EMAIL_SMTP,
    from: process.env.AZURE_EMAIL_FROM,
})