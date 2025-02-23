import logOut from '../../functions/logOut';
import { AdminInterface } from '../../interfaces';
import Logo from './Logo';
import ProfileAndBadge from './ProfileAndBadge';

interface AdminMenuProps {
  admin: AdminInterface;
}

function AdminMenu(adminMenuProps: AdminMenuProps) {
  return (
    <div className="menu flex max-sm:flex-col max-sm:h-[200px] max-xs:h-[150px] items-center justify-between w-[100%]">
      <Logo page="admin" />
      <div>
        <ProfileAndBadge
          email={adminMenuProps.admin.email}
          badge={adminMenuProps.admin.badge}
        />
        <p className="cursor-pointer text-white" onClick={() => logOut()}>
          Log Out
        </p>
      </div>
    </div>
  );
}

export default AdminMenu;
