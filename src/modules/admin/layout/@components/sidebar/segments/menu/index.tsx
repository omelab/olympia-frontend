import Link from 'next/link';
import { CgMenuLeftAlt } from 'react-icons/cg';
import { MenuItem, SubMenu } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
};

const SidebarSegmentMenu = ({ pathname }: Props) => {
  return (
    <SubMenu
      className="text-sm font-medium"
      label="Menu"
      icon={<CgMenuLeftAlt className="text-xl" />}
    >
      <MenuItem
        active={pathname === '/admin/menu'}
        className={pathname === '/admin/menu' ? 'active' : ''}
        component={<Link href="/admin/menu" />}
      >
        <span className="text-sm font-medium">All</span>
      </MenuItem>
      <MenuItem
        active={pathname === '/admin/menu/add'}
        className={pathname === '/admin/menu/add' ? 'active' : ''}
        component={<Link href="/admin/menu/add" />}
      >
        <span className="text-sm font-medium">Add New</span>
      </MenuItem>

      <MenuItem
        active={pathname === '/admin/menu/locations'}
        className={pathname === '/admin/menu/locations' ? 'active' : ''}
        component={<Link href="/admin/menu/locations" />}
      >
        <span className="text-sm font-medium">Manage Locations</span>
      </MenuItem>
    </SubMenu>
  );
};

export default SidebarSegmentMenu;
