'use client'
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { LogIn, LogOut, LoaderPinwheel } from "lucide-react";

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

    return <Button variant="outline" size="icon" onClick={onClick}>{session ? <LogOut /> : isPending ? <LoaderPinwheel className="animate-spin" /> : <LogIn />}</Button>;
}