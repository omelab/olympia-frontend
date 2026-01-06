import Link from 'next/link';
import { GrShieldSecurity } from 'react-icons/gr';
import { MenuItem } from 'react-pro-sidebar';

type Props = {
  pathname?: string;
};

const SidebarSegmentPermission = ({ pathname }: Props) => {
  return (
    <MenuItem
      active={pathname === '/admin/permission'}
      component={<Link href="/admin/permission" />}
      icon={<GrShieldSecurity className="text-xl" />}
    >
      <span className="text-sm font-medium">Permissions</span>
    </MenuItem>
  );
};

export default SidebarSegmentPermission;
