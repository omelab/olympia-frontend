import Link from 'next/link';
import { MdOutlineDashboard } from 'react-icons/md';
import { MenuItem } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
};

const SidebarSegmentDashboard = ({ pathname }: Props) => {
  return (
    <MenuItem
      active={pathname === '/admin/dashboard'}
      component={<Link href="/admin/dashboard" />}
      icon={<MdOutlineDashboard className="text-xl" />}
    >
      <span className="text-sm font-medium">Dashboard</span>
    </MenuItem>
  );
};

export default SidebarSegmentDashboard;
