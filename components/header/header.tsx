import AuthButton from "./auth-button"
import ModeToggle from "./mode-toggle"
import ProfileButton from "./profile-button"

function Header() {
    return <div className="flex justify-between items-center py-2 px-4">
        <h1 className="text-2xl font-bold">TravelThing</h1>
        <div className="flex items-center gap-2">
            <ProfileButton />
            <AuthButton />
            <ModeToggle />
        </div>
    </div>
}

export default Header