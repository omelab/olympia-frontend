import Link from 'next/link';
import { RiAdminFill } from 'react-icons/ri';
import { MenuItem, SubMenu } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
};

const SidebarSegmentAdmin = ({ pathname }: Props) => {
  return (
    <SubMenu
      className="text-sm font-medium"
      label="Admin"
      icon={<RiAdminFill className="text-xl" />}
    >
      <MenuItem
        active={pathname === '/admin/list'}
        className={pathname === '/admin/list' ? 'active' : ''}
        component={<Link href="/admin/list" />}
      >
        <span className="text-sm font-medium">Admin List</span>
      </MenuItem>
      <MenuItem
        active={pathname === '/admin/create-admin'}
        className={pathname === '/admin/create-admin' ? 'active' : ''}
        component={<Link href="/admin/create-admin" />}
      >
        <span className="text-sm font-medium">Create Admin</span>
      </MenuItem>
    </SubMenu>
  );
};

export default SidebarSegmentAdmin;
