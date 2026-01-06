import Link from 'next/link';
import { FaUserGraduate } from 'react-icons/fa6';
import { MenuItem } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
};

const SidebarSegmentRole = ({ pathname }: Props) => {
  return (
    <MenuItem
      active={pathname === '/admin/role'}
      component={<Link href="/admin/role" />}
      icon={<FaUserGraduate className="text-xl" />}
    >
      <span className="text-sm font-medium">Roles</span>
    </MenuItem>
  );
};

export default SidebarSegmentRole;
