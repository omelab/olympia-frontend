import Link from 'next/link';
import { FiUsers } from 'react-icons/fi';
import { MenuItem, SubMenu } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
};

const SidebarSegmentContributor = ({ pathname }: Props) => {
  return (
    <SubMenu
      className="text-sm font-medium"
      label="Contributors"
      icon={<FiUsers className="text-xl" />}
    >
      <MenuItem
        active={pathname === '/admin/contributor/list'}
        className={pathname === '/admin/contributor/list' ? 'active' : ''}
        component={<Link href="/admin/contributor/list" />}
      >
        <span className="text-sm font-medium">All Contributor</span>
      </MenuItem>
      <MenuItem
        active={pathname === '/admin/contributor/create'}
        className={pathname === '/admin/contributor/create' ? 'active' : ''}
        component={<Link href="/admin/contributor/create" />}
      >
        <span className="text-sm font-medium">Add Contributor</span>
      </MenuItem>
    </SubMenu>
  );
};

export default SidebarSegmentContributor;
