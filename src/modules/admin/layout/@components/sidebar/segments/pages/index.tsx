import Link from 'next/link';
import { RiPagesLine } from 'react-icons/ri';
import { MenuItem, SubMenu } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
};

const SidebarSegmentPages = ({ pathname }: Props) => {
  return (
    <SubMenu
      className="text-sm font-medium"
      label="Pages"
      icon={<RiPagesLine className="text-xl" />}
    >
      <MenuItem
        className={pathname === '/admin/pages' ? 'active' : ''}
        component={<Link href="/admin/pages" />}
      >
        <span className="text-sm font-medium">All Pages</span>
      </MenuItem>
      <MenuItem
        className={pathname === '/admin/pages/add' ? 'active' : ''}
        component={<Link href="/admin/pages/add" />}
      >
        <span className="text-sm font-medium">Add Page</span>
      </MenuItem>
    </SubMenu>
  );
};

export default SidebarSegmentPages;
