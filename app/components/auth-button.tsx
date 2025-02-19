'use client'
import { authClient } from "@/lib/auth-client";

export default function AuthButton() {
    const { data: session, isPending } = authClient.useSession()

    const onClick = async () => {
        if (session) {
            await authClient.signOut();
        } else {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
                newUserCallbackURL: "/",
                errorCallbackURL: "/",
            });
        }
    }

    return <div className='cursor-pointer' onClick={onClick}>{session ? "Sign Out" : isPending ? "Loading..." : "Sign In"}</div>;
}