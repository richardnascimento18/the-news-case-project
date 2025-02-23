import { User } from '../../interfaces/';
import Logo from './Logo';
import UserStats from './UserStats';

interface UserMenuProps {
  user: User;
}

function UserMenu(userMenuProps: UserMenuProps) {
  return (
    <div className="menu flex max-sm:flex-col max-sm:h-[200px] max-xs:h-[250px] items-center justify-between w-[100%]">
      <Logo page="user" />
      <UserStats user={userMenuProps.user} />
    </div>
  );
}

export default UserMenu;
