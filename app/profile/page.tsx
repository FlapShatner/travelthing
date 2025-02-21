'use client'
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
function Page() {
    const { data } = authClient.useSession()
    if (!data) {
        console.log("No session")
        // redirect("/")
    }
    const user = data?.user
    if (!user) {
        console.log("No user")
        // redirect("/")
    }
    return <div>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
        {user?.image && <Image src={user?.image} alt={user?.name} width={100} height={100} />}
    </div>
}

export default Page 