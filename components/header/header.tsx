import AuthButton from './auth-button';
import ModeToggle from './mode-toggle';
import ProfileButton from './profile-button';
import { Card } from '../ui/card';

function Header() {
  return (
    <Card className="flex flex-row justify-between items-center p-2 m-2">
      <h1 className="text-2xl font-bold">TravelThing</h1>
      <div className="flex items-center gap-2">
        <ProfileButton />
        <AuthButton />
        <ModeToggle />
      </div>
    </Card>
  );
}

export default Header;
