import { Button } from "../ui/button";
import { User } from "lucide-react";
import Link from "next/link";

function ProfileButton() {
    return (
        <Link href="/profile">
            <Button variant="outline" size="icon">
                <User />
            </Button>
        </Link>
    )
}

export default ProfileButton