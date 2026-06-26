import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    
    baseURL: "https://fit-sync-gamma-puce.vercel.app"
})

export const { signIn, signUp, signOut, useSession } = createAuthClient()