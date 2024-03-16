"use client"

import { authProvider } from "@/lib/auth";
import { signIn } from "next-auth/react"
import { useEffect } from "react";

export default function Page() {
    useEffect(() => { signIn(authProvider.id, { callbackUrl: '/success' }) }, [])
    return null
}