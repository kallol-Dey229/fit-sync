import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({

    // baseURL: process.env.BETTER_AUTH_URL
    
    baseURL: "https://fit-sync-gamma-puce.vercel.app"
})

export const { signIn, signUp, signOut, useSession } = createAuthClient()